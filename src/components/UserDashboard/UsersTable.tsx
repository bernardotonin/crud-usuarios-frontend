"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useUserQuery } from "@/lib/hooks/queries/useUserQuery";
import { Button } from "../ui/button";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function UsersTable() {
  const params = useSearchParams();
  const query = params?.get("query") || "";
  const { data, isLoading, error } = useUserQuery(query);

  if (error) {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="h-[500px] flex items-center justify-center">
          <h1 className="text-2xl text-red-500">
            Erro ao buscar dados da API!
          </h1>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="h-[500px] flex items-center justify-center">
          <BarLoader />
        </div>
      </div>
    );
  }

  if (data?.length == 0) {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="h-[500px] flex items-center justify-center">
          <h1 className="text-2xl">Nenhum usuário cadastrado!</h1>
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Avatar</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Ativo</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback>FP</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.active ? "Ativo" : "Inativo"}</TableCell>
              <TableCell>
                <Button asChild variant="default">
                  <Link href={`users/${user.id}`}>Editar</Link>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
