"use client";

import { useUserByIdQuery } from "@/lib/hooks/queries/useUserByIdQuery";
import { UpdateUserFormSchema } from "@/lib/schemas/UpdateUserFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/lib/hooks/mutations/useUpdateUserMutation";
import { useToast } from "@/hooks/use-toast";
import { useUploadProfilePictureMutation } from "@/lib/hooks/mutations/useUploadProfilePictureMutation";
import { BarLoader } from "react-spinners";

export function UpdateUserForm() {
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    undefined
  );

  const params = useParams<{ id: string }>();
  const { data, isLoading } = useUserByIdQuery(+params!.id);
  const { mutate: updateUser, isPending } = useUpdateUserMutation();
  const { mutate: uploadProfilePicture, isPending: ProfilePicturePending } =
      useUploadProfilePictureMutation();
  const { push } = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      email: "",
      name: "",
      permissionId: "",
      phone: "",
      username: "",
      id: 0,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImagePreview = (file: any) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProfilePicture(fileURL);
    }
  };

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
        username: data.username,
        active: data.active,
        permissionId: String(data.permission.id),
        id: data.id,
      });

      setProfilePicture(data.profilePicture);
    }
  }, [data, form]);

  if (isLoading) {
    return (
      <div className="rounded-md flex flex-col gap-4 shadow-gray-400 shadow-xl justify-center w-[600px] min-h-[550px] py-8 items-center">
        <BarLoader />
      </div>
    );
  }

  const onSubmitUpdateUserForm = (
    values: z.infer<typeof UpdateUserFormSchema>
  ) => {
    const { id, permissionId, avatar, ...rest } = values;

    updateUser(
      {
        id: id,
        user: {
          permissionId: +permissionId,
          ...rest,
        },
      },
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
                    title: `Conta ${data?.username} atualizada com sucesso!`,
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
            title: `Conta ${data?.username} atualizada com sucesso!`,
            description: "Redirecionando você agora!",
          });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          push("/users");
        },
        onError: (error) => {
          toast({
            title: "Erro ao atualizar usuário!",
            variant: "destructive",
            description: `${error}`,
          });
        },
      }
    );
  };

  return (
    <div className="rounded-md flex flex-col gap-4 shadow-gray-400 shadow-xl w-[600px] min-h-[550px] py-8 items-center">
      <h1 className="font-bold text-xl">Edição de usuário</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitUpdateUserForm)}
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
            <Button disabled={isPending || ProfilePicturePending} type="submit" className="w-[400px]">
              Editar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
