"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Portfolio() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    const projects = [
        {
            title: "Aura E-commerce",
            descEs: "Diseño minimalista",
            descEn: "Minimalist design",
            visual: "visual-1",
        },
        {
            title: "Zenith App",
            descEs: "Landing page interactiva",
            descEn: "Interactive landing page",
            visual: "visual-2",
        },
        {
            title: "Oasis Studio",
            descEs: "Portafolio corporativo",
            descEn: "Corporate portfolio",
            visual: "visual-3",
        },
        {
            title: "Lumina Platform",
            descEs: "Plataforma SaaS",
            descEn: "SaaS Platform",
            visual: "visual-4",
        },
    ];

    return (
        <section id="portafolio" className="portfolio section-padding">
            <div className="container section-header reveal" ref={(el) => setRef(el, 0)}>
                <h2 className="section-title">{t("Nuestro Portafolio", "Our Portfolio")}</h2>
                <p className="section-desc">
                    {t("Proyectos seleccionados que combinan estética y funcionalidad.", "Selected projects that combine aesthetics and functionality.")}
                </p>
            </div>
            <div className="container portfolio-grid">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="portfolio-item reveal-item"
                        style={{ transitionDelay: `${index * 100}ms` }}
                        ref={(el) => setRef(el, index + 1)}
                    >
                        <div className={`item-visual ${project.visual}`}></div>
                        <div className="item-info">
                            <h3>{project.title}</h3>
                            <p>{t(project.descEs, project.descEn)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
