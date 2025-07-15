"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
    type Transition,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
    defaultValue?: boolean
    initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
    query: string,
    {
        defaultValue = false,
        initializeWithValue = true,
    }: UseMediaQueryOptions = {}
): boolean {
    const getMatches = (query: string): boolean => {
        if (IS_SERVER) {
            return defaultValue
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query)
        }
        return defaultValue
    })

    const handleChange = () => {
        setMatches(getMatches(query))
    }

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query)
        handleChange()

        matchMedia.addEventListener("change", handleChange)

        return () => {
            matchMedia.removeEventListener("change", handleChange)
        }
    }, [query])

    return matches
}

const toolImages = [
    { src: "/svg/openai.svg", name: "OpenAI" },
    { src: "/svg/anthropic.svg", name: "Anthropic" },
    { src: "/svg/claude-color.svg", name: "Claude" },
    { src: "/svg/gemini-color.svg", name: "Gemini" },
    { src: "/svg/perplexity-color.svg", name: "Perplexity" },
    { src: "/svg/groq.svg", name: "Groq" },
    { src: "/svg/midjourney.svg", name: "Midjourney" },
    { src: "/svg/github-icon-1.svg", name: "GitHub" },
    { src: "/svg/npm-square.svg", name: "NPM" },
    { src: "/svg/Figma_Symbol_0.svg", name: "Figma" },
]

const duration = 0.15
const transition: Transition = {
    duration,
    ease: [0.32, 0.72, 0, 1] as [number, number, number, number]
}
const transitionOverlay: Transition = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1] as [number, number, number, number]
}

const Carousel = memo(
    ({
        handleClick,
        controls,
        cards,
        isCarouselActive,
    }: {
        handleClick: (imgUrl: string, index: number) => void
        controls: any
        cards: Array<{ src: string; name: string }>
        isCarouselActive: boolean
    }) => {
        const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
        const cylinderWidth = isScreenSizeSm ? 1100 : 1800
        const faceCount = cards.length
        const faceWidth = cylinderWidth / faceCount
        const radius = cylinderWidth / (2 * Math.PI)
        const rotation = useMotionValue(0)
        const transform = useTransform(
            rotation,
            (value) => `rotate3d(0, 1, 0, ${value}deg)`
        )

        return (
            <div
                className="flex h-full items-center justify-center"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <motion.div
                    drag={isCarouselActive ? "x" : false}
                    className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
                    style={{
                        transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    onDrag={(_, info) =>
                        isCarouselActive &&
                        rotation.set(rotation.get() + info.offset.x * 0.05)
                    }
                    onDragEnd={(_, info) =>
                        isCarouselActive &&
                        controls.start({
                            rotateY: rotation.get() + info.velocity.x * 0.05,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 30,
                                mass: 0.1,
                            },
                        })
                    }
                    animate={controls}
                >
                    {cards.map((card, i) => (
                        <motion.div
                            key={`key-${card.src}-${i}`}
                            className="absolute flex h-full origin-center items-center justify-center"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)
                                    }deg) translateZ(${radius}px)`,
                                backfaceVisibility: "hidden",
                            }}
                            onClick={() => handleClick(card.src, i)}
                        >
                            <motion.div
                                layoutId={`img-${card.src}`}
                                className="pointer-events-none w-[280px] h-[400px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl p-12 flex flex-col items-center justify-center gap-6 shadow-2xl border border-white/10"
                                initial={{ filter: "blur(4px)" }}
                                layout="position"
                                animate={{ filter: "blur(0px)" }}
                                transition={transition}
                                style={{
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <div className="relative w-full aspect-square flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl" />
                                    <img
                                        src={card.src}
                                        alt={card.name}
                                        className="w-full h-full object-contain p-6 relative z-10"
                                        style={{
                                            backfaceVisibility: "hidden",
                                        }}
                                    />
                                </div>
                                <span className="text-lg font-medium text-white/70">{card.name}</span>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        )
    }
)

Carousel.displayName = "Carousel"

function ThreeDPhotoCarousel() {
    const [activeImg, setActiveImg] = useState<string | null>(null)
    const [isCarouselActive, setIsCarouselActive] = useState(true)
    const controls = useAnimation()
    const cards = useMemo(() => toolImages, [])

    const handleClick = (imgUrl: string) => {
        setActiveImg(imgUrl)
        setIsCarouselActive(false)
        controls.stop()
    }

    const handleClose = () => {
        setActiveImg(null)
        setIsCarouselActive(true)
    }

    return (
        <motion.div layout className="relative">
            <AnimatePresence mode="sync">
                {activeImg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        layoutId={`img-container-${activeImg}`}
                        layout="position"
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-50"
                        style={{ willChange: "opacity" }}
                        transition={transitionOverlay}
                    >
                        <motion.div
                            layoutId={`img-${activeImg}`}
                            className="relative bg-gradient-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl p-16 rounded-3xl shadow-2xl border border-white/10 max-w-2xl w-full mx-4"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.5,
                                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                            }}
                            style={{
                                willChange: "transform",
                            }}
                        >
                            <img
                                src={activeImg}
                                alt="Selected tool"
                                className="w-full h-full object-contain max-h-[400px]"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="relative h-[600px] w-full overflow-hidden">
                <Carousel
                    handleClick={handleClick}
                    controls={controls}
                    cards={cards}
                    isCarouselActive={isCarouselActive}
                />
            </div>
        </motion.div>
    )
}

export { ThreeDPhotoCarousel }; 