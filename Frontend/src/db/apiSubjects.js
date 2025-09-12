import supabase from "./supabase";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
  try{
    const res = await fetch(`${BASE_URL}/subject/addSubject`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        icon
      }),
    })
    return await res.json();
  }catch(err){
    throw err;
  }
}
