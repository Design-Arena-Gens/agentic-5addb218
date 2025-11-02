import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Social Media Manager",
  description: "Automated social media management with AI-powered content creation",
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
