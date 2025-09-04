"use client";
import { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";

function Content() {
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formRef.current) {
        const targetPosition = formRef.current.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;
        const duration = 2000; // 1.6 seconds for scroll

        const easeOutQuad = (t) => t * (2 - t); // Deceleration easing

        const animateScroll = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutQuad(progress);

          window.scrollTo(0, startPosition + distance * easedProgress);
          if (progress < 1) window.requestAnimationFrame(animateScroll);
        };
        window.requestAnimationFrame(animateScroll);
      }
    }, 100); // 1-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <ContactHero />
      <div ref={formRef} id="contact-form" className="relative z-10">
        <ContactForm />
      </div>
    </div>
  );
}

export default function CustomizeContent() {
  return <Content />;
}
