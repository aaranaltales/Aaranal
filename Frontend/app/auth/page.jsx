import AuthContent from "./AuthContent";

// ✅ SEO Metadata
export const metadata = {
  title: "Login / Signup | Aaranal Tales",
  description:
    "Access your Aaranal Tales account. Login or create a new account to explore eco-friendly tote bags, crochets, and personalized fashion.",
  keywords: [
    "Aaranal Tales login",
    "signup Aaranal Tales",
    "auth page",
    "eco-friendly fashion account",
    "customer login",
    "register Aaranal",
  ],
  openGraph: {
    title: "Login / Signup | Aaranal Tales",
    description:
      "Sign in or create your Aaranal Tales account to shop eco-friendly tote bags, crochets, and more.",
    url: "https://aaranaltales.shop/auth",
    images: [
      {
        url: "https://aaranaltales.shop/assests/og_auth.png",
        width: 1200,
        height: 630,
        alt: "Aaranal Tales Login / Signup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login / Signup | Aaranal Tales",
    description:
      "Login or register your Aaranal Tales account to access sustainable and customizable fashion collections.",
    images: ["https://aaranaltales.shop/assests/og.png"],
  },
};

export default function AuthPage() {
  return <AuthContent />;
}
