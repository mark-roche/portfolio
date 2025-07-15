"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 10,
    speed = "fast",
    waveOpacity = 0.5,
    ...props
}: {
    children?: any;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
    [key: string]: any;
}) => {
    const noise = createNoise3D();
    let w: number,
        h: number,
        nt: number,
        i: number,
        x: number,
        ctx: any,
        canvas: any;
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const getSpeed = () => {
        switch (speed) {
            case "slow":
                return 0.002; // Doubled from 0.001
            case "fast":
                return 0.004; // Doubled from 0.002
            default:
                return 0.002; // Doubled from 0.001
        }
    };

    const init = () => {
        canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateSize = () => {
            const rect = container.getBoundingClientRect();
            w = ctx.canvas.width = rect.width;
            h = ctx.canvas.height = rect.height;
            ctx.filter = `blur(${blur}px)`;
        };

        updateSize();
        nt = 0;

        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(container);

        // Add mouse move listener
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', () => setIsHovered(true));
        container.addEventListener('mouseleave', () => setIsHovered(false));

        render();

        return () => {
            resizeObserver.disconnect();
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', () => setIsHovered(true));
            container.removeEventListener('mouseleave', () => setIsHovered(false));
        };
    };

    const waveColors = colors ?? [
        "#38bdf8",
        "#818cf8",
        "#c084fc",
        "#e879f9",
        "#22d3ee",
    ];

    const drawWave = (n: number) => {
        if (!ctx || !canvas) return;
        nt += getSpeed();

        // Increased amplitudes
        const baseAmplitude = h * 0.35; // Increased from 0.2 to 0.35
        const mouseAmplitude = isHovered ? h * 0.2 : 0; // Increased from 0.1 to 0.2
        const mouseInfluence = isHovered ? 0.7 : 0; // Increased from 0.5 to 0.7

        for (i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth || 50;
            ctx.strokeStyle = waveColors[i % waveColors.length];

            const points: [number, number][] = [];
            for (x = 0; x < w; x += 5) {
                // Base wave with increased frequency
                const baseWave = noise(x / 600, 0.4 * i, nt) * baseAmplitude; // Adjusted frequency and multiplier

                // Mouse influence wave with increased frequency
                const distanceFromMouse = Math.abs(x / w - mousePosition.x);
                const mouseWave = isHovered
                    ? Math.sin(x / 20 + nt * 10) * mouseAmplitude * (1 - distanceFromMouse) // Increased frequency
                    : 0;

                // Combine waves with increased phase modulation
                const phaseModulation = Math.sin(nt * 4 + i) * 30; // Increased frequency and amplitude
                const y = baseWave + mouseWave + phaseModulation;

                points.push([x, y + h * 0.5]);
            }

            // Draw smooth curve through points
            ctx.moveTo(points[0][0], points[0][1]);
            for (let j = 0; j < points.length - 1; j++) {
                const xc = (points[j][0] + points[j + 1][0]) / 2;
                const yc = (points[j][1] + points[j + 1][1]) / 2;
                ctx.quadraticCurveTo(points[j][0], points[j][1], xc, yc);
            }

            ctx.stroke();
            ctx.closePath();
        }
    };

    let animationId: number;
    const render = () => {
        if (!ctx || !canvas) return;
        ctx.fillStyle = backgroundFill || "black";
        ctx.globalAlpha = waveOpacity || 0.5;
        ctx.fillRect(0, 0, w, h);
        drawWave(5);
        animationId = requestAnimationFrame(render);
    };

    useEffect(() => {
        const cleanup = init();
        return () => {
            cleanup?.();
            cancelAnimationFrame(animationId);
        };
    }, []);

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(
            typeof window !== "undefined" &&
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome")
        );
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full h-full flex flex-col items-center justify-center overflow-hidden transition-all duration-300",
                containerClassName
            )}
        >
            <canvas
                className="absolute inset-0 z-0 transition-opacity duration-300"
                ref={canvasRef}
                style={{
                    ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
                }}
            />
            <div className={cn("relative z-10 w-full h-full", className)} {...props}>
                {children}
            </div>
        </div>
    );
}; 