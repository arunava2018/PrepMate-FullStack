import OpenAI from 'openai';
import {
  agentToolsDefinition,
  webSearchQuestionsTool,
  fetchSubjectsAndSubtopicsTool,
  addQuestionToDbTool,
} from '../utils/agentTools.js';

/**
 * 🤖 Admin Content Agent Runner
 */
export const runAdminAgent = async (req, res) => {
  try {
    const { prompt, subject_id, subtopic_id, autoCommit = false } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY is not configured in backend environment variables.',
      });
    }

    const openai = new OpenAI({ apiKey });

    const SYSTEM_PROMPT = `
You are PrepMate's Autonomous Technical Content Curator Agent.
Your goal is to search the web for authentic, frequently asked technical interview questions, clean and improve their answers, and curate them into high-quality study materials for students.

AVAILABLE TOOLS:
- web_search_questions_tool: Search the web for top interview questions on any computer science topic.
- fetch_subjects_and_subtopics_tool: Get list of subjects/subtopics in PrepMate DB.
${autoCommit ? '- add_question_to_db_tool: Directly insert curated questions into the PostgreSQL database.' : ''}

WORKFLOW RULES:
1. Call 'web_search_questions_tool' ONCE to search real-world questions on the requested topic. Do NOT call 'web_search_questions_tool' repeatedly.
2. Filter out bad or duplicate questions. Ensure answers are detailed, accurate, and use clear Markdown with code blocks where applicable.
3. ${
      autoCommit
        ? "AutoCommit is TRUE: Invoke 'add_question_to_db_tool' ONCE passing ALL curated questions together in ONE single array call in the 'questions' parameter."
        : "AutoCommit is FALSE: Do NOT insert questions to DB. Return the curated JSON list of questions for Admin preview and review."
    }
4. Structure your final answer strictly as a JSON object matching this schema:
{
  "summary": "Brief summary of curated topics and web sources searched",
  "topic": "Extracted topic name",
  "questions": [
    {
      "question_text": "Markdown formatted question string",
      "answer_text": "Detailed markdown formatted answer string with code examples"
    }
  ]
}
`;

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Instruction: ${prompt}\nTarget Subject ID: ${subject_id || 'N/A'}\nTarget Subtopic ID: ${subtopic_id || 'N/A'}\nAuto Commit to DB: ${autoCommit}`,
      },
    ];

    const toolLogs = [];
    let finalAgentResponse = null;
    let webSearchCalled = false;

    // Filter tools based on autoCommit state
    const allowedTools = agentToolsDefinition.filter((tool) => {
      if (!autoCommit && tool.function.name === 'add_question_to_db_tool') {
        return false; // Exclude DB tool when autoCommit is false!
      }
      return true;
    });

    // Tool execution loop (max 4 turns)
    for (let turn = 0; turn < 4; turn++) {
      const toolsToPass = webSearchCalled
        ? allowedTools.filter((t) => t.function.name !== 'web_search_questions_tool')
        : allowedTools;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        tools: toolsToPass.length > 0 ? toolsToPass : undefined,
        tool_choice: toolsToPass.length > 0 ? 'auto' : 'none',
      });

      const responseMessage = response.choices[0].message;
      messages.push(responseMessage);

      if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
        for (const toolCall of responseMessage.tool_calls) {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments || '{}');

          console.log(`🤖 [Agent Controller] Calling tool: ${functionName}`, functionArgs);
          toolLogs.push({ tool: functionName, args: functionArgs, timestamp: new Date() });

          let toolOutput = '';

          if (functionName === 'web_search_questions_tool') {
            webSearchCalled = true;
            toolOutput = await webSearchQuestionsTool(functionArgs);
          } else if (functionName === 'fetch_subjects_and_subtopics_tool') {
            toolOutput = await fetchSubjectsAndSubtopicsTool();
          } else if (functionName === 'add_question_to_db_tool') {
            toolOutput = await addQuestionToDbTool(functionArgs);
          }

          messages.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            name: functionName,
            content: toolOutput,
          });
        }
      } else {
        finalAgentResponse = responseMessage.content;
        break;
      }
    }

    let parsedResult = null;
    try {
      const cleanedText = (finalAgentResponse || '')
        .replace(/^```json\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
      parsedResult = JSON.parse(cleanedText);
    } catch (e) {
      parsedResult = {
        summary: finalAgentResponse || 'Curated interview questions based on topic request.',
        questions: [],
      };
    }

    return res.status(200).json({
      success: true,
      agentSummary: parsedResult.summary,
      topic: parsedResult.topic,
      questions: parsedResult.questions || [],
      toolLogs,
    });
  } catch (error) {
    console.error('RunAdminAgent error:', error);
    res.status(500).json({ error: error.message || 'Failed to run AI Admin Agent' });
  }
};
