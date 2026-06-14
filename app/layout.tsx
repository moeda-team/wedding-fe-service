import type { Metadata } from "next";
import { Geist, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Invitee",
  description: "Digital Wedding Invitation",
  icons: "/images/Logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${outfit.variable}
          ${geist.variable}
          ${playfair.variable}
          bg-white
          font-sans
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
