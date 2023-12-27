import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";

import { Metadata } from "next";
import AuthProvider from "../components/authProviders/authProvider";

export const metadata: Metadata = {
  title: "2S Logística",
  description: "Entregas rápidas",
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
