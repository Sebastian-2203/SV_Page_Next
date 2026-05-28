"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";

/* ─── Project data ─── */

const projects = [
    {
        id: "ecommerce",
        tag: "COMERCIO",
        tagEn: "COMMERCE",
        title: "E-commerce",
        titleEn: "E-commerce",
        features: ["Tiendas custom", "Flujo de compra", "Checkout optimizado", "Conversión"],
        featuresEn: ["Custom stores", "Purchase flow", "Optimized checkout", "Conversion"],
    },
    {
        id: "saas",
        tag: "APLICACIONES",
        tagEn: "APPLICATIONS",
        title: "SaaS & Web Apps",
        titleEn: "SaaS & Web Apps",
        features: ["Dashboards a medida", "Integraciones API", "Roles y permisos", "Arquitectura escalable"],
        featuresEn: ["Custom dashboards", "API integrations", "Roles and permissions", "Scalable architecture"],
    },
    {
        id: "landing",
        tag: "CONVERSIÓN",
        tagEn: "CONVERSION",
        title: "Landing Pages",
        titleEn: "Landing Pages",
        features: ["Diseño de alto impacto", "Animaciones fluidas", "Optimización SEO", "Velocidad extrema"],
        featuresEn: ["High-impact design", "Fluid animations", "SEO optimization", "Extreme speed"],
    },
    {
        id: "portfolio",
        tag: "CREATIVIDAD",
        tagEn: "CREATIVITY",
        title: "Sitios Premium",
        titleEn: "Premium Sites",
        features: ["Identidad visual", "Experiencias inmersivas", "WebGL & 3D", "Interacciones únicas"],
        featuresEn: ["Visual identity", "Immersive experiences", "WebGL & 3D", "Unique interactions"],
    },
];

/* ─── Full page mockup wireframe ─── */

function PageMockup() {
    const accentColor = "var(--color-brand)";
    
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: "var(--color-bg-glass)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }}>
            {/* Browser chrome */}
            <div style={{
                padding: "10px 14px",
                display: "flex",
                gap: "6px",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                flexShrink: 0,
            }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-border)" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-border)" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-border)" }} />
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: "var(--color-border)", marginLeft: 12, maxWidth: 200 }} />
            </div>

            {/* Page content */}
            <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Nav */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: 30, height: 8, borderRadius: 4, background: "var(--color-border)" }} />
                    <div style={{ display: "flex", gap: "14px" }}>
                        <div style={{ width: 28, height: 5, borderRadius: 3, background: "var(--color-border)" }} />
                        <div style={{ width: 28, height: 5, borderRadius: 3, background: "var(--color-border)" }} />
                        <div style={{ width: 28, height: 5, borderRadius: 3, background: "var(--color-border)" }} />
                    </div>
                </div>

                {/* Hero */}
                <div style={{
                    flex: 1,
                    borderRadius: 10,
                    background: `linear-gradient(160deg, rgba(74,144,217,0.18), rgba(74,144,217,0.06))`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    padding: "24px",
                    minHeight: 120,
                }}>
                    <div style={{ height: 10, width: "45%", borderRadius: 5, background: "var(--color-border)" }} />
                    <div style={{ height: 7, width: "60%", borderRadius: 4, background: "var(--color-border)" }} />
                    <div style={{ height: 7, width: "35%", borderRadius: 4, background: "var(--color-border)" }} />
                    <div style={{
                        marginTop: 10,
                        width: 70,
                        height: 22,
                        borderRadius: 6,
                        background: `var(--color-brand-subtle)`,
                        border: `0.5px solid var(--color-border-brand)`,
                    }} />
                </div>

                {/* Cards row */}
                <div style={{ display: "flex", gap: "10px" }}>
                    {[1, 2, 3].map(n => (
                        <div key={n} style={{
                            flex: 1,
                            height: 55,
                            borderRadius: 8,
                            background: "var(--color-bg-glass)",
                            border: "0.5px solid var(--color-border)",
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            gap: "4px",
                        }}>
                            <div style={{ height: 4, width: "70%", borderRadius: 2, background: "var(--color-border)" }} />
                            <div style={{ height: 4, width: "45%", borderRadius: 2, background: "var(--color-border)" }} />
                        </div>
                    ))}
                </div>

                {/* Footer lines */}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6 }}>
                    <div style={{ height: 4, width: 50, borderRadius: 2, background: "var(--color-border)" }} />
                    <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ height: 4, width: 20, borderRadius: 2, background: "var(--color-border)" }} />
                        <div style={{ height: 4, width: 20, borderRadius: 2, background: "var(--color-border)" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Sticky Card ─── */

function StickyProjectCard({
    project,
    index,
    total,
    t,
    language,
}: {
    project: typeof projects[0];
    index: number;
    total: number;
    t: (es: string, en: string) => string;
    language: string;
}) {
    // Each card sticks a bit lower than the previous
    const stickyTop = 80 + index * 16;
    const accentColor = "var(--color-brand)";

    return (
        <div style={{
            height: "100vh",
            position: "relative",
        }}>
            <div style={{
                position: "sticky",
                top: stickyTop,
                height: `calc(100vh - ${stickyTop + 40}px)`,
                maxHeight: "600px",
                borderRadius: "20px",
                overflow: "hidden",
                background: "var(--color-bg-secondary)",
                border: `0.5px solid var(--color-border)`,
                boxShadow: `0 30px 60px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)`,
                display: "grid",
                gridTemplateColumns: "1fr",
                transition: "box-shadow 0.4s ease",
            }} className="sticky-project-card">

                {/* Full card layout */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "380px 1fr",
                    height: "100%",
                    position: "relative",
                }} className="sticky-card-layout">

                    {/* Left: Project Info */}
                    <div style={{
                        padding: "3rem 2.5rem",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 2,
                        borderRight: "0.5px solid var(--color-border)",
                    }}>
                        {/* Counter + Tag */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "1.5rem",
                            fontSize: "12px",
                            letterSpacing: "3px",
                            textTransform: "uppercase",
                            color: accentColor,
                            fontWeight: 600,
                        }}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <span>/</span>
                            <span>{t(project.tag, project.tagEn)}</span>
                        </div>

                        {/* Title */}
                        <h3 style={{
                            fontSize: "clamp(2rem, 2.5vw, 2.5rem)",
                            fontWeight: 700,
                            color: "var(--color-text-primary)",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                            margin: "0 0 2rem",
                        }}>
                            {t(project.title, project.titleEn)}
                        </h3>

                        {/* Features List */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {(language === "en" ? project.featuresEn : project.features).map((feature: string, idx: number) => (
                                <div key={idx} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "14px 16px",
                                    background: "var(--color-bg-glass)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "12px",
                                }}>
                                    <div style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: accentColor,
                                        boxShadow: `0 0 8px ${accentColor}`,
                                    }} />
                                    <span style={{
                                        color: "var(--color-text-secondary)",
                                        fontSize: "15px",
                                        fontWeight: 500,
                                    }}>
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Page Mockup */}
                    <div style={{
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "stretch",
                        position: "relative",
                        zIndex: 1,
                    }}>
                        <PageMockup />
                    </div>
                </div>

                {/* Accent glow */}
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: "30%",
                    width: "40%",
                    height: "40%",
                    background: `radial-gradient(ellipse, rgba(74,144,217,0.08), transparent 70%)`,
                    pointerEvents: "none",
                    zIndex: 0,
                }} />
            </div>
        </div>
    );
}

/* ─── Main section ─── */

export default function PortfolioSection() {
    const { t, language } = useLanguage();

    return (
        <section
            id="portafolio"
            style={{
                background: "var(--color-bg-primary)",
                borderTop: "0.5px solid var(--color-border)",
                position: "relative",
            }}
        >
            {/* ── Section Header ── */}
            <div style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "6rem 2rem 2rem",
            }}>
                <div style={{ marginBottom: "1rem", maxWidth: 600 }}>
                    <p style={{
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: "var(--color-brand)",
                        marginBottom: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <span style={{ width: 24, height: 1, background: "var(--color-border-brand)", display: "inline-block" }} />
                        {t("Portafolio", "Portfolio")}
                    </p>
                    <h2 style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontWeight: 600,
                        letterSpacing: "-0.04em",
                        lineHeight: 1.2,
                        maxWidth: 600,
                        color: "var(--color-text-primary)",
                        margin: 0,
                    }}>
                        {t("Proyectos que hablan.", "Projects that speak.")}
                    </h2>
                </div>
            </div>

            {/* ── Sticky Scroll Cards ── */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
                {projects.map((project, i) => (
                    <StickyProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                        total={projects.length}
                        t={t}
                        language={language}
                    />
                ))}
            </div>

            {/* Responsive */}
            <style>{`
                .sticky-project-card:hover {
                    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05) !important;
                }
                @media (max-width: 768px) {
                    .sticky-card-layout {
                        grid-template-columns: 1fr !important;
                        grid-template-rows: auto 1fr !important;
                    }
                    .sticky-card-layout > div:first-child {
                        padding: 1.5rem !important;
                        border-right: none !important;
                        border-bottom: 0.5px solid rgba(255,255,255,0.05);
                    }
                    .sticky-card-layout > div:last-child {
                        padding: 1rem !important;
                    }
                }
            `}</style>
        </section>
    );
}
