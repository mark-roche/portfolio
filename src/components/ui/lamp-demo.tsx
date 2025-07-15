"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./lamp";
import { Brain, Users2, Cog, Code } from "lucide-react";
import { BackgroundGradientAnimation } from "./background-gradient-animation";

const skills = [
    {
        icon: Brain,
        title: "AI & Technology",
        description: "Expert in AI tools implementation, LLM integration, and prompt engineering for optimized workflows.",
        gradient: {
            start: "rgb(0, 108, 162)",
            end: "rgb(0, 17, 82)",
            first: "18, 113, 255",
            second: "0, 136, 255",
            third: "0, 89, 255",
            fourth: "0, 66, 255",
            fifth: "0, 47, 255",
        }
    },
    {
        icon: Users2,
        title: "Leadership",
        description: "Leading global teams across multiple languages, business lines, and regions with proven success.",
        gradient: {
            start: "rgb(162, 108, 0)",
            end: "rgb(82, 17, 0)",
            first: "255, 113, 18",
            second: "255, 136, 0",
            third: "255, 89, 0",
            fourth: "255, 66, 0",
            fifth: "255, 47, 0",
        }
    },
    {
        icon: Cog,
        title: "Operations",
        description: "Driving operational excellence through process optimization, quality assurance, and risk management.",
        gradient: {
            start: "rgb(0, 162, 108)",
            end: "rgb(0, 82, 17)",
            first: "18, 255, 113",
            second: "0, 255, 136",
            third: "0, 255, 89",
            fourth: "0, 255, 66",
            fifth: "0, 255, 47",
        }
    },
    {
        icon: Code,
        title: "Process Automation",
        description: "Building automated systems and workflows that enhance operational efficiency and reduce manual effort.",
        gradient: {
            start: "rgb(108, 0, 162)",
            end: "rgb(0, 17, 82)",
            first: "221, 74, 255",
            second: "103, 21, 205",
            third: "106, 0, 186",
            fourth: "0, 17, 82",
            fifth: "124, 0, 163",
        }
    }
];

export function LampDemo() {
    return (
        <LampContainer>
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-50 text-3xl font-bold text-center text-slate-100 mb-12"
            >
                Skills & Capabilities
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-50 max-w-6xl mx-auto px-4"
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        className="relative rounded-2xl overflow-hidden h-[200px]"
                    >
                        <div className="absolute inset-0">
                            <BackgroundGradientAnimation
                                gradientBackgroundStart={skill.gradient.start}
                                gradientBackgroundEnd={skill.gradient.end}
                                firstColor={skill.gradient.first}
                                secondColor={skill.gradient.second}
                                thirdColor={skill.gradient.third}
                                fourthColor={skill.gradient.fourth}
                                fifthColor={skill.gradient.fifth}
                                pointerColor="140, 100, 255"
                                size="150%"
                                blendingValue="soft-light"
                                interactive={true}
                                containerClassName="w-full h-full"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative p-8 h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                                    <skill.icon className="w-5 h-5 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-100">
                                    {skill.title}
                                </h3>
                            </div>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {skill.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </LampContainer>
    );
} 