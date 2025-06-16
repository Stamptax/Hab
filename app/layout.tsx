import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { MagnetBackground } from "@/components/visual-effects/MagnetBackground";
export const metadata: Metadata = {
  title: "Hab",
  description: "Hab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MagnetBackground />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
