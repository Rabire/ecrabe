import TailwindIndicator from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecrabe",
  description: "TODO: trouver une description avec le branding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn("relative", inter.className)}>
        <TailwindIndicator />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
