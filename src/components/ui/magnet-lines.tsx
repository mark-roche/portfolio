import { useRef, useEffect } from "react";

interface MagnetLinesProps {
    rows?: number;
    columns?: number;
    containerSize?: string;
    lineColor?: string;
    lineWidth?: string;
    lineHeight?: string;
    baseAngle?: number;
    className?: string;
    style?: React.CSSProperties;
}

interface PointerEvent {
    x: number;
    y: number;
}

function MagnetLines({
    rows = 9,
    columns = 9,
    containerSize = "100%",
    lineColor = "tomato",
    lineWidth = "0.4vmin",
    lineHeight = "2vmin",
    baseAngle = -10,
    className = "",
    style = {}
}: MagnetLinesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll<HTMLSpanElement>("span");

        const onPointerMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            items.forEach((item) => {
                const itemRect = item.getBoundingClientRect();
                const itemX = itemRect.left - rect.left + itemRect.width / 2;
                const itemY = itemRect.top - rect.top + itemRect.height / 2;

                const deltaX = mouseX - itemX;
                const deltaY = mouseY - itemY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 0.5;
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                // Add distance-based rotation intensity
                const intensity = Math.max(0, 1 - distance / maxDistance);
                const rotation = angle * intensity + baseAngle * (1 - intensity);

                item.style.transform = `rotate(${rotation}deg)`;
            });
        };

        // Initial position
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        const fakeEvent = new MouseEvent('mousemove', {
            clientX: centerX,
            clientY: centerY
        });
        onPointerMove(fakeEvent);

        window.addEventListener("mousemove", onPointerMove);
        return () => window.removeEventListener("mousemove", onPointerMove);
    }, [baseAngle]);

    const total = rows * columns;
    const spans = Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / columns);
        const col = i % columns;
        return (
            <div
                key={i}
                className="flex items-center justify-center w-full h-full"
                style={{
                    gridRow: row + 1,
                    gridColumn: col + 1,
                }}
            >
                <span
                    className="block origin-center transition-transform duration-150"
                    style={{
                        backgroundColor: lineColor,
                        width: lineWidth,
                        height: lineHeight,
                        transform: `rotate(${baseAngle}deg)`,
                        willChange: "transform",
                        opacity: 0.9
                    } as React.CSSProperties}
                />
            </div>
        );
    });

    return (
        <div
            ref={containerRef}
            className={`grid ${className}`}
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: containerSize,
                height: containerSize,
                ...style
            }}
        >
            {spans}
        </div>
    );
}

export { MagnetLines }; 