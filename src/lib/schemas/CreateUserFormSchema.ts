import { z } from "zod";

export const CreateUserFormSchema = z.object({
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
  name: z.string({ required_error: "Nome é obrigatório! " }).min(5, 'Insira seu nome completo!'),
  username: z.string({ required_error: "Username é obrigatório! " }).min(5, 'Username deve ter ao menos 5 caracteres!'),
  password: z.string({ required_error: "Senha é obrigatória! " }).min(5, 'Senha deve ter ao menos 5 caracteres!'),
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .email({ message: "Insira um e-mail válido!" }),
  phone: z.string({ required_error: "Telefone é obrigatório!" }).min(5, 'Insira um telefone valido!'),
  active: z.boolean().default(false),
  permissionId: z.string({ required_error: "Permissão é obrigatória!" }),
});
