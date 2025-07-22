'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ContactHero />
      <ContactForm />
      <Footer />
    </div>
  );
}