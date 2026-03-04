"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Hero() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    return (
        <header id="inicio" className="hero">
            <div className="hero-content reveal" ref={(el) => setRef(el, 0)}>
                <h1 className="hero-title">
                    {t("Diseño web que impresiona.", "Web design that impresses.")}
                </h1>
                <p className="hero-subtitle">
                    {t(
                        "Creamos experiencias digitales sofisticadas y a la medida para marcas que buscan destacar.",
                        "We create sophisticated, tailor-made digital experiences for brands looking to stand out."
                    )}
                </p>
                <div className="hero-buttons">
                    <a href="#portafolio" className="btn btn-secondary">
                        {t("Ver nuestro trabajo", "View our work")}
                    </a>
                    <a href="#cotiza" className="btn btn-primary">
                        {t("Empezar un proyecto", "Start a project")}
                    </a>
                </div>
            </div>
            <div className="hero-media reveal-delay" ref={(el) => setRef(el, 1)}>
                <div className="hero-glow"></div>
                <div className="hero-image-placeholder">
                    <div className="browser-mockup">
                        <div className="browser-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="browser-content">
                            <div className="carousel-track">
                                {/* Duplicating images for infinite scroll effect */}
                                {[...Array(2)].map((_, groupIndex) => (
                                    <React.Fragment key={groupIndex}>
                                        <div className="carousel-slide">
                                            <div className="slide-content visual-1">
                                                <div className="slide-overlay">
                                                    <span>{t("E-commerce", "E-commerce")}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-slide">
                                            <div className="slide-content visual-2">
                                                <div className="slide-overlay">
                                                    <span>{t("Aplicaciones Web", "Web Apps")}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-slide">
                                            <div className="slide-content visual-3">
                                                <div className="slide-overlay">
                                                    <span>{t("Portafolios", "Portfolios")}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-slide">
                                            <div className="slide-content visual-4">
                                                <div className="slide-overlay">
                                                    <span>{t("Plataformas SaaS", "SaaS Platforms")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="mouse"></div>
            </div>
        </header>
    );
}
