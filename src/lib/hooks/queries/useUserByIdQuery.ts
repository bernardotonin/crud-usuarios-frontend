import { UserModel } from "@/lib/models/user.model";
import { fetchUserById } from "@/lib/repositories/User/user.repository";
import { useQuery } from "@tanstack/react-query"

export const useUserByIdQuery = (id: number) => {
  return useQuery<UserModel>({ queryKey: ['user', id], queryFn: () => fetchUserById(id)})
}