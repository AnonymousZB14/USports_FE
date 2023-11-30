import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "USports",
  description: "usports",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
