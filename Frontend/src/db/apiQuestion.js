import supabase from "./supabase";
export async function addQuestion({ subject, subtopic, question, answer }) {
    //1st find the subject id from the subject name
    const { data: subjectId, error: subjectError } = await supabase
        .from("subjects")
        .select("id")
        .eq("name", subject)
        .single();
    if (subjectError) throw new Error(subjectError.message);
    //2nd find the subtopic id from the subtopic name
    const { data: subtopicId, error: subtopicError } = await supabase
        .from("subtopics")
        .select("id")
        .eq("name", subtopic)
        .single();
    if (subtopicError) throw new Error(subtopicError.message);
    //3rd insert the question into the questions table
    const { data, error } = await supabase.from("questions").insert([
        {
            subject_id: subjectId.id,
            subtopic_id: subtopicId.id,
            question_text: question,
            answer_text: answer,
        },
    ]);
    if (error) throw new Error(error.message);
    return data;
}

export async function fetchQuestions(subtopicId) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("subtopic_id", subtopicId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
//   console.log(data);
  
  return data;
}

// Update question
export async function updateQuestion({ questionId, question_text, answer_text }) {
  const { data, error } = await supabase
    .from("questions")
    .update({
      question_text,
      answer_text,
      updated_at: new Date(),
    })
    .eq("id", questionId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Delete question
export async function deleteQuestion(questionId) {
  const { data, error } = await supabase.from("questions").delete().eq("id", questionId);
  if (error) throw new Error(error.message);
  return data;
}