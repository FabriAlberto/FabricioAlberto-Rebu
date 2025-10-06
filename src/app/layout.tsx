import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import MainLayout from "@/layout/MainLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rebu HR",
  description: "Rebu HR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Theme accentColor="blue" radius="small" appearance="inherit">
          <MainLayout>{children}</MainLayout>
        </Theme>
      </body>
    </html>
  );
}
