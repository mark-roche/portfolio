"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { TextRoll } from "./text-roll";

interface AnimatedCarouselProps {
    title?: string;
    subtitle?: string;
    logoCount?: number;
    autoPlayInterval?: number;
    logos?: string[] | null;
    containerClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    carouselClassName?: string;
    logoClassName?: string;
    itemsPerViewMobile?: number;
    itemsPerViewDesktop?: number;
    spacing?: string;
    padding?: string;
    logoContainerWidth?: string;
    logoContainerHeight?: string;
    logoImageWidth?: string;
    logoImageHeight?: string;
    logoMaxWidth?: string;
    logoMaxHeight?: string;
}

export const AnimatedCarousel = ({
    title = "Trusted by thousands of businesses worldwide",
    subtitle,
    logoCount = 15,
    autoPlayInterval = 500,
    logos = null,
    containerClassName = "",
    titleClassName = "",
    subtitleClassName = "",
    carouselClassName = "",
    logoClassName = "",
    itemsPerViewMobile = 4,
    itemsPerViewDesktop = 6,
    spacing = "gap-10",
    padding = "py-20 lg:py-40",
    logoContainerWidth = "w-48",
    logoContainerHeight = "h-24",
    logoImageWidth = "w-full",
    logoImageHeight = "h-full",
    logoMaxWidth = "",
    logoMaxHeight = "",
}: AnimatedCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [isHovered, setIsHovered] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!api || !isHovered) {
            return;
        }

        const timer = setInterval(() => {
            const totalSlides = api.scrollSnapList().length;
            const nextIndex = (currentIndex + 1) % totalSlides;

            api.scrollTo(nextIndex);
            setCurrentIndex(nextIndex);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [api, isHovered, autoPlayInterval, currentIndex]);

    const logoItems = logos || Array.from({ length: logoCount }, (_, i) => `/svg/${[
        "openai.svg",
        "anthropic.svg",
        "claude-color.svg",
        "gemini-color.svg",
        "perplexity-color.svg",
        "groq.svg",
        "midjourney.svg",
        "github-icon-1.svg",
        "npm-square.svg",
        "Figma_Symbol_0.svg"
    ][i % 10]}`);

    const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight} ${logoMaxWidth} ${logoMaxHeight}`.trim();

    return (
        <div className={`w-full ${padding} ${containerClassName}`}>
            <div className="container mx-auto">
                <div className={`flex flex-col ${spacing}`}>
                    <div className="space-y-1">
                        <h2 className={`text-xl md:text-3xl tracking-tighter font-regular text-left ml-2 text-foreground ${titleClassName}`}>
                            <TextRoll>{title}</TextRoll>
                        </h2>
                        {subtitle && (
                            <p className={`text-sm md:text-base tracking-tight text-left ml-2 text-foreground/70 italic ${subtitleClassName}`}>
                                <TextRoll>{subtitle}</TextRoll>
                            </p>
                        )}
                    </div>

                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => {
                            setIsHovered(false);
                            setCurrentIndex(0);
                            api?.scrollTo(0);
                        }}
                        className="relative group"
                    >
                        <Carousel
                            setApi={setApi}
                            className={`w-full ${carouselClassName}`}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                        >
                            <CarouselContent>
                                {logoItems.map((logo, index) => (
                                    <CarouselItem
                                        key={index}
                                        className={`basis-1/${itemsPerViewMobile} lg:basis-1/${itemsPerViewDesktop}`}
                                    >
                                        <div className={`flex rounded-md ${logoContainerWidth} ${logoContainerHeight} items-center justify-center p-4 transition-all duration-300 hover:bg-accent/20 ${logoClassName} ${isHovered ? 'hover:scale-110' : ''}`}>
                                            <img
                                                src={typeof logo === 'string' ? logo : logo}
                                                alt={`Logo ${index + 1}`}
                                                className={`${logoImageSizeClasses} object-contain`}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Case1 = (props: AnimatedCarouselProps) => {
    return <AnimatedCarousel {...props} />;
}; 