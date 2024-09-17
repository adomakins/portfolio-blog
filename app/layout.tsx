import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

// Get domain from url
// Pass domain as prop to pages

export const metadata: Metadata = {
  title: "Domain-Specific Title",
  description: "Domain-specific description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="py-20 px-2.5 sm:px-0 max-w-[600px] mx-auto w-full">
        <Analytics />
        {children}
      </body>
    </html >
  );
}
