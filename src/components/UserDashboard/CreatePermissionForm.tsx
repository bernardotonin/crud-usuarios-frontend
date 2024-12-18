"use client";

import { CreatePermissionFormSchema } from "@/lib/schemas/CreatePermissionFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreatePermissionMutation } from "@/lib/hooks/mutations/useCreatePermissionMutation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CreatePermissionForm() {
  const form = useForm<z.infer<typeof CreatePermissionFormSchema>>({
    resolver: zodResolver(CreatePermissionFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutate: createPermission, isPending } = useCreatePermissionMutation();
  const { toast } = useToast();
  const { push } = useRouter();

  const onSubmitPermissionCreate = (
    values: z.infer<typeof CreatePermissionFormSchema>
  ) => {
    createPermission(values, {
      onSuccess: async (data) => {
        toast({
          title: `Permissão ${data.name} criada com sucesso!`,
          description: "Redirecionando você agora!",
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        push("/users");
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: "Erro ao criar permissão",
          description: error.message,
        });
      }
    });
  };

  return (
    <div className="rounded-md flex flex-col gap-4 shadow-gray-400 shadow-xl p-8 items-center justify-center">
      <h1 className="font-bold text-xl">Criação de permissão</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitPermissionCreate)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da permissão</FormLabel>
                <FormControl>
                  <Input placeholder="Digite um nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Criar permissão
          </Button>
        </form>
      </Form>
    </div>
  );
}
