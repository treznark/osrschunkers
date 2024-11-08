import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import "./globals.css";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */


export const metadata: Metadata = {
  title: "OSRS Chunkers",
  description: "Browse OSRS Chunk Locked YouTube accounts. Follow your favorite chunkers, track their progress and discover new or unknown creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
