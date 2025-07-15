"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedCarousel } from "@/components/ui/animated-carousel";

const aiTools = [
    "ai-tools/GPT.svg",
    "ai-tools/ANTHROPIC.svg",
    "ai-tools/CLAUDE.svg",
    "ai-tools/GEMINI.svg",
    "ai-tools/PERPLEXITY.svg",
    "ai-tools/GROQ.svg",
    "ai-tools/MIDJOURNEY.svg",
    "ai-tools/deepseek-color.svg",
    "ai-tools/meta-12361.svg",
    "ai-tools/Cohere_idKpB5u1dr_0.svg"
];

const devTools = [
    "dev-tools/python-5.svg",
    "dev-tools/javascript-2.svg",
    "dev-tools/typescript.svg",
    "dev-tools/react-2.svg",
    "dev-tools/nodejs-3.svg",
    "dev-tools/nestjs.svg",
    "dev-tools/css-3.svg",
    "dev-tools/sql-database-generic-svgrepo-com.svg",
    "dev-tools/githubcopilot.svg",
    "dev-tools/Portrait logo.svg" // Gumloop
];

const otherTools = [
    "other-tools/Shopify.com_Symbol_0.svg",
    "other-tools/github-icon-1.svg",
    "other-tools/slack-new-logo.svg",
    "other-tools/looker-icon-svgrepo-com.svg",
    "other-tools/tableau-software.svg",
    "other-tools/1_Guru-G_Logo.svg",
    "other-tools/zendesk-1.svg",
    "other-tools/Microsoft_Symbol_0.svg"
];

const carouselBaseProps = {
    itemsPerViewMobile: 2,
    itemsPerViewDesktop: 4,
    padding: "py-4",
    spacing: "gap-4",
    logoContainerWidth: "w-40",
    logoContainerHeight: "h-20",
    titleClassName: "text-xl md:text-2xl !mb-4",
    logoClassName: "bg-white/5 backdrop-blur-sm border border-white/10"
};

export default function Toolkit() {
    return (
        <AuroraBackground>
            <main className="pt-16">
                <section className="py-10">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
                                My Toolkit
                            </h2>
                            <p className="text-base text-gray-600 dark:text-gray-400">
                                Technologies and tools I use to build solutions
                            </p>
                        </div>
                        <div className="max-w-7xl mx-auto space-y-16">
                            <AnimatedCarousel
                                {...carouselBaseProps}
                                title="AI & Development Tools"
                                subtitle="No-code, low-code, vibe code, or custom stack - whatever ships solutions fastest"
                                logos={aiTools.map(logo => `/svg/${logo}`)}
                                logoCount={aiTools.length}
                                autoPlayInterval={500}
                            />

                            <AnimatedCarousel
                                {...carouselBaseProps}
                                title="Increasingly comfortable with"
                                subtitle="Growing my skills, learning the hard way, one experiment at a time"
                                logos={devTools.map(logo => `/svg/${logo}`)}
                                logoCount={devTools.length}
                                autoPlayInterval={500}
                            />

                            <AnimatedCarousel
                                {...carouselBaseProps}
                                title="Other platforms & tools"
                                subtitle="Part of my daily workflow, no learning curve"
                                logos={otherTools.map(logo => `/svg/${logo}`)}
                                logoCount={otherTools.length}
                                autoPlayInterval={500}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </AuroraBackground>
    );
} 