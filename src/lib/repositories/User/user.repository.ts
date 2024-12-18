import { UserModel } from "@/lib/models/user.model";
import { api } from "@/lib/repositories/client";
import { UserCreateDTO, UserUpdateDTO } from "./user.types";
import { isAxiosError } from "axios";

export const fetchAllUsers = async (query?: string) => {
  const { data } = await api.get<UserModel[]>(`/users?query=${query}`);
  return data;
};

export const fetchUserById = async (id: number) => {
  const { data } = await api.get<UserModel>(`/users/${id}`);
  return data;
};

export const createUser = async (user: UserCreateDTO) => {
  try {
    const { data } = await api.post<UserModel>("/users", user);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

export const updateUser = async ({
  id,
  user,
}: {
  id: number;
  user: UserUpdateDTO;
}) => {
  try {
    const { data } = await api.put<UserModel>(`/users/${id}`, user);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

export const uploadProfilePicture = async ({
  id,
  payload,
}: {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}) => {
  const { data } = await api.put<string>(
    `/users/${id}/upload-profile-picture`,
    payload
  );
  return data;
};
