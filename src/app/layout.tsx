import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
   variable: "--font-sans",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Black Friday 2025",
   description: "HyvinvointiHeimon Black Friday 2025",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${inter.variable} antialiased h-full min-h-screen bg-background grid`}
         >
            {children}
         </body>
      </html>
   );
}
