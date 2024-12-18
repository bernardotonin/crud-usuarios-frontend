import { Permission } from "@/lib/models/permission.model";
import { api } from "@/lib/repositories/client";
import { CreatePermissionDTO } from "./permission.types";

export const fetchAllPermissions = async () => {
  const { data } = await api.get<Permission[]>("/permissions");
  return data;
};

export const createPermission = async (payload: CreatePermissionDTO) => {
  const { data } = await api.post<Permission>("/permissions", payload);
  return data;
}