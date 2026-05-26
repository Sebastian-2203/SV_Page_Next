"use client";

import { useLanguage } from "./LanguageProvider";

interface Props { onBookCall: () => void; }

import ScrollReveal from "./ScrollReveal";

export default function CTASection({ onBookCall }: Props) {
    const { t, language } = useLanguage();

    return (
        <section style={{
            padding: "4rem 2rem",
            background: "var(--color-bg-primary)",
            borderTop: "0.5px solid var(--color-border)",
            position: "relative",
            overflow: "hidden"
        }}>

            {/* Subtle background glow */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60vw",
                height: "60vw",
                background: "radial-gradient(circle, var(--color-brand-subtle) 0%, rgba(0,0,0,0) 70%)",
                zIndex: 0,
                pointerEvents: "none"
            }} />

            <div style={{
                maxWidth: 900, margin: "0 auto",
                textAlign: "center",
                position: "relative",
                zIndex: 1
            }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
                    <span style={{ width: 6, height: 6, background: "var(--color-brand)", borderRadius: "50%" }} />
                    <p style={{
                        fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px",
                        textTransform: "uppercase", color: "var(--color-brand)",
                    }}>
                        {t("¿Listo para empezar?", "Ready to start?")}
                    </p>
                </div>

                <ScrollReveal as="h2" baseOpacity={0} blurStrength={3} baseRotation={1} textClassName="cta-title">
                    {language === "en" ? (
                        <>Your next project<br />starts with a <span style={{ color: "var(--color-text-secondary)" }}>conversation.</span></>
                    ) : (
                        <>Tu próximo proyecto<br />empieza con una <span style={{ color: "var(--color-text-secondary)" }}>conversación.</span></>
                    )}
                </ScrollReveal>
                <style>{`
                    .cta-title {
                        font-size: clamp(3rem, 6vw, 5.5rem) !important;
                        font-weight: 600 !important;
                        letter-spacing: -0.04em !important;
                        line-height: 1.2 !important;
                        margin-bottom: 1.5rem !important;
                        color: var(--color-text-primary) !important;
                    }
                `}</style>

                <p style={{
                    fontSize: "1rem", color: "var(--color-text-secondary)",
                    lineHeight: 1.7, maxWidth: 480, margin: "0 auto 3.5rem",
                }}>
                    {t(
                        "Sin formularios eternos. Solo una llamada de 30 minutos para ver si somos el equipo correcto para lo que necesitás.",
                        "No endless forms. Just a 30-minute call to see if we're the right team for what you need."
                    )}
                </p>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 10 }}>
                    <button
                        onClick={onBookCall}
                        style={{
                            padding: "0.9rem 2.5rem",
                            background: "var(--color-brand)", color: "#fff",
                            border: "none", borderRadius: "var(--radius-md)",
                            fontSize: "0.95rem", fontWeight: 700,
                            cursor: "pointer", fontFamily: "inherit",
                            transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                            (e.currentTarget as HTMLElement).style.background = "var(--color-brand-hover)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 15px 35px -10px rgba(74,144,217,0.3)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.transform = "none";
                            (e.currentTarget as HTMLElement).style.background = "var(--color-brand)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                    >
                        {t("Agendar reunión gratuita", "Book a free call")}
                    </button>
                    <a href="mailto:hola@svsolutions.com" style={{
                        padding: "0.9rem 2.5rem",
                        background: "transparent", color: "var(--color-text-primary)",
                        border: "0.5px solid var(--color-border)", borderRadius: "var(--radius-md)",
                        fontSize: "0.95rem", fontWeight: 600,
                        cursor: "pointer", fontFamily: "inherit",
                        display: "inline-flex", alignItems: "center",
                        transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-brand)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                            (e.currentTarget as HTMLElement).style.background = "var(--color-brand-subtle)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}>
                        hola@svsolutions.com
                    </a>
                </div>
            </div>
        </section>
    );
}
