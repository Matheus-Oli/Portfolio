import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { themeBootScript } from "@/components/sites/matheus/theme";
import "./globals.css";
import "@/components/sites/matheus/site.css";
import "@/components/sites/matheus/motion.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matheus — Desenvolvedor Web Full Stack",
  description:
    "Portfólio de Matheus Oliveira, desenvolvedor web full stack com foco em Angular e C#/.NET, em Vitória, ES.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="cream" className={spaceGrotesk.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
