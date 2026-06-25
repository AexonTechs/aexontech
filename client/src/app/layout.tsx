import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aexon - Engineering Intelligent Digital Systems",
  description: "Building scalable AI-native platforms and cloud infrastructure for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
