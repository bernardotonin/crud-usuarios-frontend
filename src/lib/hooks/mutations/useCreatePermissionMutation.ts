import { createPermission } from "@/lib/repositories/Permission/permission.repository";
import { useMutation } from "@tanstack/react-query"

export const useCreatePermissionMutation = () => {
  return useMutation({ mutationFn: createPermission});
}