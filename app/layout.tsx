import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Café Hospedagem | Café, bistrô e hospedagem em Itaipuaçu",
  description:
    "Conheça o Café Hospedagem em Itaipuaçu: café especial, bistrô por reserva, brunch e suítes para casal. Consulte opções pelo WhatsApp.",
  icons: {
    icon: `${basePath}/logo-cafe-hospedagem.jpeg`,
    shortcut: `${basePath}/logo-cafe-hospedagem.jpeg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
