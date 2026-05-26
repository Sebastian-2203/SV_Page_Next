"use client";

import { useLanguage } from "./LanguageProvider";

const items = [
    {
        col: "1 / 3", row: "1 / 3",  // large top-left
        tag: "WEB DESIGN & DEV",
        tagEn: "WEB DESIGN & DEV",
        title: "Sitios Premium.",
        titleEn: "Premium Sites.",
        desc: "Landings, corporativos y portafolios. Construidos para impresionar, optimizados para convertir.",
        descEn: "Landings, corporate, and portfolios. Built to impress, optimized to convert.",
        icon: "⬡",
        size: "large",
        image: "/hero-mockup.png"
    },
    {
        col: "3 / 4", row: "1 / 2",  // top-right
        tag: "BRANDING",
        tagEn: "BRANDING",
        title: "Sistemas Visuales.",
        titleEn: "Visual Systems.",
        desc: "Identidad que comunica sin tener que explicarse.",
        descEn: "Identity that communicates without having to explain itself.",
        icon: "✦",
        size: "medium",
    },
    {
        col: "3 / 4", row: "2 / 4",  // tall mid-right
        tag: "E-COMMERCE",
        tagEn: "E-COMMERCE",
        title: "Tiendas que escalan.",
        titleEn: "Stores that scale.",
        desc: "Arquitecturas de comercio diseñadas para máxima conversión.",
        descEn: "Commerce architectures designed for maximum conversion.",
        icon: "◈",
        size: "medium",
    },
    {
        col: "1 / 2", row: "3 / 4",  // bottom-left
        tag: "AUTOMATIZACIÓN",
        tagEn: "AUTOMATION",
        title: "Menos clics.",
        titleEn: "Fewer clicks.",
        desc: "Zapier, Make, y APIs custom para workflows inteligentes.",
        descEn: "Zapier, Make, and custom APIs for smart workflows.",
        icon: "⬢",
        size: "medium",
    },
    {
        col: "2 / 3", row: "3 / 4",  // bottom-mid
        tag: "IA",
        tagEn: "AI",
        title: "Software inteligente.",
        titleEn: "Smart software.",
        desc: "LLMs, agentes e integraciones de IA en tu producto.",
        descEn: "LLMs, agents and AI integrations in your product.",
        icon: "◭",
        size: "medium",
    },
];

function BentoCard({ item, t }: { item: typeof items[0] & { image?: string }; t: (es: string, en: string) => string }) {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: "var(--color-bg-glass)",
                border: "0.5px solid var(--color-border)",
                borderRadius: "var(--radius-lg)", // straight geometry mixed with soft curves
                padding: item.size === "large" ? "3rem" : "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden", // Keeps inside image and overlay contained
                cursor: "default",
                transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                minHeight: item.size === "large" ? 340 : 220,
                zIndex: 2,
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-border-brand)";
                el.style.boxShadow = "0 10px 40px -10px rgba(74,144,217,0.08)";
                const icon = el.querySelector('.bento-icon') as HTMLElement;
                if (icon) {
                    icon.style.transform = "scale(1.1) rotate(5deg)";
                    icon.style.opacity = "0.7";
                }
                const imgWrap = el.querySelector('.bento-image-wrapper') as HTMLElement;
                if (imgWrap) {
                    imgWrap.style.transform = "scale(1.03) translateY(-1%)";
                    imgWrap.style.opacity = "1";
                }
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-border)";
                el.style.boxShadow = "none";
                const icon = el.querySelector('.bento-icon') as HTMLElement;
                if (icon) {
                    icon.style.transform = "scale(1) rotate(0deg)";
                    icon.style.opacity = "0.15";
                }
                const imgWrap = el.querySelector('.bento-image-wrapper') as HTMLElement;
                if (imgWrap) {
                    imgWrap.style.transform = "scale(1) translateY(0)";
                    imgWrap.style.opacity = "0.85";
                }
            }}
        >
            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem" }}>
                <p style={{
                    fontSize: "11px", fontWeight: 500,
                    letterSpacing: "2.5px", textTransform: "uppercase",
                    color: "var(--color-brand)",
                    display: "flex", alignItems: "center", gap: "0.4rem"
                }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--color-brand)" }} />
                    {t(item.tag, item.tagEn)}
                </p>
                <span className="bento-icon" style={{
                    fontSize: item.size === "large" ? "3.5rem" : "2rem",
                    opacity: 0.15,
                    lineHeight: 1,
                    transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    color: "#fff"
                }}>{item.icon}</span>
            </div>

            {/* Bottom content */}
            <div style={{ position: "relative", zIndex: 2 }}>
                <h3 style={{
                    fontSize: item.size === "large" ? "2.2rem" : "1.2rem",
                    fontWeight: 400,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                    marginBottom: "0.8rem",
                    color: "#fff"
                }}>
                    {t(item.title, item.titleEn)}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: "90%" }}>
                    {t(item.desc, item.descEn)}
                </p>
            </div>

            {/* Optional Image Background */}
            {item.image && (
                <div style={{
                    position: "absolute",
                    bottom: "-10%",
                    right: "-5%",
                    width: item.size === "large" ? "75%" : "100%",
                    zIndex: 1,
                    opacity: 0.85,
                    pointerEvents: "none",
                    transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }} className="bento-image-wrapper">
                    <img src={item.image} alt={item.title} style={{
                        width: "100%", height: "auto", objectFit: "contain",
                        maskImage: "linear-gradient(to top, transparent 5%, black 40%)",
                        WebkitMaskImage: "linear-gradient(to top, transparent 5%, black 40%)"
                    }} />
                </div>
            )}
        </div>
    );
}

export default function BentoGrid() {
    const { t } = useLanguage();

    return (
        <section id="servicios" style={{ padding: "4rem 2rem", background: "var(--color-bg-primary)", borderTop: "0.5px solid var(--color-border)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ marginBottom: "5rem" }}>
                    <p style={{
                        fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px",
                        textTransform: "uppercase", color: "var(--color-brand)",
                        marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem",
                    }}>
                        <span style={{ width: 24, height: 1, background: "var(--color-border-brand)", display: "inline-block" }} />
                        {t("Capacidades", "Capabilities")}
                    </p>
                    <h2 style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.2,
                        maxWidth: 600,
                        color: "var(--color-text-primary)"
                    }}>
                        {t("Ingeniería y diseño para productos premium.", "Engineering and design for premium products.")}
                    </h2>
                </div>

                {/* Bento grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gridAutoRows: "minmax(200px, auto)",
                    gap: "1.5rem",
                }} className="bento-grid">
                    {items.map((item, i) => (
                        <div 
                            key={i} 
                            style={{
                                gridColumn: item.col,
                                gridRow: item.row,
                                position: "relative",
                                overflow: "visible", // Allows the glowing blur to expand outside card borders
                            }}
                            onMouseMove={e => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
                            }}
                            onMouseEnter={e => {
                                const glow = e.currentTarget.querySelector('.bento-glow-overlay') as HTMLElement;
                                if (glow) glow.style.opacity = "0.22"; // Fade in soft brand glow
                            }}
                            onMouseLeave={e => {
                                const glow = e.currentTarget.querySelector('.bento-glow-overlay') as HTMLElement;
                                if (glow) glow.style.opacity = "0"; // Fade out soft brand glow
                            }}
                        >
                            {/* Ambient radial blur glow behind the card on the outside */}
                            <div className="bento-glow-overlay" style={{
                                position: "absolute",
                                inset: "-35px", // Bleeds outside the card boundaries by 35px
                                background: "radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--color-brand) 0%, transparent 80%)",
                                filter: "blur(40px)",
                                opacity: 0,
                                zIndex: 0,
                                pointerEvents: "none",
                                borderRadius: "var(--radius-lg)",
                                transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            }} />
                            
                            {/* Card Component */}
                            <BentoCard item={item} t={t} />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .bento-grid { 
            grid-template-columns: 1fr !important; 
            grid-auto-rows: auto !important;
          }
          .bento-grid > * { 
            grid-column: 1 / -1 !important; 
            grid-row: auto !important; 
            min-height: auto !important;
          }
        }
      `}</style>
        </section>
    );
}
