import type { Metadata, Viewport } from "next";
import { Cinzel, Geist } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PNS Fátima - Portal de Liturgia",
  description: "Portal litúrgico da Paróquia Nossa Senhora de Fátima. Guias de ritos, sacristia, atos devocionais e capela musical.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1A253A] text-[#FDF8F0] selection:bg-[#B38728] selection:text-[#1A253A]">
        {children}
      </body>
    </html>
  );
}
