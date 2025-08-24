'use client';

import { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import ContactHero from './ContactHero';

export default function ContactPage() {
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1200); // delay before scrolling

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHero />

      {/* Form Section */}
      <div ref={formRef} id="contact-form" className="relative z-10">
        <ContactForm />
      </div>
    </div>
  );
}
