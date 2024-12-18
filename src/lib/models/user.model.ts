import { Permission } from "@/lib/models/permission.model";

export interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  profilePicture: string;
  permission: Permission;
  active: boolean;
}
