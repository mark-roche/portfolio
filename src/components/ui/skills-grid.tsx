"use client";

import React from "react";
import { Code, Brain, Cog, Users, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { BackgroundBeamsWithCollision } from "./background-beams-with-collision";
import { Component as EtherealShadow } from "./ethereal-shadow";
import { Vortex } from "./vortex";
import { WavyBackground } from "./wavy-background";

export function SkillsGrid() {
    return (
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Brain className="h-4 w-4 text-white" />}
                title="AI & Technology"
                description="Expert in AI tools implementation, LLM integration, and prompt engineering for optimized workflows."
                hasVortex={true}
            />
            <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<Users className="h-4 w-4 text-white" />}
                title="Leadership"
                description="Leading global teams across multiple languages, business lines, and regions with proven success."
                hasWaves={true}
            />
            <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={<Cog className="h-4 w-4 text-black dark:text-white" />}
                title="Operations"
                description="Driving operational excellence through process optimization, quality assurance, and risk management."
                hasBeams={true}
            />
            <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<Code className="h-4 w-4 text-white" />}
                title="Process Automation"
                description="Building automated systems and workflows that enhance operational efficiency and reduce manual effort."
                hasGradient={true}
            />
            <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<LineChart className="h-4 w-4 text-white" />}
                title="Data-Driven Decision Making"
                description="Transforming raw data into actionable insights for strategic business decisions and performance optimization."
                hasEtherealShadow={true}
            />
        </ul>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    hasGradient?: boolean;
    hasBeams?: boolean;
    hasEtherealShadow?: boolean;
    hasVortex?: boolean;
    hasWaves?: boolean;
}

const GridItem = ({ area, icon, title, description, hasGradient = false, hasBeams = false, hasEtherealShadow = false, hasVortex = false, hasWaves = false }: GridItemProps) => {
    return (
        <li className={cn("min-h-[14rem] list-none", area)}>
            <div className={cn(
                "relative h-full rounded-[1.25rem] p-2 md:rounded-[1.5rem] md:p-3",
                hasGradient || hasEtherealShadow || hasBeams || hasVortex || hasWaves ? "bg-transparent" : "bg-background"
            )}>
                {hasGradient && (
                    <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden md:rounded-[1.5rem]">
                        <BackgroundGradientAnimation
                            gradientBackgroundStart="rgb(76, 0, 255)"
                            gradientBackgroundEnd="rgb(126, 0, 255)"
                            firstColor="255, 70, 255"
                            secondColor="103, 21, 255"
                            thirdColor="0, 225, 255"
                            fourthColor="255, 0, 255"
                            fifthColor="124, 0, 255"
                            pointerColor="255, 100, 255"
                            size="100%"
                            blendingValue="screen"
                            interactive={true}
                            containerClassName="w-full h-full [--move-x:0] [--move-y:0] [--rotate:0] group-hover:[--move-x:1] group-hover:[--move-y:1] group-hover:[--rotate:1] relative transition-all duration-500 ease-in-out"
                            className="[--gradient-size:200%] [--gradient-angle:0deg] group-hover:[--gradient-angle:45deg] group-hover:[--gradient-size:250%] transition-all duration-500"
                        />
                    </div>
                )}
                {hasBeams && (
                    <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden md:rounded-[1.5rem]">
                        <BackgroundBeamsWithCollision className="!h-full">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/0 dark:from-neutral-950/20 dark:to-neutral-950/0" />
                        </BackgroundBeamsWithCollision>
                    </div>
                )}
                {hasEtherealShadow && (
                    <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden md:rounded-[1.5rem]">
                        <EtherealShadow
                            color="rgba(128, 128, 128, 1)"
                            animation={{ scale: 100, speed: 90 }}
                            noise={{ opacity: 1, scale: 1.2 }}
                            sizing="fill"
                            className="w-full h-full"
                        >
                            <div className="relative flex h-full flex-col justify-between p-8 z-10">
                                <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.3)] dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-base md:text-lg text-black/90 dark:text-white drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.3)] dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] max-w-[90%]">
                                    {description}
                                </p>
                            </div>
                        </EtherealShadow>
                    </div>
                )}
                {hasVortex && (
                    <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden md:rounded-[1.5rem]">
                        <Vortex
                            backgroundColor="#000000"
                            baseHue={220}
                            particleCount={500}
                            rangeY={100}
                            baseSpeed={0.5}
                            rangeSpeed={1}
                            className="w-full h-full"
                        >
                            <div className="relative flex h-full flex-col justify-between p-8 z-10">
                                <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-base md:text-lg text-white/90 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] max-w-[90%]">
                                    {description}
                                </p>
                            </div>
                        </Vortex>
                    </div>
                )}
                {hasWaves && (
                    <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden md:rounded-[1.5rem]">
                        <WavyBackground
                            colors={[
                                "#60a5fa",  // blue-400
                                "#3b82f6",  // blue-500
                                "#2563eb",  // blue-600
                                "#1d4ed8",  // blue-700
                                "#1e40af",  // blue-800
                            ]}
                            waveWidth={20}
                            backgroundFill="#020617"
                            blur={5}
                            speed="fast"
                            waveOpacity={0.5}
                            className="flex items-center justify-center"
                            containerClassName="!h-full !w-full"
                        >
                            <div className="relative flex h-full flex-col justify-between p-8 z-10">
                                <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-base md:text-lg text-white/90 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] max-w-[90%]">
                                    {description}
                                </p>
                            </div>
                        </WavyBackground>
                    </div>
                )}
                {!hasEtherealShadow && !hasBeams && !hasVortex && !hasWaves && (
                    <div className={cn(
                        "relative flex h-full flex-col gap-6 overflow-hidden rounded-xl p-6 md:p-6 group z-10",
                        hasGradient
                            ? "border border-white/20 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors duration-500"
                            : "border border-border bg-background dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]"
                    )}>
                        <div className="relative flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="space-y-3 max-w-[75%]">
                                    <h3 className={cn(
                                        "pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance",
                                        hasGradient ? "text-white" : "text-black dark:text-white"
                                    )}>
                                        {title}
                                    </h3>
                                    <h2 className={cn(
                                        "[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem]",
                                        hasGradient ? "text-white/90" : "text-black/80 dark:text-white/80"
                                    )}>
                                        {description}
                                    </h2>
                                </div>
                                <div className={cn(
                                    "relative w-fit rounded-lg border-[0.75px] p-2 z-10 ml-4",
                                    hasGradient ? "border-white/20 bg-white/10" : "border-border bg-muted"
                                )}>
                                    {icon}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {hasBeams && (
                    <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-xl p-6 md:p-6 group z-10">
                        <div className="relative flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="space-y-3 max-w-[75%]">
                                    <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-black dark:text-white">
                                        {title}
                                    </h3>
                                    <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-black/80 dark:text-white/80">
                                        {description}
                                    </h2>
                                </div>
                                <div className="relative w-fit rounded-lg border-[0.75px] p-2 z-10 ml-4 border-border bg-muted">
                                    {icon}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </li>
    );
}; 