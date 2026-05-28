"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Particles from "./Particles";
import CardSwap from "./CardSwap";
import ScrollReveal from "./ScrollReveal";

interface Props {
    onBookCall: () => void;
}

export default function HeroSection({ onBookCall }: Props) {
    const { t, language } = useLanguage();
    const contentRef = useRef<HTMLDivElement>(null);
    const [isLightTheme, setIsLightTheme] = useState(false);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        setTimeout(() => el.querySelectorAll(".reveal").forEach(c => c.classList.add("visible")), 100);
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsLightTheme(document.documentElement.classList.contains("light-theme"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        setIsLightTheme(document.documentElement.classList.contains("light-theme"));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="inicio" style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "7rem 2rem 5rem",
            overflowX: "hidden",
            background: "var(--color-bg-primary)",
        }}>
            {/* Particle background */}
            <Particles
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                pixelRatio={1}
                particleColors={isLightTheme ? ["#4a90d9", "#1a2035", "#3a7fc9"] : ["#ffffff", "#4a90d9", "rgba(255,255,255,0.7)"]}
            />



            {/* Content */}
            <div ref={contentRef} style={{
                maxWidth: 1040, margin: "-9rem auto 0", width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                alignItems: "center",
                position: "relative", zIndex: 1,
            }} className="hero-grid">

                {/* Left: copy */}
                <div>
                    <p className="reveal" style={{
                        fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px",
                        textTransform: "uppercase", color: "var(--color-brand)",
                        marginBottom: "1.75rem",
                        display: "flex", alignItems: "center", gap: "0.5rem",
                    }}>
                        <span style={{ width: 24, height: 1, background: "var(--color-border-brand)", display: "inline-block" }} />
                        SyV Solutions · Design + Dev Studio
                    </p>

                    <ScrollReveal as="div" baseOpacity={0} blurStrength={3} baseRotation={1}>
                        <h1 className="reveal reveal-delay" style={{
                            fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.1,
                            marginBottom: "1.75rem",
                        }}>
                            {language === "en" ? (
                                <>Web Design & AI<br />Development Agency<br /><span style={{ color: "var(--color-text-secondary)" }}>in Bogotá.</span></>
                            ) : (
                                <>Agencia de Diseño Web<br />y Desarrollo con IA<br /><span style={{ color: "var(--color-text-secondary)" }}>en Bogotá.</span></>
                            )}
                        </h1>
                    </ScrollReveal>

                    <p className="reveal reveal-delay-2" style={{
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        color: "var(--color-text-secondary)",
                        maxWidth: 440,
                        marginBottom: "0px",
                        minHeight: "90px",
                    }}>
                        {t(
                            "Creamos sitios web modernos, identidades de marca memorables y soluciones con IA para empresas y emprendedores en Bogotá. Combinamos diseño estratégico con desarrollo de alto desempeño usando Next.js, React y APIs inteligentes.",
                            "We build modern websites, memorable brand identities, and AI solutions for businesses and entrepreneurs in Bogotá. We combine strategic design with high-performance development using Next.js, React, and smart APIs."
                        )}
                    </p>
                </div>

                {/* Right: CardSwap */}
                <div className="hero-card-container">
                    <CardSwap en={language === "en"} />
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "10rem",
                background: "linear-gradient(to bottom, transparent, var(--color-bg-primary))",
                zIndex: 2, pointerEvents: "none",
            }} aria-hidden />

            <style>{`
        .hero-card-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 400px;
            position: relative;
            z-index: 2;
            transform: translateY(-30px);
        }
        @media (max-width: 1024px) {
            .hero-card-container {
                transform: translateY(-15px);
                height: 330px;
            }
        }
        @media (max-width: 960px) {
            #inicio {
                padding-bottom: 8.5rem !important;
            }
            .hero-grid { 
                grid-template-columns: 1fr !important; 
                gap: 2.5rem !important; 
                margin: -4rem auto 0 !important;
            }
            .hero-card-container {
                transform: translateY(0);
                height: 320px;
                margin-top: 1rem;
            }
        }
      `}</style>
        </section>
    );
}
