import supabase from "./supabase";

// Fetch all subjects
  export async function getSubjects() {
    const { data, error } = await supabase.rpc("get_subjects_with_question_count");
    if (error) throw new Error(error.message);
    return data;
  } 

  export async function getSubjectById(id) {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("id", id)
      .single();  
    if (error) throw new Error(error.message);
    return data;
  }


// Add new subject
export async function addSubject({ name, description, icon }) {
  const { data, error } = await supabase
    .from("subjects")
    .insert([{ name, description, icon }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
