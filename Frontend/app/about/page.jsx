import AboutContent from "./AboutContent";

// ✅ Page-level SEO metadata
export const metadata = {
  title: "About Us | Aaranal Tales",
  description:
    "Discover the story of Aaranal Tales. Learn about our journey, vision, and the team behind eco-friendly tote bags, crochets, and personalized fashion.",
  keywords: [
    "Aaranal Tales",
    "about Aaranal",
    "eco-friendly brand",
    "sustainable fashion",
    "tote bag company",
    "crochet accessories",
    "our story",
  ],
  openGraph: {
    title: "About Us | Aaranal Tales",
    description:
      "Learn more about Aaranal Tales, our journey, and the team crafting sustainable and customizable fashion.",
    url: "https://aaranaltales.shop/about",
    images: [
      {
        url: "https://aaranaltales.shop/assests/og_about.png",
        width: 1200,
        height: 630,
        alt: "About Aaranal Tales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Aaranal Tales",
    description:
      "Meet the Aaranal Tales team and explore our journey into eco-friendly and customizable fashion.",
    images: ["https://aaranaltales.shop/assests/og.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
