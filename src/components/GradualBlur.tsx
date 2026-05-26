"use client";

interface GradualBlurProps {
    position?: "top" | "bottom" | "left" | "right";
    height?: string;
    width?: string;
    /** Color to fade to — should match your section background */
    color?: string;
    zIndex?: number;
}

export default function GradualBlur({
    position = "bottom",
    height = "7rem",
    width = "100%",
    color = "#0a0a0a",
    zIndex = 10,
}: GradualBlurProps) {
    const isVertical = position === "top" || position === "bottom";

    // Direction: fade FROM transparent TO the bg color
    const gradientDir =
        position === "bottom"
            ? "to bottom"
            : position === "top"
                ? "to top"
                : position === "left"
                    ? "to left"
                    : "to right";

    return (
        <div
            style={{
                position: "absolute",
                [position]: 0,
                left: isVertical ? 0 : undefined,
                top: !isVertical ? 0 : undefined,
                width: isVertical ? width : height,
                height: isVertical ? height : width,
                background: `linear-gradient(${gradientDir}, transparent 0%, ${color} 100%)`,
                zIndex,
                pointerEvents: "none",
            }}
        />
    );
}
