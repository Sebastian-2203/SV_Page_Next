"use client";

import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const projects = [
    {
        label: "E-commerce",
        labelEn: "E-commerce",
        title: "Tienda online de moda",
        titleEn: "Fashion online store",
        type: "Shopify · Next.js",
        emoji: "🛍️",
        bg: "linear-gradient(135deg,#1a0533,#2d1b69)",
    },
    {
        label: "Aplicación Web",
        labelEn: "Web App",
        title: "Plataforma SaaS de gestión",
        titleEn: "SaaS management platform",
        type: "React · Node.js",
        emoji: "⚙️",
        bg: "linear-gradient(135deg,#001529,#003566)",
    },
    {
        label: "Landing Page",
        labelEn: "Landing Page",
        title: "Landing de producto tech",
        titleEn: "Tech product landing",
        type: "Next.js · Framer",
        emoji: "🚀",
        bg: "linear-gradient(135deg,#0d2137,#0a3d2e)",
    },
    {
        label: "Portafolio",
        labelEn: "Portfolio",
        title: "Portafolio creativo premium",
        titleEn: "Premium creative portfolio",
        type: "Next.js · GSAP",
        emoji: "✦",
        bg: "linear-gradient(135deg,#1a1a2e,#16213e)",
    },
];

export default function Portfolio() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    return (
        <section id="portafolio" className="portfolio">
            <div className="container">
                <div className="section-header reveal" ref={(el) => setRef(el, 20)}>
                    <p className="section-eyebrow">{t("Nuestro trabajo", "Our work")}</p>
                    <h2 className="section-title">
                        {t("Proyectos que hablan.", "Projects that speak.")}</h2>
                </div>
                <div className="portfolio-grid">
                    {projects.map((p, i) => (
                        <div
                            key={i}
                            className="portfolio-card reveal-item"
                            ref={(el) => setRef(el, 21 + i)}
                            style={{ transitionDelay: `${i * 0.08}s`, background: p.bg }}
                        >
                            <div className="portfolio-placeholder">{p.emoji}</div>
                            <div className="portfolio-card-overlay">
                                <div className="portfolio-card-bottom">
                                    <div className="portfolio-card-meta">
                                        <span className="portfolio-card-label">{t(p.label, p.labelEn)}</span>
                                        <span className="portfolio-card-title">{t(p.title, p.titleEn)}</span>
                                    </div>
                                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{p.type}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
