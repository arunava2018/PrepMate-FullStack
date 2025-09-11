import supabase from "./supabase";
export async function addSubtopic({ subject, name }) {
    // First, get the subject ID based on the subject name
    const { data: subjectId, error: subjectError } = await supabase
        .from("subjects")
        .select("id")
        .eq("name", subject)
        .single();      
    if (subjectError) throw new Error(subjectError.message);

    // Now, insert the new subtopic with the retrieved subject ID
    const { data, error } = await supabase
        .from("subtopics")
        .insert({
            subject_id: subjectId.id,
            name,
        })
        .select()
        .single();
    if (error) throw new Error(error.message);
    return data;    
}

export async function fetchSubtopics({subject}) {
    // First, get the subject ID based on the subject name
    const { data: subjectId, error: subjectError } = await supabase
        .from("subjects")
        .select("id")
        .eq("name", subject)
        .single();      
    if (subjectError) throw new Error(subjectError.message);
    // Now, fetch subtopics for the retrieved subject ID
    const { data, error } = await supabase
        .from("subtopics")
        .select("*")
        .eq("subject_id", subjectId.id);
    if (error) throw new Error(error.message);
    return data;
}
