import { z } from "zod";

export const CreatePermissionFormSchema = z.object({
  name: z.string({ required_error: "Nome da permissão é obrigatório! " }).min(2, 'Insira um nome'),
});
