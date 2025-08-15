import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rick and morty characters",
  description: "Explore characters from the Rick and Morty universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
