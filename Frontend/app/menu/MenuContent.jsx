"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import MenuHero from "./MenuHero";
import MenuGrid from "./MenuGrid";

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        // Generate random hearts on client-side only to avoid hydration mismatch
        const newHearts = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            scale: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 5,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute"
                    style={{
                        left: `${heart.left}%`,
                        top: `${heart.top}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        scale: [0, heart.scale, 0],
                        y: -50, // Float up slightly
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "easeInOut",
                    }}
                >
                    <Heart className="w-8 h-8 text-rose-300/30 fill-rose-300/30" />
                </motion.div>
            ))}
        </div>
    );
};

export default function MenuContent() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 relative">
            <FloatingHearts />
            <div className="relative z-10">
                <MenuHero />
                <MenuGrid />
            </div>
        </main>
    );
}
