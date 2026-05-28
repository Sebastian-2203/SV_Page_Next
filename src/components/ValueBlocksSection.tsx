"use client";

import { useLanguage } from "./LanguageProvider";

export default function ValueBlocksSection() {
    const { t } = useLanguage();

    const values = [
        {
            title: "Diseño + Desarrollo integrado",
            titleEn: "Integrated Design + Development",
            desc: "No trabajamos en silos. Lo que diseñamos se puede construir perfectamente. Sin handoffs lentos, sin discrepancias entre wireframes y código.",
            descEn: "We don't work in silos. What we design can be built perfectly. No slow handoffs, no discrepancies between wireframes and code.",
        },
        {
            title: "Enfoque en resultados",
            titleEn: "Focus on results",
            desc: "Entendemos tu modelo de negocio, tus métricas, tus competidores. Cada decisión de diseño y desarrollo tiene un objetivo: más leads, más ventas, más usuarios.",
            descEn: "We understand your business model, metrics, and competitors. Every design and development decision has a goal: more leads, more sales, more users.",
        },
        {
            title: "Stack moderno y sin deuda técnica",
            titleEn: "Modern stack & no technical debt",
            desc: "Next.js, React, Typescript, Node.js, APIs serverless. Nada de templates pesados. Código limpio, mantenible, escalable. Tu proyecto crece contigo.",
            descEn: "Next.js, React, TypeScript, Node.js, serverless APIs. No heavy templates. Clean, maintainable, scalable code. Your project grows with you.",
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
                        {t("Por qué empresas eligen SyV Solutions", "Why companies choose SyV Solutions")}
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
