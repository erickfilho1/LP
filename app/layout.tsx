import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAKI - Creative Operational Studio",
  description:
    "Infraestrutura criativa recorrente para agencias e negocios digitais. Landing pages, videos e criativos com previsibilidade operacional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
