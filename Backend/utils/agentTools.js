import { search } from 'duck-duck-scrape';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Helper: Delay execution for ms milliseconds
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Helper: Custom fetch for DuckDuckGo HTML Lite (bypasses bot detection)
 */
async function fetchDuckDuckGoHtml(query) {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) return null;
    const html = await response.text();

    const results = [];
    const regex = /<a class="result__snippet[^">]*href="([^"]+)">([^<]+)<\/a>/g;
    let match;
    while ((match = regex.exec(html)) !== null && results.length < 5) {
      results.push({
        url: match[1],
        snippet: match[2].trim(),
      });
    }

    return results.length > 0 ? results : null;
  } catch (e) {
    console.warn('HTML DuckDuckGo fetch failed:', e.message);
    return null;
  }
}

/**
 * 🛠️ TOOL 1: Web Search for Interview Questions (Resilient Dual-Layer)
 */
export async function webSearchQuestionsTool({ query, topic }) {
  console.log(`🔍 [Agent Tool] Searching web for: ${query} (Topic: ${topic})`);

  const htmlResults = await fetchDuckDuckGoHtml(query);
  if (htmlResults && htmlResults.length > 0) {
    console.log(`✅ [Agent Tool] HTML Search retrieved ${htmlResults.length} web sources.`);
    return JSON.stringify({
      status: 'success',
      query,
      topic,
      source: 'duckduckgo-html',
      resultsCount: htmlResults.length,
      results: htmlResults,
    });
  }

  await delay(1000);
  try {
    const searchResults = await search(query, { safeSearch: 0 });
    const results = searchResults.results.slice(0, 5).map((item) => ({
      title: item.title,
      snippet: item.snippet,
      url: item.url,
    }));

    if (results.length > 0) {
      return JSON.stringify({
        status: 'success',
        query,
        topic,
        source: 'duckduckgo-scrape',
        resultsCount: results.length,
        results,
      });
    }
  } catch (error) {
    console.warn(`⚠️ [Agent Tool] DuckDuckGo API Rate Limited: ${error.message}`);
  }

  console.log(`ℹ️ [Agent Tool] Fallback activated for topic: ${topic}`);
  return JSON.stringify({
    status: 'fallback_activated',
    message: `Web search engine returned rate limit or no results. Proceeding directly with synthesis of top-asked real-world interview questions for topic: "${topic}".`,
    topic,
    query,
    note: 'Use your comprehensive internal computer science knowledge base to curate 10 highly authentic, frequently asked interview questions and detailed answers with code snippets.',
  });
}

/**
 * 🛠️ TOOL 2: Fetch Current Subjects & Subtopics from DB
 */
export async function fetchSubjectsAndSubtopicsTool() {
  console.log('📚 [Agent Tool] Fetching subjects and subtopics from database');
  try {
    const subjects = await prisma.subjects.findMany({
      include: {
        subtopics: {
          select: { id: true, name: true },
        },
      },
    });

    return JSON.stringify({
      status: 'success',
      subjects: subjects.map((s) => ({
        subject_id: s.id,
        subject_name: s.name,
        subtopics: s.subtopics.map((st) => ({
          subtopic_id: st.id,
          subtopic_name: st.name,
        })),
      })),
    });
  } catch (error) {
    console.error('Error in fetchSubjectsAndSubtopicsTool:', error);
    return JSON.stringify({ status: 'error', message: error.message });
  }
}

/**
 * 🛠️ TOOL 3: Add Questions to DB matching PrepMate Schema
 */
export async function addQuestionToDbTool({ subject_id, subtopic_id, questions }) {
  console.log(`💾 [Agent Tool] Pushing ${questions.length} question(s) to DB (Subject: ${subject_id}, Subtopic: ${subtopic_id})`);

  try {
    const subtopic = await prisma.subtopics.findFirst({
      where: { id: subtopic_id, subject_id },
    });

    if (!subtopic) {
      return JSON.stringify({
        status: 'error',
        message: 'Invalid subject_id or subtopic_id combination.',
      });
    }

    const inserted = [];
    const skippedDuplicates = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      try {
        const created = await prisma.questions.create({
          data: {
            subject_id,
            subtopic_id,
            question_text: q.question_text,
            answer_text: q.answer_text,
          },
        });
        inserted.push(created);
        console.log(`[DB] : Question ${i + 1}/${questions.length} ("${q.question_text.slice(0, 30)}...") added successfully to DB`);
      } catch (err) {
        if (err.code === 'P2002') {
          skippedDuplicates.push(q.question_text);
          console.warn(`[DB] : Question ${i + 1}/${questions.length} skipped (Duplicate text)`);
        } else {
          console.error(`Failed inserting question ${i + 1}:`, err);
        }
      }
    }

    return JSON.stringify({
      status: 'success',
      insertedCount: inserted.length,
      skippedCount: skippedDuplicates.length,
      insertedIds: inserted.map((item) => item.id),
      skippedDuplicates,
    });
  } catch (error) {
    console.error('Error in addQuestionToDbTool:', error);
    return JSON.stringify({ status: 'error', message: error.message });
  }
}

/**
 * OpenAI Agent Tool Definitions (JSON Schema Format)
 */
export const agentToolsDefinition = [
  {
    type: 'function',
    function: {
      name: 'web_search_questions_tool',
      description:
        'Searches the web for real-world technical interview questions and answers for a given subject and topic.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description:
              'The search string to execute (e.g. "top 10 OOPs inheritance interview questions and answers geeksforgeeks leetcode")',
          },
          topic: {
            type: 'string',
            description: 'The target subtopic or topic name (e.g. "Inheritance")',
          },
        },
        required: ['query', 'topic'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'fetch_subjects_and_subtopics_tool',
      description:
        'Retrieves the list of existing subjects and subtopics with their UUIDs from the database.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_question_to_db_tool',
      description:
        'Inserts an array of question & answer pairs into the PostgreSQL database. Pass ALL curated questions together in ONE array call.',
      parameters: {
        type: 'object',
        properties: {
          subject_id: {
            type: 'string',
            description: 'UUID of the subject',
          },
          subtopic_id: {
            type: 'string',
            description: 'UUID of the subtopic',
          },
          questions: {
            type: 'array',
            description: 'Array of ALL curated question & answer pairs to insert in bulk',
            items: {
              type: 'object',
              properties: {
                question_text: {
                  type: 'string',
                  description: 'The interview question text (markdown supported)',
                },
                answer_text: {
                  type: 'string',
                  description:
                    'Detailed answer text with explanation & code examples (markdown supported)',
                },
              },
              required: ['question_text', 'answer_text'],
            },
          },
        },
        required: ['subject_id', 'subtopic_id', 'questions'],
      },
    },
  },
];
