"use client";

import { useLanguage } from "./LanguageProvider";

const steps = [
    {
        num: "01",
        title: "Estrategia y Análisis", titleEn: "Strategy & Analysis",
        desc: "Entendemos tu negocio. Analizamos competencia, target, comportamiento de usuario. Planificamos objetivos medibles antes de diseñar o desarrollar.",
        descEn: "We understand your business. We analyze competition, target, user behavior. We plan measurable goals before designing or developing.",
    },
    {
        num: "02",
        title: "Diseño Estratégico", titleEn: "Strategic Design",
        desc: "Diseñamos interfaces que funcionan. Sistemas visuales coherentes, flujos intuitivos, accesibilidad. Todo pensado en conversión y experiencia del usuario.",
        descEn: "We design interfaces that work. Coherent visual systems, intuitive flows, accessibility. All designed for conversion and user experience.",
    },
    {
        num: "03",
        title: "Desarrollo Técnico", titleEn: "Technical Development",
        desc: "Código escalable y rápido. Next.js, React, Node.js. Optimizamos rendimiento, seguridad y SEO integrado desde el desarrollo.",
        descEn: "Scalable and fast code. Next.js, React, Node.js. We optimize performance, security, and SEO integrated from development.",
    },
    {
        num: "04",
        title: "Lanzamiento y Optimización", titleEn: "Launch & Optimization",
        desc: "Lanzamiento sin sorpresas. Optimización SEO, Google Analytics, pruebas A/B. Monitoreo continuo y ajustes para maximizar ROI.",
        descEn: "Launch without surprises. SEO optimization, Google Analytics, A/B testing. Continuous monitoring and adjustments to maximize ROI.",
    },
];

import ScrollReveal from "./ScrollReveal";

export default function ProcessSection() {
    const { t } = useLanguage();

    return (
        <section id="proceso" style={{ padding: "4rem 2rem", background: "var(--color-bg-primary)", borderTop: "0.5px solid var(--color-border)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ marginBottom: "6rem", maxWidth: 600 }}>
                    <p style={{
                        fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px",
                        textTransform: "uppercase", color: "var(--color-brand)",
                        marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem",
                    }}>
                        <span style={{ width: 20, height: 1, background: "var(--color-border-brand)", display: "inline-block" }} />
                        {t("Metodología", "Methodology")}
                    </p>
                    <ScrollReveal as="h2" baseOpacity={0} blurStrength={3} baseRotation={1} textClassName="process-title">
                        {t("Proceso probado. De la estrategia al éxito.", "Proven process. From strategy to success.")}
                    </ScrollReveal>
                    <style>{`
                        .process-title {
                            font-size: clamp(2.5rem, 5vw, 4rem) !important;
                            font-weight: 600 !important;
                            letter-spacing: -0.04em !important;
                            line-height: 1.2 !important;
                        }
                    `}</style>
                </div>

                {/* Steps */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "3rem",
                    position: "relative",
                }} className="process-grid">

                    {/* Connecting technical line */}
                    <div style={{
                        position: "absolute",
                        top: "16px", left: "20px", right: "20px",
                        height: "1px",
                        background: "linear-gradient(90deg, rgba(74,144,217,0.02) 0%, rgba(74,144,217,0.3) 50%, rgba(74,144,217,0.02) 100%)",
                        zIndex: 0,
                    }} className="process-line" />

                    {steps.map((step, i) => (
                        <div key={i} style={{
                            position: "relative", zIndex: 1,
                        }}>
                            {/* Technical Node */}
                             <div style={{
                                width: "32px", height: "32px",
                                borderRadius: "var(--radius-sm)",
                                border: "1.5px solid var(--color-border-brand)",
                                background: "var(--color-bg-secondary)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: "2.5rem",
                                boxShadow: "0 0 10px var(--color-brand-subtle)"
                            }}>
                                <div style={{ width: 6, height: 6, background: "var(--color-brand)", borderRadius: "50%" }} />
                            </div>

                            <p style={{
                                fontSize: "11px", fontWeight: 500,
                                letterSpacing: "2.5px", textTransform: "uppercase",
                                color: "var(--color-brand)",
                                marginBottom: "0.8rem"
                            }}>
                                PHASE {step.num}
                            </p>

                            <h3 style={{
                                fontSize: "1.2rem", fontWeight: 700,
                                letterSpacing: "-0.02em",
                                marginBottom: "1rem",
                                color: "var(--color-text-primary)"
                            }}>
                                {t(step.title, step.titleEn)}
                            </h3>
                            <p style={{
                                fontSize: "0.9rem",
                                color: "var(--color-text-secondary)",
                                lineHeight: 1.6,
                            }}>
                                {t(step.desc, step.descEn)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .process-line { 
            width: 1px !important; 
            height: 100% !important; 
            top: 0 !important; 
            left: 16px !important; 
            background: linear-gradient(180deg, rgba(74,144,217,0.02) 0%, rgba(74,144,217,0.3) 50%, rgba(74,144,217,0.02) 100%) !important;
          }
          .process-grid > div { padding-left: 2rem !important; }
        }
      `}</style>
        </section>
    );
}
