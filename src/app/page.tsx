"use client";

import { Navigation } from "@/components/ui/navigation";
import { Hero } from "@/components/ui/hero";
import { SkillsGrid } from "@/components/ui/skills-grid";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
    return (
        <AuroraBackground>
            <Navigation />
            <main className="pt-16">
                <Hero />
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                Skills & Capabilities
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Leveraging AI and human expertise to transform support operations
                            </p>
                        </div>
                        <SkillsGrid />
                    </div>
                </section>
            </main>
        </AuroraBackground>
    );
} 