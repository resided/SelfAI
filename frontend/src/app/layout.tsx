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
  title: "CastMate | AI Companion on Faracster",
  description: "Your AI-powered Butler on Faracster. Mint, trade, and interact with intelligent companions.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "CastMate | AI Companion on Faracster",
    description: "Your AI-powered Butler on Faracster",
    images: [{ url: "/og.png" }],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
