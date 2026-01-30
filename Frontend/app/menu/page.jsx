import MenuContent from "./MenuContent";

export const metadata = {
    title: "Valentine's Special Menu | Aaranal Tales",
    description:
        "Browse our Valentine's Day special collection - handcrafted tote bags, pouches, crochets, and more. Perfect gifts for your loved ones.",
    keywords: [
        "Valentine's Day gifts",
        "handmade bags",
        "tote bags",
        "pouches",
        "crochet bags",
        "Valentine's special",
        "Aaranal Tales",
        "gift ideas",
    ],
    openGraph: {
        title: "Valentine's Special Menu | Aaranal Tales",
        description:
            "Discover our Valentine's collection - unique handcrafted bags and accessories for your special someone.",
        url: "https://aaranaltales.shop/menu",
        images: [
            {
                url: "https://aaranaltales.shop/assests/og_image.png",
                width: 1200,
                height: 630,
                alt: "Aaranal Valentine's Collection",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Valentine's Special Menu | Aaranal Tales",
        description:
            "Browse our Valentine's collection - handcrafted with love for your loved ones.",
        images: ["https://aaranaltales.shop/assests/og.png"],
    },
};

export default function MenuPage() {
    return <MenuContent />;
}
