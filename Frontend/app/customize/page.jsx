'use client';

import { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import ContactHero from './ContactHero';

export default function ContactPage() {
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formRef.current) return;

      const targetY = formRef.current.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const duration = 1600; // 2 seconds for smoother scroll
      const startTime = performance.now();

      const easeInOutQuad = (t) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startY + (targetY - startY) * ease);

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }); // wait before starting scroll

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHero />

      {/* Form Section */}
      <div ref={formRef} className="relative z-10">
        <ContactForm />
      </div>
    </div>
  );
}
