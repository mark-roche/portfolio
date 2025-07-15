"use client";

import React, { useRef, useEffect, useState, createElement, useMemo, useCallback, memo, MutableRefObject } from "react";

export enum Tag {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    P = "p",
}

// Helper Components
const SeoElement = memo(({ tag = Tag.P, texts }: { tag: Tag, texts: string[] }) => {
    const style = useMemo(() => ({
        position: "absolute" as const,
        width: "0",
        height: "0",
        overflow: "hidden",
        userSelect: "none" as const,
        pointerEvents: "none" as const,
    }), []);

    const safeTag = Object.values(Tag).includes(tag) ? tag : "p";
    return createElement(safeTag, { style }, texts?.join(" ") ?? "");
});

type VaporizeTextCycleProps = {
    texts: string[];
    font?: {
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: number;
    };
    color?: string;
    spread?: number;
    density?: number;
    animation?: {
        vaporizeDuration?: number;
        fadeInDuration?: number;
        waitDuration?: number;
    };
    direction?: "left-to-right" | "right-to-left";
    alignment?: "left" | "center" | "right";
    tag?: Tag;
};

type Particle = {
    x: number;
    y: number;
    originalX: number;
    originalY: number;
    color: string;
    opacity: number;
    originalAlpha: number;
    velocityX: number;
    velocityY: number;
    angle: number;
    speed: number;
    shouldFadeQuickly?: boolean;
};

type TextBoundaries = {
    left: number;
    right: number;
    width: number;
};

declare global {
    interface HTMLCanvasElement {
        textBoundaries?: TextBoundaries;
    }
}

export const VaporizeTextCycle = memo(({
    texts = ["Next.js", "React"],
    font = {
        fontFamily: "sans-serif",
        fontSize: "50px",
        fontWeight: 400,
    },
    color = "rgb(15, 23, 42)", // default to slate-900
    spread = 5,
    density = 5,
    animation = {
        vaporizeDuration: 2,
        fadeInDuration: 1,
        waitDuration: 0.5,
    },
    direction = "left-to-right",
    alignment = "center",
    tag = Tag.P,
}: VaporizeTextCycleProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInView = useIsInView(wrapperRef);
    const lastFontRef = useRef<string | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [animationState, setAnimationState] = useState<"static" | "vaporizing" | "fadingIn" | "waiting">("static");
    const vaporizeProgressRef = useRef(0);
    const fadeOpacityRef = useRef(0);
    const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
    const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

    // Handle dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        // Check initial dark mode
        setIsDarkMode(document.documentElement.classList.contains('dark'));

        // Watch for dark mode changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDarkMode(document.documentElement.classList.contains('dark'));
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    // Adjust text color based on dark mode
    const textColor = useMemo(() => {
        return isDarkMode ? 'rgb(255, 255, 255)' : color;
    }, [isDarkMode, color]);

    // Calculate device pixel ratio
    const globalDpr = useMemo(() => {
        if (typeof window !== "undefined") {
            return window.devicePixelRatio * 1.5 || 1;
        }
        return 1;
    }, []);

    // Update wrapperStyle to better handle text scaling
    const wrapperStyle = useMemo(() => ({
        width: "100%",
        height: "100%",
        pointerEvents: "none" as const,
        overflow: "visible" as const,
        display: "flex" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        padding: "0 1rem",
    }), []);

    const canvasStyle = useMemo(() => ({
        minWidth: "30px",
        minHeight: "20px",
        pointerEvents: "none" as const,
        maxWidth: "100%",
        transform: "scale(0.95)", // Slightly scale down to prevent edge cutoff
    }), []);

    // Memoize animation durations
    const animationDurations = useMemo(() => ({
        VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
        FADE_IN_DURATION: (animation.fadeInDuration ?? 1) * 1000,
        WAIT_DURATION: (animation.waitDuration ?? 0.5) * 1000,
    }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

    // Memoize font and spread calculations
    const fontConfig = useMemo(() => {
        const fontSize = parseInt(font.fontSize?.replace("px", "") || "50");
        const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize);
        const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread;
        return {
            fontSize,
            VAPORIZE_SPREAD,
            MULTIPLIED_VAPORIZE_SPREAD,
            font: `${font.fontWeight ?? 400} ${fontSize * globalDpr}px ${font.fontFamily}`,
        };
    }, [font.fontSize, font.fontWeight, font.fontFamily, spread, globalDpr]);

    // Memoize particle update function
    const memoizedUpdateParticles = useCallback((particles: Particle[], vaporizeX: number, deltaTime: number) => {
        return updateParticles(
            particles,
            vaporizeX,
            deltaTime,
            fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
            animationDurations.VAPORIZE_DURATION,
            direction,
            transformedDensity
        );
    }, [fontConfig.MULTIPLIED_VAPORIZE_SPREAD, animationDurations.VAPORIZE_DURATION, direction, transformedDensity]);

    // Memoize render function
    const memoizedRenderParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
        renderParticles(ctx, particles, globalDpr);
    }, [globalDpr]);

    // Start animation cycle when in view
    useEffect(() => {
        if (isInView) {
            const startAnimationTimeout = setTimeout(() => {
                setAnimationState("vaporizing");
            }, 0);
            return () => clearTimeout(startAnimationTimeout);
        } else {
            setAnimationState("static");
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        }
    }, [isInView]);

    // Animation loop
    useEffect(() => {
        if (!isInView) return;

        let lastTime = performance.now();
        let frameId: number;

        const animate = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");

            if (!canvas || !ctx || !particlesRef.current.length) {
                frameId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            switch (animationState) {
                case "static": {
                    memoizedRenderParticles(ctx, particlesRef.current);
                    break;
                }
                case "vaporizing": {
                    vaporizeProgressRef.current += deltaTime * 100 / (animationDurations.VAPORIZE_DURATION / 1000);
                    const textBoundaries = canvas.textBoundaries;
                    if (!textBoundaries) break;

                    const progress = Math.min(100, vaporizeProgressRef.current);
                    const vaporizeX = direction === "left-to-right"
                        ? textBoundaries.left + textBoundaries.width * progress / 100
                        : textBoundaries.right - textBoundaries.width * progress / 100;

                    const allVaporized = memoizedUpdateParticles(particlesRef.current, vaporizeX, deltaTime);
                    memoizedRenderParticles(ctx, particlesRef.current);

                    if (vaporizeProgressRef.current >= 100 && allVaporized) {
                        setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
                        setAnimationState("fadingIn");
                        fadeOpacityRef.current = 0;
                    }
                    break;
                }
                case "fadingIn": {
                    fadeOpacityRef.current += deltaTime * 1000 / animationDurations.FADE_IN_DURATION;

                    ctx.save();
                    ctx.scale(globalDpr, globalDpr);
                    particlesRef.current.forEach(particle => {
                        particle.x = particle.originalX;
                        particle.y = particle.originalY;
                        const opacity = Math.min(fadeOpacityRef.current, 1) * particle.originalAlpha;
                        const color = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
                        ctx.fillStyle = color;
                        ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
                    });
                    ctx.restore();

                    if (fadeOpacityRef.current >= 1) {
                        setAnimationState("waiting");
                        setTimeout(() => {
                            setAnimationState("vaporizing");
                            vaporizeProgressRef.current = 0;
                            resetParticles(particlesRef.current);
                        }, animationDurations.WAIT_DURATION);
                    }
                    break;
                }
                case "waiting": {
                    memoizedRenderParticles(ctx, particlesRef.current);
                    break;
                }
            }

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId);
            }
        };
    }, [
        animationState,
        isInView,
        texts.length,
        direction,
        globalDpr,
        memoizedUpdateParticles,
        memoizedRenderParticles,
        animationDurations.FADE_IN_DURATION,
        animationDurations.WAIT_DURATION,
        animationDurations.VAPORIZE_DURATION
    ]);

    useEffect(() => {
        renderCanvas({
            framerProps: {
                texts,
                font,
                color: textColor,
                alignment,
            },
            canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
            wrapperSize,
            particlesRef,
            globalDpr,
            currentTextIndex,
            transformedDensity,
        });

        const currentFont = font.fontFamily || "sans-serif";
        return handleFontChange({
            currentFont,
            lastFontRef,
            canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
            wrapperSize,
            particlesRef,
            globalDpr,
            currentTextIndex,
            transformedDensity,
            framerProps: {
                texts,
                font,
                color: textColor,
                alignment,
            },
        });
    }, [texts, font, textColor, alignment, wrapperSize, currentTextIndex, globalDpr, transformedDensity]);

    // Handle resize
    useEffect(() => {
        const container = wrapperRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setWrapperSize({ width, height });
            }

            renderCanvas({
                framerProps: {
                    texts,
                    font,
                    color: textColor,
                    alignment,
                },
                canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
                wrapperSize: { width: container.clientWidth, height: container.clientHeight },
                particlesRef,
                globalDpr,
                currentTextIndex,
                transformedDensity,
            });
        });

        resizeObserver.observe(container);
        return () => {
            resizeObserver.disconnect();
        };
    }, [wrapperRef.current]);

    // Initial size detection
    useEffect(() => {
        if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setWrapperSize({
                width: rect.width,
                height: rect.height,
            });
        }
    }, []);

    return (
        <div ref={wrapperRef} style={wrapperStyle}>
            <canvas ref={canvasRef} style={canvasStyle} />
            <SeoElement tag={tag} texts={texts} />
        </div>
    );
});

// Helper Functions
function useIsInView(ref: MutableRefObject<HTMLDivElement | null>) {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0, rootMargin: '50px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [ref]);

    return isInView;
}

function calculateVaporizeSpread(fontSize: number) {
    const points = [
        { size: 20, spread: 0.2 },
        { size: 50, spread: 0.5 },
        { size: 100, spread: 1.5 }
    ];

    if (fontSize <= points[0].size) return points[0].spread;
    if (fontSize >= points[points.length - 1].size) return points[points.length - 1].spread;

    let i = 0;
    while (i < points.length - 1 && points[i + 1].size < fontSize) i++;

    const p1 = points[i];
    const p2 = points[i + 1];

    return p1.spread + (fontSize - p1.size) * (p2.spread - p1.spread) / (p2.size - p1.size);
}

function transformValue(input: number, inputRange: number[], outputRange: number[], clamp = false): number {
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;

    const progress = (input - inputMin) / (inputMax - inputMin);
    let result = outputMin + progress * (outputMax - outputMin);

    if (clamp) {
        if (outputMax > outputMin) {
            result = Math.min(Math.max(result, outputMin), outputMax);
        } else {
            result = Math.min(Math.max(result, outputMax), outputMin);
        }
    }

    return result;
}

function createParticles(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    text: string,
    textX: number,
    textY: number,
    font: string,
    color: string,
    alignment: "left" | "center" | "right"
) {
    const particles: Particle[] = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = alignment;
    ctx.textBaseline = "middle";

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textLeft = alignment === "center" ? textX - textWidth / 2 :
        alignment === "left" ? textX : textX - textWidth;

    const textBoundaries = {
        left: textLeft,
        right: textLeft + textWidth,
        width: textWidth,
    };

    ctx.fillText(text, textX, textY);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const currentDPR = canvas.width / parseInt(canvas.style.width);
    const sampleRate = Math.max(1, Math.round(currentDPR / 3));

    for (let y = 0; y < canvas.height; y += sampleRate) {
        for (let x = 0; x < canvas.width; x += sampleRate) {
            const index = (y * canvas.width + x) * 4;
            const alpha = data[index + 3];

            if (alpha > 0) {
                const originalAlpha = alpha / 255 * (sampleRate / currentDPR);
                particles.push({
                    x,
                    y,
                    originalX: x,
                    originalY: y,
                    color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${originalAlpha})`,
                    opacity: originalAlpha,
                    originalAlpha,
                    velocityX: 0,
                    velocityY: 0,
                    angle: 0,
                    speed: 0,
                });
            }
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return { particles, textBoundaries };
}

function updateParticles(
    particles: Particle[],
    vaporizeX: number,
    deltaTime: number,
    MULTIPLIED_VAPORIZE_SPREAD: number,
    VAPORIZE_DURATION: number,
    direction: string,
    density: number
) {
    let allParticlesVaporized = true;

    particles.forEach(particle => {
        const shouldVaporize = direction === "left-to-right"
            ? particle.originalX <= vaporizeX
            : particle.originalX >= vaporizeX;

        if (shouldVaporize) {
            if (particle.speed === 0) {
                particle.angle = Math.random() * Math.PI * 2;
                particle.speed = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
                particle.velocityX = Math.cos(particle.angle) * particle.speed;
                particle.velocityY = Math.sin(particle.angle) * particle.speed;
                particle.shouldFadeQuickly = Math.random() > density;
            }

            if (particle.shouldFadeQuickly) {
                particle.opacity = Math.max(0, particle.opacity - deltaTime);
            } else {
                const dx = particle.originalX - particle.x;
                const dy = particle.originalY - particle.y;
                const distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
                const dampingFactor = Math.max(0.95, 1 - distanceFromOrigin / (100 * MULTIPLIED_VAPORIZE_SPREAD));
                const randomSpread = MULTIPLIED_VAPORIZE_SPREAD * 3;

                particle.velocityX = (particle.velocityX + (Math.random() - 0.5) * randomSpread + dx * 0.002) * dampingFactor;
                particle.velocityY = (particle.velocityY + (Math.random() - 0.5) * randomSpread + dy * 0.002) * dampingFactor;

                const maxVelocity = MULTIPLIED_VAPORIZE_SPREAD * 2;
                const currentVelocity = Math.sqrt(particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY);

                if (currentVelocity > maxVelocity) {
                    const scale = maxVelocity / currentVelocity;
                    particle.velocityX *= scale;
                    particle.velocityY *= scale;
                }

                particle.x += particle.velocityX * deltaTime * 20;
                particle.y += particle.velocityY * deltaTime * 10;

                const baseFadeRate = 0.25;
                const durationBasedFadeRate = baseFadeRate * (2000 / VAPORIZE_DURATION);
                particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate);
            }

            if (particle.opacity > 0.01) {
                allParticlesVaporized = false;
            }
        } else {
            allParticlesVaporized = false;
        }
    });

    return allParticlesVaporized;
}

function renderParticles(ctx: CanvasRenderingContext2D, particles: Particle[], globalDpr: number) {
    ctx.save();
    ctx.scale(globalDpr, globalDpr);

    particles.forEach(particle => {
        if (particle.opacity > 0) {
            const color = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
            ctx.fillStyle = color;
            ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
        }
    });

    ctx.restore();
}

function resetParticles(particles: Particle[]) {
    particles.forEach(particle => {
        particle.x = particle.originalX;
        particle.y = particle.originalY;
        particle.opacity = particle.originalAlpha;
        particle.speed = 0;
        particle.velocityX = 0;
        particle.velocityY = 0;
    });
}

function renderCanvas({
    framerProps,
    canvasRef,
    wrapperSize,
    particlesRef,
    globalDpr,
    currentTextIndex,
    transformedDensity,
}: {
    framerProps: VaporizeTextCycleProps;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    wrapperSize: { width: number; height: number };
    particlesRef: React.MutableRefObject<Particle[]>;
    globalDpr: number;
    currentTextIndex: number;
    transformedDensity: number;
}) {
    const canvas = canvasRef.current;
    if (!canvas || !wrapperSize.width || !wrapperSize.height) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Add extra padding to prevent text cutoff
    const padding = 40;
    const { width, height } = wrapperSize;
    canvas.style.width = `${width + padding * 2}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor((width + padding * 2) * globalDpr);
    canvas.height = Math.floor(height * globalDpr);

    const fontSize = parseInt(framerProps.font?.fontSize?.replace("px", "") || "50");
    const font = `${framerProps.font?.fontWeight ?? 400} ${fontSize * globalDpr}px ${framerProps.font?.fontFamily ?? "sans-serif"}`;
    const color = framerProps.color ?? "rgb(255, 255, 255)";
    const textX = framerProps.alignment === "center" ? canvas.width / 2 :
        framerProps.alignment === "left" ? padding * globalDpr : canvas.width - padding * globalDpr;
    const textY = canvas.height / 2;
    const currentText = framerProps.texts[currentTextIndex] || "Next.js";

    // Add text measurement to ensure it fits
    ctx.font = font;
    const metrics = ctx.measureText(currentText);
    const textWidth = metrics.width;

    // Scale down if text is too wide
    if (textWidth > canvas.width - padding * 4 * globalDpr) {
        const scale = (canvas.width - padding * 4 * globalDpr) / textWidth;
        const newFont = `${framerProps.font?.fontWeight ?? 400} ${fontSize * globalDpr * scale}px ${framerProps.font?.fontFamily ?? "sans-serif"}`;
        ctx.font = newFont;
    }

    const { particles, textBoundaries } = createParticles(
        ctx,
        canvas,
        currentText,
        textX,
        textY,
        ctx.font,
        color,
        framerProps.alignment || "left"
    );

    particlesRef.current = particles;
    canvas.textBoundaries = textBoundaries;
}

function handleFontChange({
    currentFont,
    lastFontRef,
    canvasRef,
    wrapperSize,
    particlesRef,
    globalDpr,
    currentTextIndex,
    transformedDensity,
    framerProps,
}: {
    currentFont: string;
    lastFontRef: React.MutableRefObject<string | null>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    wrapperSize: { width: number; height: number };
    particlesRef: React.MutableRefObject<Particle[]>;
    globalDpr: number;
    currentTextIndex: number;
    transformedDensity: number;
    framerProps: VaporizeTextCycleProps;
}) {
    if (currentFont !== lastFontRef.current) {
        lastFontRef.current = currentFont;

        const timeoutId = setTimeout(() => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (canvas && ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            particlesRef.current = [];

            renderCanvas({
                framerProps,
                canvasRef,
                wrapperSize,
                particlesRef,
                globalDpr,
                currentTextIndex,
                transformedDensity,
            });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }

    return undefined;
} 