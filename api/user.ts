import { supabase } from "@/lib/supabase";

export const fetchProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) throw error;
  return data;
};

export const updateProfileName = async (
  firstName: string,
  lastName: string
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("users")
    .update({ first_name: firstName, last_name: lastName })
    .eq("id", user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export type AvatarUploadInput = {
  uri: string;
  fileName?: string;
  mimeType?: string;
};

export const updateAvatar = async ({
  uri,
  fileName,
  mimeType,
}: AvatarUploadInput) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Not authenticated");

  const inferredExt = fileName?.split(".").pop() || "jpg";
  const objectPath = `${user.id}/${Date.now()}.${inferredExt}`;

  const response = await fetch(uri);
  const blob = await response.blob();

  const { error: uploadError } = await supabase.storage
    .from("profile pictures")
    .upload(objectPath, blob, {
      contentType: mimeType || "application/octet-stream",
      upsert: true,
    });
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage
    .from("profile pictures")
    .getPublicUrl(objectPath);
  const publicUrl = publicUrlData.publicUrl;

  const { data, error } = await supabase
    .from("users")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
};
