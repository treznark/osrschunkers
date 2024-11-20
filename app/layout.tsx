import type { Metadata } from "next";
import GoogleAnalytics from "@bradgarropy/next-google-analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "./globals.css";

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
