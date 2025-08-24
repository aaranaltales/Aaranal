'use client';

import Head from 'next/head';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Basic SEO */}
        <title>Aaranal Tales | Custom & Stylish Collections</title>
        <meta
          name="description"
          content="Discover Aaranal’s exclusive totebag collection featuring minimal, floral, and customizable designs. Perfect for work, travel, and everyday fashion with your own personalization."
        />
        <meta
          name="keywords"
          content="Aaranal tote bags, custom tote bags, personalized tote bags, handmade tote bags, stylish tote bags, office tote bags, travel tote bags, crochets, pouches, purses, handbags, eco-friendly bags, unique tote designs"
        />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:title" content="Aaranal Tales | Custom & Stylish Collections" />
        <meta
          property="og:description"
          content="Shop Aaranal’s totebag collection — minimal, floral, and fully customizable. Add names, quotes, or designs to make your tote unique."
        />
        <meta property="og:url" content="https://aaranaltales.shop" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aaranal" />
        <meta property="og:image" content="https://aaranaltales.shop/assests/aaranal.jpg" />

        {/* Twitter Card (X) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aaranal Tales | Custom & Stylish Collections" />
        <meta
          name="twitter:description"
          content="Discover Aaranal’s totebag collection featuring customizable and stylish designs made for every occasion."
        />
        <meta name="twitter:image" content="https://aaranaltales.shop/assests/aaranal.jpg" />
      </Head>

      <div className="min-h-screen">
        <Hero />
        <ProductGrid />
        <Features />
        <Newsletter />
      </div>
    </>
  );
}
