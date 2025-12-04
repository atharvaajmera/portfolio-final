// pages/_app.tsx

// Make sure this path is correct for your project structure.
import '@/app/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}