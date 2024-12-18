import { updateUser } from "@/lib/repositories/User/user.repository";
import { useMutation } from "@tanstack/react-query"

export const useUpdateUserMutation = () => {
  return useMutation({ mutationFn: updateUser });
}