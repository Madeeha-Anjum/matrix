import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ExplorerProvider } from "@/app/store/ExplorerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Explorer",
  description: "A file explorer built with React and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ExplorerProvider>
        <body className={inter.className}>{children}</body>
      </ExplorerProvider>
    </html>
  );
}
