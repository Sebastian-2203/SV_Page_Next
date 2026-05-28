"use client";

import { useLanguage } from "./LanguageProvider";
import ScrollReveal from "./ScrollReveal";
import React from "react";

interface Props { onBookCall?: () => void; }

export default function CTASection({ onBookCall }: Props) {
    const { t } = useLanguage();

    return (
        <section style={{
            padding: "6rem 2rem",
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
                maxWidth: 600, margin: "0 auto",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    <span style={{ width: 6, height: 6, background: "var(--color-brand)", borderRadius: "50%" }} />
                    <p style={{
                        fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px",
                        textTransform: "uppercase", color: "var(--color-brand)",
                    }}>
                        {t("¿Listo para empezar?", "Ready to start?")}
                    </p>
                </div>

                <ScrollReveal as="h2" baseOpacity={0} blurStrength={3} baseRotation={1} textClassName="cta-title">
                    {t("Empieza tu siguiente proyecto hoy", "Start your next project today")}
                </ScrollReveal>
                
                <style>{`
                    .cta-title {
                        font-size: clamp(2.5rem, 4vw, 3.5rem) !important;
                        font-weight: 700 !important;
                        letter-spacing: -0.03em !important;
                        line-height: 1.2 !important;
                        margin-bottom: 1.5rem !important;
                        color: var(--color-text-primary) !important;
                    }
                `}</style>

                <p style={{
                    fontSize: "1.1rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                    maxWidth: 500
                }}>
                    {t(
                        "Hablemos de tu idea. En 30 minutos sabremos si somos el equipo indicado.",
                        "Let's talk about your idea. In 30 minutes we'll know if we're the right team."
                    )}
                </p>

                <ul style={{ 
                    listStyle: 'none', 
                    margin: '0 0 2.5rem', 
                    padding: 0, 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "0.8rem", 
                    textAlign: "left" 
                }}>
                    <li style={{ color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "var(--color-brand)" }}>✓</span> {t("Sin formularios largos", "No long forms")}
                    </li>
                    <li style={{ color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "var(--color-brand)" }}>✓</span> {t("Consulta 100% gratuita", "100% free consultation")}
                    </li>
                    <li style={{ color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "var(--color-brand)" }}>✓</span> {t("Propuesta en menos de 48 horas", "Proposal in less than 48 hours")}
                    </li>
                </ul>

                <button style={{ 
                    padding: "1.2rem 2.5rem", 
                    background: "var(--color-brand)", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: "12px", 
                    fontSize: "1rem", 
                    fontWeight: 700, 
                    cursor: "pointer", 
                    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)", 
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                }}
                onClick={onBookCall}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-brand-hover)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 25px -5px rgba(74,144,217,0.4)";
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-brand)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                >
                    {t("Agendar llamada gratuita", "Schedule free call")}
                </button>
            </div>
        </section>
    );
}
