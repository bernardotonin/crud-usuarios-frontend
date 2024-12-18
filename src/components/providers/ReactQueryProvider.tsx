'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryProviderProps } from "./ReactQueryProvider.types";
import { useState } from "react";

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
