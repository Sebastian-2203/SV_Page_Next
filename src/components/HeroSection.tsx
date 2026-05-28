"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Particles from "./Particles";
import CardSwap from "./CardSwap";
import ScrollReveal from "./ScrollReveal";
import styles from "./HeroSection.module.css";

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
        <section id="inicio" className={styles.section}>
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
            <div ref={contentRef} className={styles.grid}>

                {/* Left: copy */}
                <div>
                    <p className={`reveal ${styles.tagline}`}>
                        <span className={styles.taglineLine} />
                        SyV Solutions · Design + Dev Studio
                    </p>

                    <ScrollReveal as="div" baseOpacity={0} blurStrength={3} baseRotation={1}>
                        <h1 className={`reveal reveal-delay ${styles.heading}`}>
                            {language === "en" ? (
                                <>Web Design & AI<br />Development Agency<br /><span className={styles.headingHighlight}>in Bogotá.</span></>
                            ) : (
                                <>Agencia de Diseño Web<br />y Desarrollo con IA<br /><span className={styles.headingHighlight}>en Bogotá.</span></>
                            )}
                        </h1>
                    </ScrollReveal>

                    <p className={`reveal reveal-delay-2 ${styles.description}`}>
                        {t(
                            "Creamos sitios web modernos, identidades de marca memorables y soluciones con IA para empresas y emprendedores en Bogotá. Combinamos diseño estratégico con desarrollo de alto desempeño usando Next.js, React y APIs inteligentes.",
                            "We build modern websites, memorable brand identities, and AI solutions for businesses and entrepreneurs in Bogotá. We combine strategic design with high-performance development using Next.js, React, and smart APIs."
                        )}
                    </p>
                </div>

                {/* Right: CardSwap */}
                <div className={styles.cardContainer}>
                    <CardSwap en={language === "en"} />
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className={styles.bottomGradient} aria-hidden />
        </section>
    );
}
