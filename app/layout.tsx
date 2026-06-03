import type { Metadata } from "next";
import GlobalCursor from "./GlobalCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAKI - Creative Operational Studio",
  description:
    "Infraestrutura criativa recorrente para ag?ncias e neg?cios digitais. Landing pages, v?deos e criativos com previsibilidade operacional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <GlobalCursor />
        {children}
      </body>
    </html>
  );
}
