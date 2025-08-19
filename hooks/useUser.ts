import {
  fetchProfile,
  updateAvatar,
  updateProfileName,
  type AvatarUploadInput,
} from "@/api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchProfile,
  });

  return { user: data, isLoading, error };
}

export function useUpdateProfileName() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      firstName,
      lastName,
    }: {
      firstName: string;
      lastName: string;
    }) => updateProfileName(firstName, lastName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: AvatarUploadInput) => updateAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
