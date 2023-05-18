"use client";
import { Container } from "@mui/material";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Xepelin Tech Challenge",
  description: "Prueba técnica Fullstack TS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container maxWidth={false}>{children}</Container>
      </body>
    </html>
  );
}
