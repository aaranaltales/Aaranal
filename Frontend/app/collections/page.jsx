import CollectionsContent from "./CollectionsContent";

// ✅ Page-level SEO metadata
export const metadata = {
  title: "Collections | Aaranal Tales",
  description:
    "Browse Aaranal Tales collections — tote bags, pouches, crochets, and more. Stylish, customizable, and eco-friendly designs for every occasion.",
  keywords: [
    "tote bags",
    "pouches",
    "purses",
    "crochet bags",
    "handmade collections",
    "eco-friendly fashion",
    "Aaranal collections",
    "customizable bags",
  ],
  openGraph: {
    title: "Collections | Aaranal Tales",
    description:
      "Explore Aaranal’s exclusive collections: Tote Bags, Pouches, Crochets, and more — customizable and eco-friendly.",
    url: "https://aaranaltales.shop/collections",
    images: [
      {
        url: "https://aaranaltales.shop/assests/og_image.png",
        width: 1200,
        height: 630,
        alt: "Aaranal Collections",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collections | Aaranal Tales",
    description:
      "Discover Aaranal collections featuring handmade and customizable tote bags, pouches, crochets, and more.",
    images: ["https://aaranaltales.shop/assests/og.png"],
  },
};

export default function CollectionsPage() {
  return <CollectionsContent />;
}
