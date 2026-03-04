"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Portfolio() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    // TODO: Agrega aquí los proyectos que ya realizaron / Add your completed projects here
    const projects = [
        {
            title: "Proyecto 1 / Project 1",
            descEs: "Descripción de su primer proyecto",
            descEn: "Description of your first project",
            visual: "visual-1", // Clase CSS o ruta de imagen / CSS class or image path
        },
        {
            title: "Proyecto 2 / Project 2",
            descEs: "Descripción de su segundo proyecto",
            descEn: "Description of your second project",
            visual: "visual-2",
        },
        {
            title: "Proyecto 3 / Project 3",
            descEs: "Descripción de su tercer proyecto",
            descEn: "Description of your third project",
            visual: "visual-3",
        },
        {
            title: "Proyecto 4 / Project 4",
            descEs: "Descripción de su cuarto proyecto",
            descEn: "Description of your fourth project",
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
