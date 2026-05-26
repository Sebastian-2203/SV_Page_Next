"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftPanelRef = useRef<HTMLDivElement>(null);
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    
    const [active, setActive] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "";
                setActive(false);
            }
        });

        // 1. Initial State
        gsap.set(logoRef.current, { scale: 0.75, opacity: 0 });
        gsap.set(textRef.current, { y: 20, opacity: 0 });
        gsap.set(leftPanelRef.current, { xPercent: 0 });
        gsap.set(rightPanelRef.current, { xPercent: 0 });
        gsap.set(dividerRef.current, { scaleY: 0, opacity: 0 });

        // 2. Entrance Animation
        tl.to(dividerRef.current, {
            scaleY: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
        })
        .to(logoRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.2")
        .to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.4")
        
        // 3. Subtle pulsing/glow
        .to(logoRef.current, {
            scale: 1.04,
            boxShadow: "0 0 50px var(--color-border-brand)",
            duration: 0.7,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        }, "+=0.1")

        // 4. Logo Fading Out & Panels Sliding Open
        .to([logoRef.current, textRef.current], {
            scale: 0.9,
            opacity: 0,
            duration: 0.45,
            ease: "power2.in"
        }, "+=0.1")
        .to(dividerRef.current, {
            opacity: 0,
            scaleY: 0,
            duration: 0.6,
            ease: "power3.inOut"
        }, "-=0.2")
        .to(leftPanelRef.current, {
            xPercent: -100,
            duration: 0.85,
            ease: "power3.inOut"
        }, "-=0.3")
        .to(rightPanelRef.current, {
            xPercent: 100,
            duration: 0.85,
            ease: "power3.inOut"
        }, "<");

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    if (!active) return null;

    return (
        <div ref={containerRef} style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            pointerEvents: "none",
            display: "flex",
        }}>
            {/* Left Sliding Panel */}
            <div ref={leftPanelRef} style={{
                width: "50vw",
                height: "100vh",
                background: "var(--color-bg-primary)",
                borderRight: "0.5px solid var(--color-border)",
                pointerEvents: "auto",
            }} />

            {/* Right Sliding Panel */}
            <div ref={rightPanelRef} style={{
                width: "50vw",
                height: "100vh",
                background: "var(--color-bg-primary)",
                borderLeft: "0.5px solid var(--color-border)",
                pointerEvents: "auto",
            }} />

            {/* Vertically glowing center dividing line */}
            <div ref={dividerRef} style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: "2px",
                transform: "translateX(-50%)",
                background: "linear-gradient(to bottom, transparent, var(--color-brand), transparent)",
                boxShadow: "0 0 12px var(--color-brand), 0 0 24px var(--color-brand)",
                zIndex: 100000,
                pointerEvents: "none",
            }} />

            {/* Center Content: Logo & Text */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100001,
                pointerEvents: "none",
            }}>
                {/* Large Premium Logo */}
                <div ref={logoRef} style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "24px",
                    border: "3.5px solid var(--color-brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--color-bg-primary)",
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "2.4rem",
                    fontWeight: 800,
                    color: "var(--color-brand)",
                    userSelect: "none",
                    boxShadow: "0 0 35px var(--color-brand-subtle)",
                }}>
                    {"{SV}"}
                </div>

                {/* Studio Text */}
                <div ref={textRef} style={{
                    marginTop: "1.75rem",
                    fontFamily: "var(--font-sans), sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                    whiteSpace: "nowrap",
                }}>
                    SyV Solutions
                </div>
            </div>
        </div>
    );
}
