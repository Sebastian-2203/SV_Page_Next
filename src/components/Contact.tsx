"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

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
                            <a href="mailto:hello@svstudio.com" className="contact-link">
                                hello@svstudio.com
                            </a>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">{t("Ubicación", "Location")}</span>
                            <span className="contact-link">
                                {t("Global y Remoto", "Global & Remote")}
                            </span>
                        </div>
                    </div>
                </div>

                <div id="cotiza" className="quote-card reveal-delay" ref={(el) => setRef(el, 1)}>
                    <h3>{t("Cotiza tu proyecto", "Get a Quote")}</h3>
                    <form id="quote-form" className="quote-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">{t("Nombre", "Name")}</label>
                            <input
                                type="text"
                                id="name"
                                required
                                placeholder={t("Tu nombre", "Your name")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">
                                {t("Correo electrónico", "Email Address")}
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder={t("tu@email.com", "you@email.com")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="budget">
                                {t("Presupuesto aproximado", "Approximate budget")}
                            </label>
                            <select id="budget">
                                <option value="small">
                                    {t("Menos de $1k", "Less than $1k")}
                                </option>
                                <option value="medium">
                                    {t("$1k - $5k", "$1k - $5k")}
                                </option>
                                <option value="large">
                                    {t("Más de $5k", "More than $5k")}
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">
                                {t("Mensaje (Opcional)", "Message (Optional)")}
                            </label>
                            <textarea
                                id="message"
                                rows={3}
                                placeholder={t(
                                    "Cuéntanos brevemente sobre tu proyecto",
                                    "Tell us briefly about your project"
                                )}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-submit">
                            {t("Enviar solicitud", "Send request")}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
