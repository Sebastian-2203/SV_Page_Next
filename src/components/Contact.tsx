"use client";

import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Cotizador from "./Cotizador";

export default function Contact() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    return (
        <section id="contacto" className="contact">
            <div className="container">
                <div className="contact-grid">
                    {/* Left: info */}
                    <div className="reveal" ref={(el) => setRef(el, 30)}>
                        <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>
                            {t("Trabajemos juntos", "Let's work together")}
                        </p>
                        <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
                            {t("¿Tenés un proyecto en mente?", "Got a project in mind?")}
                        </h2>
                        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                            {t(
                                "Contanos qué necesitás y te respondemos en menos de 24 horas con una propuesta personalizada.",
                                "Tell us what you need and we'll get back to you in less than 24 hours with a personalized proposal."
                            )}
                        </p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <label>{t("Email", "Email")}</label>
                                <a href="mailto:hola@svsolutions.com">hola@svsolutions.com</a>
                            </div>
                            <div className="contact-item">
                                <label>WhatsApp</label>
                                <a href="https://wa.me/573102163947" target="_blank" rel="noopener noreferrer">
                                    +57 310 216 3947
                                </a>
                            </div>
                            <div className="contact-item">
                                <label>Instagram</label>
                                <a href="https://instagram.com/svsolutions" target="_blank" rel="noopener noreferrer">
                                    @svsolutions
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right: quoter */}
                    <div id="cotiza" className="quote-card reveal-delay" ref={(el) => setRef(el, 31)}>
                        <Cotizador />
                    </div>
                </div>
            </div>
        </section>
    );
}
