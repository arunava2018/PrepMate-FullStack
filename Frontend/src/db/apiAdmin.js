import supabase from "./supabase";
// check if user is admin
export async function isAdminUser(userId) {
  if (!userId) return false;

  const { data, error } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error checking admin:", error.message);
    return false;
  }
  return !!data;
}