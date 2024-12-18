export interface UserCreateDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  active: boolean;
  permissionId: number;
}

export interface UserUpdateDTO {
  name: string;
  username: string;
  email: string;
  phone: string;
  active: boolean;
  permissionId: number;
}

export interface UserUploadProfilePictureDTO {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
}
