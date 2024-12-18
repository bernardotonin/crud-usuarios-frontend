import { z } from "zod";

export const UpdateUserFormSchema = z.object({
  id: z.number(),
  avatar: z
    .any({ required_error: 'Foto de perfil é obrigatória!'})
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file?.type),
      "Apenas imagens .jpg, .jpeg, .png são suportadas!"
    )
    .refine(
      (file) => file?.size <= 3 * 1024 * 1024,
      "Tamanho máximo da imagem é 3mb"
    ).optional(),
  name: z.string({ required_error: "Nome é obrigatório! " }),
  username: z.string({ required_error: "Username é obrigatório! " }),
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .email({ message: "Insira um e-mail válido!" }),
  phone: z.string({ required_error: "Telefone é obrigatório!" }),
  active: z.boolean().default(false),
  permissionId: z.string({ required_error: "Permissão é obrigatória!" }),
});
