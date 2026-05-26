"use client";

import { useLanguage } from "./LanguageProvider";

export default function ValueBlocksSection() {
    const { t } = useLanguage();

    const values = [
        {
            title: "Diseño y código, juntos",
            titleEn: "Design and code, together",
            desc: "Cortamos la fricción entre equipos. Lo que se diseña, se puede construir. Lo que se construye, se ve increíble.",
            descEn: "No friction between teams. What is designed, can be built. What is built, looks incredible.",
        },
        {
            title: "Ejecución estratégica",
            titleEn: "Strategic execution",
            desc: "No somos solo hacedores. Entendemos las reglas del negocio, la conversión y cómo la tecnología habilita el crecimiento.",
            descEn: "We aren't just order-takers. We understand business metrics, conversion, and how technology enables growth.",
        },
        {
            title: "Herramientas modernas",
            titleEn: "Modern tooling",
            desc: "Usamos el stack correcto. Next.js, React, arquitecturas sin servidor. Nada de templates pesados. Solo código rápido y limpio.",
            descEn: "We use the right stack. Next.js, React, serverless architectures. No bloated templates. Just fast, clean code.",
        },
    ];

    return (
        <section style={{ padding: "4rem 2rem", background: "var(--color-bg-primary)", borderTop: "0.5px solid var(--color-border)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ marginBottom: "4rem", maxWidth: 600 }}>
                    <p style={{
                        fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px",
                        textTransform: "uppercase", color: "var(--color-brand)",
                        marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem",
                    }}>
                        <span style={{ width: 20, height: 1, background: "var(--color-border-brand)", display: "inline-block" }} />
                        {t("Por qué elegirnos", "Why choose us")}
                    </p>
                    <h2 style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.2,
                        maxWidth: 600,
                        color: "var(--color-text-primary)"
                    }}>
                        {t("Por qué los fundadores nos eligen.", "Why founders choose us.")}
                    </h2>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "2rem",
                }} className="value-blocks-grid">
                    {values.map((block, i) => (
                        <div key={i} style={{
                            padding: "2.5rem",
                            background: "var(--color-bg-glass)",
                            border: "0.5px solid var(--color-border)",
                            borderRadius: "var(--radius-lg)",
                            transition: "background 0.3s, border-color 0.3s, transform 0.3s",
                            cursor: "default"
                        }}
                            onMouseEnter={e => {
                                const el = e.currentTarget;
                                el.style.background = "var(--color-bg-glass)";
                                el.style.borderColor = "var(--color-border-brand)";
                                el.style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget;
                                el.style.background = "var(--color-bg-glass)";
                                el.style.borderColor = "var(--color-border)";
                                el.style.transform = "translateY(0)";
                            }}
                        >
                            <h3 style={{
                                fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em",
                                marginBottom: "0.5rem", color: "var(--color-text-primary)"
                            }}>
                                {t(block.title, block.titleEn)}
                            </h3>
                            <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                                {t(block.desc, block.descEn)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .value-blocks-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>
        </section>
    );
}
