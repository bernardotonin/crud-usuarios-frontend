"use client";

import { Search, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import Link from "next/link";

export default function UserDashboardHeader() {
  const [text, setText] = useState<string>("");

  const router = useRouter();
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (!query) {
      router.push(`/users`);
    }
    if (query) {
      router.push(`?query=${query}`);
    }
  }, [router, query]);

  return (
    <div className="flex items-center justify-between w-[80%] self-center border-b border-gray-300 pb-3">
      <h1>Lista de usuários</h1>
      <div className="gap-3 flex">
        <Button>
          <Link href="/users/create">Criar Usuario</Link>
        </Button>
        <Button>
          <Link href="/users/permission/create">Criar Permissão</Link>
        </Button>
      </div>

      <div className="flex gap-3 items-center">
        <Search />
        <Input
          value={text}
          placeholder="Pesquise aqui"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          variant="outline"
          disabled={text === ""}
          size="sm"
          onClick={() => {
            setText("");
          }}
        >
          <XIcon color="red" />
        </Button>
      </div>
    </div>
  );
}
