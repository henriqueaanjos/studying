import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";
import { Toaster } from "sonner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studying",
  description: "O App para Controlar os seus estudos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased w-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
              {children}
              <Toaster />
            </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
