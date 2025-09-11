import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
// fetch the currently logged-in user's profile
export async function getCurrentUserProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("usersProfile")
    .select("id, name, profile_photo, college_name, passout_year")
    .eq("id", userId)
    .single();
 
  if (error) throw new Error(error.message);
//   console.log("Fetched user profile:", data);
  return data;
}
export async function signup({ name, email, password, college, passoutYear }) {
  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw new Error(authError.message);

  const userId = authData.user.id;

  // 2.Insert user profile in usersProfile table
  const { data: profileData, error: profileError } = await supabase
    .from("usersProfile")
    .insert({
      id: userId,
      name,
      college_name: college,
      passout_year: passoutYear,
      profile_photo: null, // Placeholder for now
    })
    .select()
    .single();

  if (profileError) throw new Error(profileError.message);
//   console.log("Created user profile:", profileData);
  return profileData;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return true; // success indicator
}

export async function getUserById(id) {
  const {data, error} = await supabase
    .from("usersProfile")
    .select("name")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
