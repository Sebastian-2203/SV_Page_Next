"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function About() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    return (
        <section id="nosotros" className="about section-padding">
            <div className="container about-container reveal" ref={(el) => setRef(el, 0)}>
                <div className="about-text">
                    <h2 className="section-title">{t("Sobre nosotros", "About us")}</h2>
                    <h3 className="about-headline">
                        {t("Artesanía digital con precisión.", "Digital craftsmanship with precision.")}
                    </h3>
                    <p>
                        {t(
                            "Somos un equipo de diseñadores y desarrolladores apasionados por la innovación y la simplicidad. Creemos en la ausencia de lo innecesario para destacar lo verdaderamente importante.",
                            "We are a team of designers and developers passionate about innovation and simplicity. We believe in the absence of the unnecessary to highlight what is truly important."
                        )}
                    </p>
                    <p>
                        {t(
                            "Cada línea de código y cada píxel está diseñado con propósito, asegurando que tu negocio no solo se vea bien, sino que funcione de manera impecable.",
                            "Every line of code and every pixel is designed with purpose, ensuring your business not only looks good, but functions flawlessly."
                        )}
                    </p>
                </div>
                <div className="about-stats reveal-delay" ref={(el) => setRef(el, 1)}>
                    <div className="stat-box">
                        <span className="stat-num">50+</span>
                        <span className="stat-text">
                            {t("Proyectos entregados", "Projects delivered")}
                        </span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-num">100%</span>
                        <span className="stat-text">
                            {t("Clientes satisfechos", "Satisfied clients")}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
