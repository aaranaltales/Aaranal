'use client'
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { useLoading } from '@/context/LoadingContext';

export default function LoadingOverlay() {
  const { loading } = useLoading();

  // local flag that controls when the overlay is actually shown
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout;

    if (loading) {
      // when loading starts -> immediately show the overlay
      setVisible(true);
    } else {
      // when loading finishes -> wait 1s before hiding
      timeout = setTimeout(() => setVisible(false), 1000);
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <Loading />
    </div>
  );
}
