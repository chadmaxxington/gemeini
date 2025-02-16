"use client"
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// import '@/styles/glowCursor.css';

export default function HomePage() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (cursor instanceof HTMLDivElement) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <div ref={cursorRef} className="glow-cursor"></div>
      <motion.img 
        src="/logo.png" 
        alt="BuisMR Logo" 
        className="w-96 h-96 mb-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      />
      <button onClick={() => window.location.href = '/intro'} className="bg-white text-black px-4 py-2 text-base font-semibold rounded-full hover:bg-gray-300 transition">
        Start your entrepreneurial journey with BuisMR
      </button>
    </main>
  );
}
