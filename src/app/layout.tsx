import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  description: "Template by FH.Dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-900">
        {children}
      </body>
    </html>
  );
}
