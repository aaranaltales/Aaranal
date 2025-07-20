'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from './AboutHero';
import TeamSection from './TeamSection';
import CompanyHistory from './CompanyHistory';
import ContactInfo from './ContactInfo';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutHero />
      <TeamSection />
      <CompanyHistory />
      <ContactInfo />
      <Footer />
    </div>
  );
}