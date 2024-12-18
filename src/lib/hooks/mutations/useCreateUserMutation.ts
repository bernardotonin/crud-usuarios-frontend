import { createUser } from "@/lib/repositories/User/user.repository";
import { useMutation } from "@tanstack/react-query"

export const useCreateUserMutation = () => {
  return useMutation({ mutationFn: createUser});
}