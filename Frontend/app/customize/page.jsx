import CustomizeContent from "./CustomizeContent";

// ✅ Page-level SEO metadata
export const metadata = {
  title: "Customize | Aaranal Tales",
  description:
    "Personalize your tote bags, pouches, and crochets with Aaranal Tales. Add names, quotes, or designs to create your unique fashion statement.",
  keywords: [
    "custom tote bags",
    "personalized tote bags",
    "custom pouches",
    "custom crochets",
    "eco-friendly custom bags",
    "Aaranal customize",
  ],
  openGraph: {
    title: "Customize | Aaranal Tales",
    description:
      "Design your own Aaranal products with custom names, quotes, and patterns. Perfect for gifts or personal style.",
    url: "https://aaranaltales.shop/customize",
    images: [
      {
        url: "https://aaranaltales.shop/assests/og_image.png",
        width: 1200,
        height: 630,
        alt: "Customize Aaranal Tote Bags",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customize | Aaranal Tales",
    description:
      "Create your personalized tote bags, crochets, and pouches with Aaranal Tales.",
    images: ["https://aaranaltales.shop/assests/og.png"],
  },
};

export default function CustomizePage() {
  return <CustomizeContent />;
}
