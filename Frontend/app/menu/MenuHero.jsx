"use client";

import { motion } from "framer-motion";

export default function MenuHero() {
    return (
        <section className="relative py-16 lg:py-20 overflow-hidden">
            {/* Decorative Hearts Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 text-rose-200 text-6xl opacity-30 animate-pulse">
                    ♥
                </div>
                <div className="absolute top-20 right-20 text-pink-200 text-4xl opacity-40 animate-pulse delay-300">
                    ♥
                </div>
                <div className="absolute bottom-16 left-1/4 text-rose-300 text-3xl opacity-25 animate-pulse delay-500">
                    ♥
                </div>
                <div className="absolute top-1/3 right-1/3 text-pink-300 text-5xl opacity-20 animate-pulse delay-700">
                    ♥
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Valentine Badge */}
                    <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-6 shadow-sm">
                        <span className="text-lg">♥</span>
                        Valentine's Special Menu
                        <span className="text-lg">♥</span>
                    </span>

                    {/* Main Title */}
                    <h1 className="text-5xl lg:text-7xl font-sans font-light text-gray-900 mb-6">
                        Everything{" "}
                        <span className="font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                            With Love
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl lg:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                        Find the perfect gift from our handcrafted collection
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
