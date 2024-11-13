import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <GoogleAnalytics measurementId="G-BR55E0B62X" />
      <Component {...pageProps} />
    </SessionProvider>
  )
}