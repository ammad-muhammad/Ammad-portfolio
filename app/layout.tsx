import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Orbitron, Righteous, Nosifer, Acme } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const righteous = Righteous({ weight: '400', subsets: ['latin'], variable: '--font-righteous' })
const nosifer = Nosifer({ weight: '400', subsets: ['latin'], variable: '--font-nosifer' })
const acme = Acme({ weight: '400', subsets: ['latin'], variable: '--font-acme' })

export const metadata: Metadata = {
  title: "Muhammad Ammad | Portfolio",
  description: "Full Stack Web & Mobile Developer from Karachi, building modern web experiences with React & Next.js.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

import SiteWrapper from "@/components/site-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${orbitron.variable} ${righteous.variable} ${nosifer.variable} ${acme.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nosifer&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>
        <SiteWrapper>{children}</SiteWrapper>
      </body>
    </html>
  );
}
