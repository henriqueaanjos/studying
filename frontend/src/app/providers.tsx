'use client'

import { AuthContextProvider } from "@/context/AuthContext";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
          {children}
      </AuthContextProvider>
    </QueryClientProvider>
  );
}