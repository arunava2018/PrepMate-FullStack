import supabase from "./supabase";

// Add interview experience
export async function addInterviewExperience({
  userId,
  company_name,
  role,
  linkedin_url,
  github_url,
  content,
  offer_type,
  opportunity_type,
  is_public = false,
}) {
  const { data, error } = await supabase
    .from("interview_experiences")
    .insert({
      user_id: userId,
      company_name,
      role,
      linkedin_url,
      github_url,
      content,
      offer_type,
      opportunity_type,
      is_public,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message || "Failed to add interview experience");
  }

  return data;
}

// Fetch unpublished interview experiences
export async function fetchUnpublishedInterviewExperiences() {
  const { data, error } = await supabase
    .from("interview_experiences")
    .select(`
      id,
      company_name,
      user_id,
      content,
      linkedin_url,
      offer_type,
      opportunity_type,
      github_url,
      role,
      usersProfile ( name )
    `)
    .eq("is_public", false);

  if (error) {
    console.error("Error fetching unpublished experiences:", error);
    throw new Error(error.message);
  }
  return data;
}


// Delete interview experience by id
export async function deleteExperience(id) {
  const { data, error } = await supabase
    .from("interview_experiences")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error deleting experience:", error);
    throw new Error(error.message);
  }
  return data;
}

// Approve interview experience by id
export async function approveExperience(id, updatedData) {
  const payload = {
    ...updatedData,
    content: updatedData.content || updatedData.experience || "", // fallback
    is_public: true,
  };
  delete payload.experience;
  const { data, error } = await supabase
    .from("interview_experiences")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error approving experience:", error);
    throw new Error(error.message);
  }
  return data;
}

//fetch public interview experiences
export async function fetchPublicInterviewExperiences() {
  const { data, error } = await supabase.from("interview_experiences")
  .select("*")
  .eq("is_public", true)
  .order('company_name', { ascending: true });
  if(error){
    console.error("Error fetching public experiences:", error);
    throw new Error(error.message);
  }
  return data;
}
