"use client";

import AboutHero from "./AboutHero";
import CompanyHistory from "./CompanyHistory";
import ContactInfo from "./ContactInfo";
import TeamSection from "./TeamSection";

export default function AboutContent() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <TeamSection />
      <CompanyHistory />
      <ContactInfo />
    </div>
  );
}
