"use client";

import React, { useEffect, useRef } from "react";

export default function MatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        };
        const handleMouseLeave = () => {
            mousePosRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let columns = 0;
        let drops: number[] = [];
        const fontSize = 16;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            while (drops.length < columns) {
                drops.push(Math.random() * (canvas.height / fontSize));
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

        let lastTime = 0;
        const fps = 30;

        const animate = (time: number) => {
            animationFrameId = requestAnimationFrame(animate);
            if (time - lastTime < 1000 / fps) return;
            lastTime = time;

            // Fading trail effect
            ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px var(--font-montserrat), monospace`;

            // 1. Draw falling Matrix rain
            ctx.fillStyle = "rgba(37, 99, 235, 0.7)"; // Blue primary
            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));

                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            // 2. Draw glowing characters around the mouse
            const mouseX = mousePosRef.current.x;
            const mouseY = mousePosRef.current.y;

            if (mouseX >= 0 && mouseY >= 0) {
                const hoverRadius = 300; // Incrementado ligeramente para mejor efecto
                const mouseCol = Math.floor(mouseX / fontSize);
                const mouseRow = Math.floor(mouseY / fontSize);
                const radiusInCols = Math.ceil(hoverRadius / fontSize);

                for (let i = -radiusInCols; i <= radiusInCols; i++) {
                    for (let j = -radiusInCols; j <= radiusInCols; j++) {
                        const col = mouseCol + i;
                        const row = mouseRow + j;
                        // Prevent drawing out of bounds
                        if (col < 0 || col >= columns || row < 0 || row > canvas.height / fontSize + 1) continue;

                        const x = col * fontSize;
                        const y = row * fontSize;
                        const dx = x - mouseX;
                        const dy = y - mouseY;
                        const distance = Math.sqrt(dx * dx + dy * dy); // Volvemos al Círculo

                        if (distance < hoverRadius) {
                            // Suavizar la transición con intensidad normal
                            const intensity = 1 - (distance / hoverRadius);

                            // Deterministic character for the grid cell so it doesn't flicker wildly
                            const charIndex = Math.abs(col * 31 + row * 17) % matrixChars.length;
                            const text = matrixChars.charAt(charIndex);

                            // Cyan Neón
                            ctx.fillStyle = `rgba(6, 182, 212, ${intensity})`;
                            ctx.shadowBlur = 20 * intensity;
                            ctx.shadowColor = `rgba(6, 182, 212, ${intensity})`;

                            ctx.fillText(text, x, y);
                        }
                    }
                }
                // Reset shadow
                ctx.shadowBlur = 0;
            }
        };

        animate(0);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
            style={{
                opacity: 0.95,
                position: 'fixed' as const,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none' as const
            }}
        />
    );
}
