import { UserModel } from "@/lib/models/user.model";
import { fetchAllUsers } from "@/lib/repositories/User/user.repository";
import { useQuery } from "@tanstack/react-query"

export const useUserQuery = (query?: string) => {
  return useQuery<UserModel[]>({ queryKey: ['users', query], queryFn: () => fetchAllUsers(query)})
}