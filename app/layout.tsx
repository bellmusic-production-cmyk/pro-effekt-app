import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRYBUN | Service-Management-Software für Unternehmen",
  description:
    "TRYBUN unterstützt technische Serviceunternehmen bei Kundenverwaltung, Serviceeinsätzen, Geräteverwaltung, Wartungen und digitaler Dokumentation.",
  openGraph: {
    title: "TRYBUN | Service-Management-Software für Unternehmen",
    description:
      "Kunden, Geräte, Serviceeinsätze und Wartungen zentral mit TRYBUN verwalten.",
    locale: "de_DE",
    type: "website",
    siteName: "TRYBUN",
  },
  applicationName: "TRYBUN",
  icons: {
    icon: "/trybun-logo.png",
    shortcut: "/trybun-logo.png",
    apple: "/trybun-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

