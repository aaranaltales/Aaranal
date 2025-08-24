import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import Script from 'next/script';
import LayoutWrapper from "./LayoutWrapper";
import Poster from "../components/poster";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AARANAL",
  description: "the art you carry",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Remove the script from here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {/* Add the Script component here */}
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="beforeInteractive"
        />
        <LayoutWrapper>
            {children}
            <Poster />
        </LayoutWrapper>
      </body>
    </html>
  );
}