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
  description: "Frontend Developer from Karachi, building modern web experiences with React & Next.js.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nosifer&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#030712]" suppressHydrationWarning>
        <SiteWrapper>{children}</SiteWrapper>
      </body>
    </html>
  );
}
