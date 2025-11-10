'use client'

import { AuthContextProvider } from "@/context/AuthContext";
import { ContestContextProvider } from "@/context/ContestContext";
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
        <ContestContextProvider>
          {children}
        </ContestContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}