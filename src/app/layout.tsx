import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";

import { Metadata } from "next";
import AuthProvider from "../components/authProviders/authProvider";

export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body suppressHydrationWarning={true}>{children}</body>
      </AuthProvider>
    </html>
  );
}
