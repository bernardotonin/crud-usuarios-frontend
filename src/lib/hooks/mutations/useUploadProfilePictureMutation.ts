import { uploadProfilePicture } from "@/lib/repositories/User/user.repository";
import { useMutation } from "@tanstack/react-query";

export const useUploadProfilePictureMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload: any;
    }) => uploadProfilePicture({ id, payload }),
  });
};
