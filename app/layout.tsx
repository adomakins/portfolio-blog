import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

// Get domain from url
// Pass domain as prop to pages

export const metadata: Metadata = {
  title: "Adam Skjervold",
  description: "Blah blah blah (pretend I said something funny and/or clever here)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="py-8 md:py-20 px-2.5 sm:px-0 max-w-[600px] mx-auto w-full">
        <Analytics />
      {children}
      </body>
    </html >
  );
}
