import UserUpdatePage from "@/pages/UserUpdatePage";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserEdit({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const userId = (await params).id

  if (!userId || isNaN(+userId)){
    redirect('/users')
  }

  return <UserUpdatePage />;
}
