"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    // Added more beams with varied colors and closer horizontal spacing
    const beams = [
        {
            initialX: 10,
            translateX: 10,
            duration: 4,
            repeatDelay: 1,
            delay: 0,
            className: "h-24 opacity-70 bg-gradient-to-t from-blue-500 via-blue-400 to-transparent",
        },
        {
            initialX: 50,
            translateX: 50,
            duration: 3,
            repeatDelay: 1,
            delay: 0.5,
            className: "h-32 opacity-80 bg-gradient-to-t from-purple-500 via-purple-400 to-transparent",
        },
        {
            initialX: 100,
            translateX: 100,
            duration: 5,
            repeatDelay: 1,
            className: "h-16 opacity-90 bg-gradient-to-t from-indigo-500 via-indigo-400 to-transparent",
        },
        {
            initialX: 150,
            translateX: 150,
            duration: 3,
            repeatDelay: 1,
            delay: 0.8,
            className: "h-28 opacity-75 bg-gradient-to-t from-violet-500 via-violet-400 to-transparent",
        },
        {
            initialX: 200,
            translateX: 200,
            duration: 4,
            repeatDelay: 1,
            className: "h-40 opacity-85 bg-gradient-to-t from-fuchsia-500 via-fuchsia-400 to-transparent",
        },
        {
            initialX: 250,
            translateX: 250,
            duration: 5,
            repeatDelay: 1,
            delay: 0.3,
            className: "h-20 opacity-70 bg-gradient-to-t from-blue-500 via-blue-400 to-transparent",
        },
        {
            initialX: 300,
            translateX: 300,
            duration: 3,
            repeatDelay: 1,
            className: "h-36 opacity-80 bg-gradient-to-t from-purple-500 via-purple-400 to-transparent",
        },
        {
            initialX: 350,
            translateX: 350,
            duration: 4,
            repeatDelay: 1,
            delay: 0.6,
            className: "h-24 opacity-90 bg-gradient-to-t from-indigo-500 via-indigo-400 to-transparent",
        },
        {
            initialX: 400,
            translateX: 400,
            duration: 3,
            repeatDelay: 1,
            className: "h-32 opacity-75 bg-gradient-to-t from-violet-500 via-violet-400 to-transparent",
        },
        {
            initialX: 450,
            translateX: 450,
            duration: 4,
            repeatDelay: 1,
            delay: 0.2,
            className: "h-28 opacity-85 bg-gradient-to-t from-fuchsia-500 via-fuchsia-400 to-transparent",
        },
        // Added more beams with closer spacing
        {
            initialX: 500,
            translateX: 500,
            duration: 5,
            repeatDelay: 1,
            className: "h-24 opacity-80 bg-gradient-to-t from-blue-500 via-blue-400 to-transparent",
        },
        {
            initialX: 550,
            translateX: 550,
            duration: 3,
            repeatDelay: 1,
            delay: 0.4,
            className: "h-32 opacity-90 bg-gradient-to-t from-purple-500 via-purple-400 to-transparent",
        },
        {
            initialX: 600,
            translateX: 600,
            duration: 4,
            repeatDelay: 1,
            className: "h-20 opacity-75 bg-gradient-to-t from-indigo-500 via-indigo-400 to-transparent",
        },
        {
            initialX: 650,
            translateX: 650,
            duration: 5,
            repeatDelay: 1,
            delay: 0.7,
            className: "h-36 opacity-85 bg-gradient-to-t from-violet-500 via-violet-400 to-transparent",
        },
        {
            initialX: 700,
            translateX: 700,
            duration: 3,
            repeatDelay: 1,
            className: "h-28 opacity-70 bg-gradient-to-t from-fuchsia-500 via-fuchsia-400 to-transparent",
        },
        // Repeat pattern for wider coverage
        {
            initialX: 750,
            translateX: 750,
            duration: 4,
            repeatDelay: 1,
            delay: 0.5,
            className: "h-32 opacity-80 bg-gradient-to-t from-blue-500 via-blue-400 to-transparent",
        },
        {
            initialX: 800,
            translateX: 800,
            duration: 5,
            repeatDelay: 1,
            className: "h-24 opacity-90 bg-gradient-to-t from-purple-500 via-purple-400 to-transparent",
        },
        {
            initialX: 850,
            translateX: 850,
            duration: 3,
            repeatDelay: 1,
            delay: 0.3,
            className: "h-40 opacity-75 bg-gradient-to-t from-indigo-500 via-indigo-400 to-transparent",
        },
        {
            initialX: 900,
            translateX: 900,
            duration: 4,
            repeatDelay: 1,
            className: "h-28 opacity-85 bg-gradient-to-t from-violet-500 via-violet-400 to-transparent",
        },
        {
            initialX: 950,
            translateX: 950,
            duration: 5,
            repeatDelay: 1,
            delay: 0.6,
            className: "h-32 opacity-70 bg-gradient-to-t from-fuchsia-500 via-fuchsia-400 to-transparent",
        }
    ];

    return (
        <div
            ref={parentRef}
            className={cn(
                "h-96 md:h-[40rem] bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
                className
            )}
        >
            {beams.map((beam) => (
                <CollisionMechanism
                    key={beam.initialX + "beam-idx"}
                    beamOptions={beam}
                    containerRef={containerRef}
                    parentRef={parentRef}
                />
            ))}

            {children}
            <div
                ref={containerRef}
                className="absolute bottom-0 bg-neutral-100 dark:bg-neutral-900 w-full inset-x-0 pointer-events-none"
                style={{
                    boxShadow:
                        "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                }}
            ></div>
        </div>
    );
};

const CollisionMechanism = React.forwardRef<
    HTMLDivElement,
    {
        containerRef: React.RefObject<HTMLDivElement>;
        parentRef: React.RefObject<HTMLDivElement>;
        beamOptions?: {
            initialX?: number;
            translateX?: number;
            initialY?: number;
            translateY?: number;
            rotate?: number;
            className?: string;
            duration?: number;
            delay?: number;
            repeatDelay?: number;
        };
    }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
    const beamRef = useRef<HTMLDivElement>(null);
    const [collision, setCollision] = useState<{
        detected: boolean;
        coordinates: { x: number; y: number } | null;
    }>({
        detected: false,
        coordinates: null,
    });
    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
        const checkCollision = () => {
            if (
                beamRef.current &&
                containerRef.current &&
                parentRef.current &&
                !cycleCollisionDetected
            ) {
                const beamRect = beamRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                const parentRect = parentRef.current.getBoundingClientRect();

                if (beamRect.bottom >= containerRect.top) {
                    const relativeX =
                        beamRect.left - parentRect.left + beamRect.width / 2;
                    const relativeY = beamRect.bottom - parentRect.top;

                    setCollision({
                        detected: true,
                        coordinates: {
                            x: relativeX,
                            y: relativeY,
                        },
                    });
                    setCycleCollisionDetected(true);
                }
            }
        };

        const animationInterval = setInterval(checkCollision, 30); // Increased check frequency

        return () => clearInterval(animationInterval);
    }, [cycleCollisionDetected, containerRef]);

    useEffect(() => {
        if (collision.detected && collision.coordinates) {
            setTimeout(() => {
                setCollision({ detected: false, coordinates: null });
                setCycleCollisionDetected(false);
            }, 1000); // Reduced reset time for more frequent collisions

            setTimeout(() => {
                setBeamKey((prevKey) => prevKey + 1);
            }, 1000);
        }
    }, [collision]);

    return (
        <>
            <motion.div
                key={beamKey}
                ref={beamRef}
                animate="animate"
                initial={{
                    translateY: beamOptions.initialY || "-200px",
                    translateX: beamOptions.initialX || "0px",
                    rotate: beamOptions.rotate || 0,
                }}
                variants={{
                    animate: {
                        translateY: beamOptions.translateY || "1800px",
                        translateX: beamOptions.translateX || "0px",
                        rotate: beamOptions.rotate || 0,
                    },
                }}
                transition={{
                    duration: beamOptions.duration || 8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: beamOptions.delay || 0,
                    repeatDelay: beamOptions.repeatDelay || 0,
                }}
                className={cn(
                    "absolute left-0 top-20 m-auto w-[2px] rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent", // Increased beam width
                    beamOptions.className
                )}
            />
            <AnimatePresence>
                {collision.detected && collision.coordinates && (
                    <Explosion
                        key={`${collision.coordinates.x}-${collision.coordinates.y}`}
                        className=""
                        style={{
                            left: `${collision.coordinates.x}px`,
                            top: `${collision.coordinates.y}px`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
    const spans = Array.from({ length: 30 }, (_, index) => ({
        id: index,
        initialX: 0,
        initialY: 0,
        directionX: Math.floor(Math.random() * 120 - 60),
        directionY: Math.floor(Math.random() * -80 - 20),
    }));

    // Added color variations for explosions
    const colors = [
        "from-blue-500 to-blue-600",
        "from-purple-500 to-purple-600",
        "from-indigo-500 to-indigo-600",
        "from-violet-500 to-violet-600",
        "from-fuchsia-500 to-fuchsia-600"
    ];

    return (
        <div {...props} className={cn("absolute z-50 h-3 w-3", props.className)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute -inset-x-12 top-0 m-auto h-3 w-12 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
            ></motion.div>
            {spans.map((span, index) => (
                <motion.span
                    key={span.id}
                    initial={{ x: span.initialX, y: span.initialY, opacity: 1, scale: 1 }}
                    animate={{
                        x: span.directionX,
                        y: span.directionY,
                        opacity: 0,
                        scale: 0.2,
                    }}
                    transition={{ duration: Math.random() * 1 + 0.5, ease: "easeOut" }}
                    className={`absolute h-1.5 w-1.5 rounded-full bg-gradient-to-b ${colors[index % colors.length]}`}
                />
            ))}
        </div>
    );
}; 