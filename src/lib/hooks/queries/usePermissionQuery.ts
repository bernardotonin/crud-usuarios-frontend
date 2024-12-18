import { Permission } from "@/lib/models/permission.model";
import { fetchAllPermissions } from "@/lib/repositories/Permission/permission.repository";
import { useQuery } from "@tanstack/react-query"

export const usePermissionQuery = () => {
  return useQuery<Permission[]>({ queryKey: ['permissions'], queryFn: fetchAllPermissions })
}