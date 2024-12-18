"use client";

import { usePermissionQuery } from "@/lib/hooks/queries/usePermissionQuery";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PermissionsSelect({ control }: { control: any }) {
  const { data, isLoading } = usePermissionQuery();

  if (isLoading) {
    return <p>carregando...</p>;
  }

  if (data?.length === 0) {
    return (
      <FormField
        control={control}
        name="permissionId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Permissão</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="shadow-md shadow-gray-400 border">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="border border-black w-full">
                <p>Crie ao menos uma permissão!</p>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={control}
      name="permissionId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Permissão</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shadow-md shadow-gray-400 border">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border border-black w-full">
              {data?.map((permission) => (
                <SelectItem key={permission.id} value={`${permission.id}`}>
                  {permission.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
