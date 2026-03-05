"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Cotizador from "./Cotizador";

export default function Contact() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Form submitted!");
    };

    return (
        <section id="contacto" className="contact section-padding">
            <div className="container contact-container">
                <div className="contact-info reveal" ref={(el) => setRef(el, 0)}>
                    <h2 className="section-title">
                        {t("Mantenemos el contacto", "Let's stay in touch")}
                    </h2>
                    <p className="contact-desc">
                        {t(
                            "Estamos listos para transformar tu visión en una realidad digital. Hablemos sobre tu próximo gran proyecto.",
                            "We are ready to transform your vision into a digital reality. Let's talk about your next big project."
                        )}
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <span className="contact-label">{t("Email", "Email")}</span>
                            <a href="mailto:contacto@syvsolutions.com" className="contact-link">
                                contacto@syvsolutions.com
                            </a>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">{t("Ubicación", "Location")}</span>
                            <span className="contact-link">
                                {t("Colombia y remoto", "Colombia and remote")}
                            </span>
                        </div>
                    </div>
                </div>

                <div id="cotiza" className="quote-card reveal-delay" ref={(el) => setRef(el, 1)}>
                    <Cotizador />
                </div>
            </div>
        </section>
    );
}
