import type { Metadata } from "next";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

// // The following import prevents a Font Awesome icon server-side rendering bug,
// // where the icons flash from a very large icon down to a properly sized one:
// import '@fortawesome/fontawesome-svg-core/styles.css';
// // Prevent fontawesome from adding its CSS since we did it manually above:
// import { config } from '@fortawesome/fontawesome-svg-core';
// config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: "OSRS Chunkers",
  description:
    "Browse OSRS Chunk Locked YouTube accounts. Follow your favorite chunkers, track their progress and discover new or unknown creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics measurementId="G-BR55E0B62X" />
      <body>
        <Header />
        {children}
        <div id="modal-root" />
        <Footer />
      </body>
    </html>
  );
}
