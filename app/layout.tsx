import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata: Metadata = {
  title: "DMTT Administration Portal | Tax Authority",
  description: "Government Tax Authority Platform for administering Domestic Minimum Top-Up Tax under OECD Pillar Two",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
