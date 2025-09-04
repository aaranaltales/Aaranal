import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import Script from "next/script";
import LayoutWrapper from "./LayoutWrapper";
import "./globals.css";
import Poster from "@/components/Poster";

// Fonts
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO + Favicons
export const metadata = {
  title: {
    default: "Aaranal Tales | Custom & Stylish Collections",
    template: "%s | Aaranal Tales",
  },
  description:
    "Discover Aaranal’s exclusive totebag collection featuring minimal, floral, and customizable designs. Perfect for work, travel, and everyday fashion with your own personalization.",
  keywords: [
    "Aaranal tote bags",
    "custom tote bags",
    "personalized tote bags",
    "handmade tote bags",
    "stylish tote bags",
    "office tote bags",
    "travel tote bags",
    "crochets",
    "pouches",
    "purses",
    "handbags",
    "eco-friendly bags",
    "unique tote designs",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Aaranal Tales | Custom & Stylish Collections",
    description:
      "Shop Aaranal’s totebag collection — minimal, floral, and fully customizable. Add names, quotes, or designs to make your tote unique.",
    url: "https://aaranaltales.shop",
    siteName: "Aaranal",
    type: "website",
    images: [
      {
        url: "https://aaranaltales.shop/assests/og_image.png",
        width: 1200,
        height: 630,
        alt: "Aaranal Tote Bags Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaranal Tales | Custom & Stylish Collections",
    description:
      "Discover Aaranal’s totebag collection featuring customizable and stylish designs made for every occasion.",
    images: ["https://aaranaltales.shop/assests/og.png"],
  },
  verification: {
    google: "paste-your-GSC-code-here", // ✅ keep this for meta verification
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* ✅ WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Aaranal Tales",
              url: "https://aaranaltales.shop",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://aaranaltales.shop/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* ✅ Breadcrumbs structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Collections",
                  item: "https://aaranaltales.shop/collections",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Customize",
                  item: "https://aaranaltales.shop/customize",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "About",
                  item: "https://aaranaltales.shop/about",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Auth",
                  item: "https://aaranaltales.shop/auth",
                },
              ],
            }),
          }}
        />

        {/* ✅ Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aaranal Tales",
              url: "https://aaranaltales.shop",
              logo: "https://aaranaltales.shop/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-XXXXXXXXXX",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi", "Telugu"],
                },
              ],
              sameAs: [
                "https://www.instagram.com/aaranal.tales",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {/* ✅ Google Sign-In script */}
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
