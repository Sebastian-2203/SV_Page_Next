"use client";

import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import GradualBlur from "./GradualBlur";

export default function Hero() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    return (
        <header id="inicio" className="hero">
            <div className="reveal" ref={(el) => setRef(el, 0)} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span className="hero-eyebrow">
                    {t("Diseño web premium · Desde 2023", "Premium web design · Since 2023")}
                </span>
                <h1 className="hero-title">
                    {t("Diseño web que", "Web design that")}<br />
                    <em>{t("impresiona.", "impresses.")}</em>
                </h1>
                <p className="hero-subtitle">
                    {t(
                        "Creamos experiencias digitales sofisticadas y a la medida para marcas que buscan destacar.",
                        "We craft sophisticated, tailor-made digital experiences for brands that want to stand out."
                    )}
                </p>
                <div className="hero-buttons">
                    <a href="#portafolio" className="btn btn-ghost">
                        {t("Ver nuestro trabajo", "View our work")}
                    </a>
                    <a href="#contacto" className="btn btn-primary">
                        {t("Empezar un proyecto →", "Start a project →")}
                    </a>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse" />
            </div>

            <GradualBlur position="bottom" height="12rem" color="#080c14" />
        </header>
    );
}
