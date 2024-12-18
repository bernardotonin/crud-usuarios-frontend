"use client";

import { CreateUserFormSchema } from "@/lib/schemas/CreateUserFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import PermissionsSelect from "./PermissionsSelect";
import { useCreateUserMutation } from "@/lib/hooks/mutations/useCreateUserMutation";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { useUploadProfilePictureMutation } from "@/lib/hooks/mutations/useUploadProfilePictureMutation";
import { useToast } from "@/hooks/use-toast";

export function CreateUserForm() {
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    undefined
  );

  const form = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      active: false,
      email: "",
      name: "",
      password: "",
      permissionId: "",
      phone: "",
      username: "",
    },
  });

  const { toast } = useToast();
  const { mutate: createUser, isPending } = useCreateUserMutation();
  const { mutate: uploadProfilePicture, isPending: ProfilePicturePending } =
    useUploadProfilePictureMutation();

  const { push } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImagePreview = (file: any) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);  
      setProfilePicture(fileURL);
    }
  };

  const onSubmitCreateUserForm = (
    values: z.infer<typeof CreateUserFormSchema>
  ) => {
    const { permissionId, avatar, ...rest } = values;

    createUser(
      { ...rest, permissionId: +permissionId },
      {
        onSuccess: async (data) => {
          if (avatar) {
            const payload = new FormData();
            payload.append("file", avatar);
            uploadProfilePicture(
              { id: data!.id, payload },
              {
                onSuccess: async () => {
                  toast({
                    variant: "default",
                    title: `Conta ${data?.username} criada com sucesso!`,
                    description: "Redirecionando você agora!",
                  });
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  push("/users");
                },
                onError: () => {
                  toast({
                    variant: 'destructive',
                    title: "Erro ao atualizar a foto de perfil!",
                  });
                },
              }
            );
            return;
          }
          toast({
            variant: "default",
            title: `Conta ${data?.username} criada com sucesso!`,
            description: "Redirecionando você agora!",
          });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          push("/users");
        },
        onError: (error) => {
          toast({
            title: "Erro ao criar usuário!",
            variant: 'destructive',
            description: `${error}`,
          });
        },
      }
    );
  };

  return (
    <div className="rounded-md flex flex-col gap-4 shadow-gray-400 shadow-xl w-[600px] min-h-[550px] py-8 items-center">
      <h1 className="font-bold text-xl">Criação de usuário</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitCreateUserForm)}
          className="space-y-8 w-[400px]"
        >
          <div className="flex flex-col items-center">
            <Avatar className="border border-black w-32 h-32">
              <AvatarImage src={profilePicture} />
              <AvatarFallback>FP</AvatarFallback>
            </Avatar>
            <div>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto de perfil</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e.target?.files?.[0] ?? undefined);
                          handleImagePreview(e.target?.files?.[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-md shadow-gray-400"
                      placeholder="Digite seu username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-md shadow-gray-400"
                      placeholder="Digite seu Nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-md shadow-gray-400"
                      placeholder="Digite seu e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-md shadow-gray-400"
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3 items-center">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      className="shadow-md shadow-gray-400"
                      placeholder="Digite seu telefone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-6">
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormLabel>Ativo</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <PermissionsSelect control={form.control} />
          </div>
          <div className="justify-self-center">
            <Button type="submit" className="w-[400px]" disabled={isPending || ProfilePicturePending}>
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
