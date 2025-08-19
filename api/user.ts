import { supabase } from "@/lib/supabase";

export const fetchProfile = async () => {
  const { data, error } = await supabase.from("users").select("*").single();
  if (error) throw error;
  return data;
};

export const updateProfileName = async (
  firstName: string,
  lastName: string
) => {
  const { data, error } = await supabase
    .from("users")
    .update({ first_name: firstName, last_name: lastName })
    .eq("id", supabase.auth.getUser().data?.user?.id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateAvatar = async (avatarUrl: string) => {
  const { data, error } = await supabase
    .from("users")
    .update({ avatar_url: avatarUrl })
    .eq("id", supabase.auth.getUser().data?.user?.id)
    .select()
    .single();
  if (error) throw error;
  return data;
};
