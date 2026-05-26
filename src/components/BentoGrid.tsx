"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

// Custom SVG Icons for Bento Cards
const CartIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-brand)", opacity: 0.9 }}>
        <circle cx="8" cy="21" r="1"/>
        <circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
);

const LightningIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-brand)", opacity: 0.9 }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
);

const BrainIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-brand)", opacity: 0.9 }}>
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="9" y="9" width="6" height="6" rx="1"/>
        <path d="M9 1v3"/>
        <path d="M15 1v3"/>
        <path d="M9 20v3"/>
        <path d="M15 20v3"/>
        <path d="M20 9h3"/>
        <path d="M20 15h3"/>
        <path d="M1 9h3"/>
        <path d="M1 15h3"/>
    </svg>
);

// Animated Terminal simulation for the IA Card
function IATerminal() {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            marginTop: "1.5rem",
            padding: "1.1rem 1.25rem",
            background: "#050811",
            border: "0.5px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontFamily: 'SFMono-Regular, Consolas, Menlo, Monaco, "Courier New", Courier, monospace',
            fontSize: "0.78rem",
            minHeight: "115px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.9)",
            letterSpacing: "-0.01em"
        }}>
            <div style={{ 
                color: "var(--color-brand)", 
                opacity: step >= 0 ? 1 : 0, 
                transition: "opacity 0.4s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
            }}>
                <span style={{ fontWeight: "bold" }}>→</span>
                <span>{t("Analizando consulta...", "Analyzing query...")}</span>
            </div>
            <div style={{ 
                color: "#10B981", 
                opacity: step >= 1 ? 1 : 0, 
                transition: "opacity 0.4s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
            }}>
                <span style={{ fontWeight: "bold" }}>✓</span>
                <span>{t("Respuesta generada", "Response generated")}</span>
            </div>
            <div style={{ 
                color: "rgba(255,255,255,0.3)", 
                opacity: step >= 2 ? 1 : 0, 
                transition: "opacity 0.4s ease" 
            }}>
                {t("// integrado en tu web", "// integrated into your web")}
            </div>
        </div>
    );
}

// Animated Mini-Flow simulation for the Automation Card
function AutomationFlow() {
    const { t } = useLanguage();
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        t("Recibe formulario", "Receive form"),
        t("Notifica en Slack", "Notify in Slack"),
        t("CRM actualizado", "CRM updated")
    ];

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "0.75rem", 
            marginTop: "1.5rem", 
            position: "relative", 
            paddingLeft: "1rem" 
        }}>
            {/* Timeline line */}
            <div style={{
                position: "absolute",
                left: "3px",
                top: "6px",
                bottom: "6px",
                width: "1.5px",
                background: "rgba(255, 255, 255, 0.05)",
                zIndex: 0
            }} />
            
            {/* Dynamic progress highlight on timeline */}
            <div style={{
                position: "absolute",
                left: "3px",
                top: "6px",
                height: `${(activeStep / (steps.length - 1)) * 100}%`,
                width: "1.5px",
                background: "var(--color-brand)",
                boxShadow: "0 0 8px var(--color-brand)",
                zIndex: 1,
                transition: "height 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
            }} />

            {steps.map((step, i) => {
                const isActive = i === activeStep;
                const isCompleted = i < activeStep;

                return (
                    <div key={i} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "0.75rem", 
                        position: "relative", 
                        zIndex: 2,
                        opacity: isActive ? 1 : isCompleted ? 0.75 : 0.35,
                        transform: isActive ? "translateX(2px)" : "translateX(0)",
                        transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
                    }}>
                        <span style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: isActive || isCompleted ? "var(--color-brand)" : "rgba(255,255,255,0.2)",
                            boxShadow: isActive ? "0 0 10px var(--color-brand)" : "none",
                            transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
                        }} />
                        <span style={{ 
                            fontSize: "0.82rem", 
                            color: isActive ? "#fff" : "var(--color-text-secondary)",
                            fontWeight: isActive ? 500 : 400,
                            transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
                        }}>
                            {step}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

const items = [
    {
        id: "web-dev",
        col: "1 / 3", row: "1 / 3",  // large top-left
        tag: "WEB DESIGN & DEV",
        tagEn: "WEB DESIGN & DEV",
        title: "Sitios Premium.",
        titleEn: "Premium Sites.",
        desc: "Landings, corporativos y portafolios construidos para impresionar.",
        descEn: "Landings, corporate, and portfolios built to impress.",
        size: "large",
        image: "/hero-mockup.png"
    },
    {
        id: "branding",
        col: "3 / 4", row: "1 / 2",  // top-right
        tag: "BRANDING",
        tagEn: "BRANDING",
        title: "Sistemas Visuales.",
        titleEn: "Visual Systems.",
        desc: "Identidad que comunica.",
        descEn: "Identity that communicates.",
        size: "medium",
    },
    {
        id: "ecommerce",
        col: "3 / 4", row: "2 / 4",  // tall mid-right
        tag: "E-COMMERCE",
        tagEn: "E-COMMERCE",
        title: "Tiendas que escalan.",
        titleEn: "Stores that scale.",
        desc: "Arquitecturas para máxima conversión.",
        descEn: "Architectures for maximum conversion.",
        size: "medium",
    },
    {
        id: "automation",
        col: "1 / 2", row: "3 / 4",  // bottom-left
        tag: "AUTOMATIZACIÓN",
        tagEn: "AUTOMATION",
        title: "Menos clics.",
        titleEn: "Fewer clicks.",
        desc: "",
        descEn: "",
        size: "medium",
    },
    {
        id: "ai",
        col: "2 / 3", row: "3 / 4",  // bottom-mid
        tag: "IA",
        tagEn: "AI",
        title: "Software inteligente.",
        titleEn: "Smart software.",
        desc: "",
        descEn: "",
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
                const imgWrap = el.querySelector('.bento-image-wrapper') as HTMLElement;
                if (imgWrap) {
                    imgWrap.style.transform = "scale(1) translateY(0)";
                    imgWrap.style.opacity = "0.85";
                }
            }}
        >
            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: item.size === "large" ? "3rem" : "1.5rem" }}>
                <p style={{
                    fontSize: "11px", fontWeight: 500,
                    letterSpacing: "2.5px", textTransform: "uppercase",
                    color: "var(--color-brand)",
                    display: "flex", alignItems: "center", gap: "0.4rem"
                }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--color-brand)" }} />
                    {t(item.tag, item.tagEn)}
                </p>
                
                {/* Specific card top-right indicators/icons */}
                {item.id === "ecommerce" && <CartIcon />}
                {item.id === "automation" && <LightningIcon />}
                {item.id === "ai" && <BrainIcon />}
            </div>

            {/* Bottom content */}
            <div style={{ position: "relative", zIndex: 2 }}>
                <h3 style={{
                    fontSize: item.size === "large" ? "2.2rem" : "1.3rem",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                    marginBottom: "0.6rem",
                    color: "#fff"
                }}>
                    {t(item.title, item.titleEn)}
                </h3>
                {item.desc && (
                    <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.5, maxWidth: "90%" }}>
                        {t(item.desc, item.descEn)}
                    </p>
                )}

                {/* Proposal Custom Visual components based on Card ID */}
                
                {/* BRANDING Stats Box */}
                {item.id === "branding" && (
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
                        <div style={{
                            flex: 1,
                            padding: "0.6rem",
                            background: "rgba(255, 255, 255, 0.02)",
                            border: "0.5px solid var(--color-border)",
                            borderRadius: "var(--radius-md)",
                            textAlign: "center"
                        }}>
                            <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-brand)", letterSpacing: "-0.03em" }}>12+</p>
                            <p style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)", marginTop: "0.15rem" }}>{t("Marcas", "Brands")}</p>
                        </div>
                        <div style={{
                            flex: 1,
                            padding: "0.6rem",
                            background: "rgba(255, 255, 255, 0.02)",
                            border: "0.5px solid var(--color-border)",
                            borderRadius: "var(--radius-md)",
                            textAlign: "center"
                        }}>
                            <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-brand)", letterSpacing: "-0.03em" }}>100%</p>
                            <p style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)", marginTop: "0.15rem" }}>Custom</p>
                        </div>
                    </div>
                )}

                {/* E-COMMERCE Stack Chips */}
                {item.id === "ecommerce" && (
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                        {["Stripe", "Next.js", "Custom"].map(tech => (
                            <span key={tech} style={{
                                fontSize: "0.72rem",
                                padding: "0.25rem 0.6rem",
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "0.5px solid var(--color-border)",
                                borderRadius: "999px",
                                color: "var(--color-text-secondary)",
                                fontWeight: 500
                            }}>{tech}</span>
                        ))}
                    </div>
                )}

                {/* AUTOMATIZACIÓN Animated Mini-Flow */}
                {item.id === "automation" && <AutomationFlow />}

                {/* IA Animated typing-terminal */}
                {item.id === "ai" && <IATerminal />}
            </div>

            {/* Optional Image Background for Large Card */}
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
