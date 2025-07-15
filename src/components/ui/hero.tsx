"use client";
import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { VaporizeTextCycle } from './vapour-text-effect';

export function Hero() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-[50vh] flex items-start pt-8">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-8 py-4 relative">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Title with Vapour Effect */}
                    <div className="mb-4 min-h-[120px] flex flex-col items-center justify-center w-full">
                        <div className="w-full overflow-visible px-4">
                            <VaporizeTextCycle
                                texts={[
                                    "BPO Vendor Solutions Lead",
                                    "Building AI-powered support systems",
                                    "AI/Automation Practitioner & Advocate"
                                ]}
                                font={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "48px",
                                    fontWeight: 700,
                                }}
                                color="rgb(15, 23, 42)" // slate-900 for light mode
                                spread={5}
                                density={5}
                                animation={{
                                    vaporizeDuration: 1.75, // Slightly faster vaporize
                                    fadeInDuration: 0.75, // Slightly faster fade in
                                    waitDuration: 2.5, // Reduced wait time
                                }}
                                direction="left-to-right"
                                alignment="center"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
                        I lead teams and build systems that blend human expertise with emerging AI technologies,
                        transforming support operations across multiple channels and business lines.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => scrollToSection('work')}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                        >
                            <span>View My Experience</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            <span>Download Resume</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="fixed bottom-8 left-8 z-50">
                <style jsx>{`
                    @keyframes invertOnBackground {
                        from { filter: invert(1); }
                        to { filter: invert(1); }
                    }
                    .mouse-scroll {
                        filter: invert(1);
                        animation: invertOnBackground 2s infinite;
                        mix-blend-mode: exclusion;
                    }
                `}</style>
                <div className="mouse-scroll">
                    <div className="w-6 h-10 border-2 border-white rounded-full p-1 bg-black bg-opacity-20">
                        <div className="w-1.5 h-3 bg-white rounded-full animate-bounce mx-auto"></div>
                    </div>
                </div>
            </div>
        </section>
    );
} 