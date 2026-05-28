"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

/* ─── Project data with gallery screens ─── */

const projects = [
    {
        id: "ecommerce",
        tag: "COMERCIO",
        tagEn: "COMMERCE",
        title: "E-commerce",
        titleEn: "E-commerce",
        features: ["Tiendas custom", "Flujo de compra", "Checkout optimizado", "Conversión"],
        featuresEn: ["Custom stores", "Purchase flow", "Optimized checkout", "Conversion"],
        gallery: [
            { label: "Hero & Catálogo", labelEn: "Hero & Catalog", gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0ea5e9 100%)" },
            { label: "Productos", labelEn: "Products", gradient: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #3b82f6 100%)" },
            { label: "Checkout", labelEn: "Checkout", gradient: "linear-gradient(135deg, #0c1222 0%, #1a365d 50%, #2563eb 100%)" },
            { label: "Dashboard", labelEn: "Dashboard", gradient: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1d4ed8 100%)" },
        ],
    },
    {
        id: "saas",
        tag: "APLICACIONES",
        tagEn: "APPLICATIONS",
        title: "SaaS & Web Apps",
        titleEn: "SaaS & Web Apps",
        features: ["Dashboards a medida", "Integraciones API", "Roles y permisos", "Arquitectura escalable"],
        featuresEn: ["Custom dashboards", "API integrations", "Roles and permissions", "Scalable architecture"],
        gallery: [
            { label: "Dashboard Principal", labelEn: "Main Dashboard", gradient: "linear-gradient(135deg, #0f172a 0%, #312e81 50%, #7c3aed 100%)" },
            { label: "Analytics", labelEn: "Analytics", gradient: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #818cf8 100%)" },
            { label: "Configuración", labelEn: "Settings", gradient: "linear-gradient(135deg, #0f0a2e 0%, #3730a3 50%, #6366f1 100%)" },
            { label: "Integraciones", labelEn: "Integrations", gradient: "linear-gradient(135deg, #020420 0%, #1e1b4b 50%, #4f46e5 100%)" },
        ],
    },
    {
        id: "landing",
        tag: "CONVERSIÓN",
        tagEn: "CONVERSION",
        title: "Landing Pages",
        titleEn: "Landing Pages",
        features: ["Diseño de alto impacto", "Animaciones fluidas", "Optimización SEO", "Velocidad extrema"],
        featuresEn: ["High-impact design", "Fluid animations", "SEO optimization", "Extreme speed"],
        gallery: [
            { label: "Hero Section", labelEn: "Hero Section", gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)" },
            { label: "Beneficios", labelEn: "Benefits", gradient: "linear-gradient(135deg, #022c22 0%, #065f46 50%, #059669 100%)" },
            { label: "Testimonios", labelEn: "Testimonials", gradient: "linear-gradient(135deg, #0a3d2f 0%, #0d9488 50%, #14b8a6 100%)" },
            { label: "CTA Final", labelEn: "Final CTA", gradient: "linear-gradient(135deg, #021a14 0%, #064e3b 50%, #34d399 100%)" },
        ],
    },
    {
        id: "portfolio",
        tag: "CREATIVIDAD",
        tagEn: "CREATIVITY",
        title: "Sitios Premium",
        titleEn: "Premium Sites",
        features: ["Identidad visual", "Experiencias inmersivas", "WebGL & 3D", "Interacciones únicas"],
        featuresEn: ["Visual identity", "Immersive experiences", "WebGL & 3D", "Unique interactions"],
        gallery: [
            { label: "Presentación", labelEn: "Showcase", gradient: "linear-gradient(135deg, #18181b 0%, #3f3f46 50%, #f59e0b 100%)" },
            { label: "Galería", labelEn: "Gallery", gradient: "linear-gradient(135deg, #1c1917 0%, #44403c 50%, #d97706 100%)" },
            { label: "About", labelEn: "About", gradient: "linear-gradient(135deg, #0f0e0d 0%, #292524 50%, #ea580c 100%)" },
            { label: "Contacto", labelEn: "Contact", gradient: "linear-gradient(135deg, #171412 0%, #3b3028 50%, #f97316 100%)" },
        ],
    },
];

/* ─── Mockup screen for gallery slides ─── */

function GalleryMockupScreen({ gradient, label }: { gradient: string; label: string }) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: gradient,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
        }}>
            {/* Browser chrome */}
            <div style={{
                padding: "12px 16px",
                display: "flex",
                gap: "6px",
                alignItems: "center",
                background: "rgba(0,0,0,0.3)",
                flexShrink: 0,
            }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.1)", marginLeft: 16, maxWidth: 260 }} />
            </div>

            {/* Page wireframe content */}
            <div style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Nav */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: 40, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ display: "flex", gap: "16px" }}>
                        <div style={{ width: 36, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)" }} />
                        <div style={{ width: 36, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)" }} />
                        <div style={{ width: 36, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)" }} />
                    </div>
                </div>

                {/* Hero block */}
                <div style={{
                    flex: 1,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.06)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                    padding: "32px",
                }}>
                    <div style={{ height: 14, width: "50%", borderRadius: 7, background: "rgba(255,255,255,0.18)" }} />
                    <div style={{ height: 8, width: "70%", borderRadius: 4, background: "rgba(255,255,255,0.09)" }} />
                    <div style={{ height: 8, width: "40%", borderRadius: 4, background: "rgba(255,255,255,0.06)" }} />
                    <div style={{
                        marginTop: 12,
                        width: 80,
                        height: 28,
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.12)",
                        border: "0.5px solid rgba(255,255,255,0.15)",
                    }} />
                </div>

                {/* Cards row */}
                <div style={{ display: "flex", gap: "12px" }}>
                    {[1, 2, 3].map(n => (
                        <div key={n} style={{
                            flex: 1,
                            height: 65,
                            borderRadius: 10,
                            background: "rgba(255,255,255,0.04)",
                            border: "0.5px solid rgba(255,255,255,0.06)",
                            padding: "12px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            gap: "5px",
                        }}>
                            <div style={{ height: 5, width: "65%", borderRadius: 3, background: "rgba(255,255,255,0.1)" }} />
                            <div style={{ height: 5, width: "40%", borderRadius: 3, background: "rgba(255,255,255,0.05)" }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Section label overlay */}
            <div style={{
                position: "absolute",
                bottom: 16,
                left: 20,
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
            }}>
                {label}
            </div>
        </div>
    );
}

/* ─── Project Modal with Carousel ─── */

function ProjectModal({
    project,
    language,
    t,
    onClose,
}: {
    project: typeof projects[0];
    language: string;
    t: (es: string, en: string) => string;
    onClose: () => void;
}) {
    const [isPaused, setIsPaused] = useState(false);
    
    // Duplicate for seamless infinite marquee
    const marqueeItems = [...project.gallery, ...project.gallery];

    // Keyboard nav
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                padding: "2rem",
                animation: "modalFadeIn 0.3s ease",
            }}
        >
            {/* Modal card */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: 1000,
                    maxHeight: "90vh",
                    background: "var(--color-bg-secondary)",
                    border: "0.5px solid var(--color-border)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5)",
                    animation: "modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Header */}
                <div style={{
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "0.5px solid var(--color-border)",
                    flexShrink: 0,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "2.5px",
                            textTransform: "uppercase",
                            color: "var(--color-brand)",
                        }}>
                            {t(project.tag, project.tagEn)}
                        </span>
                        <span style={{ color: "var(--color-text-muted)", fontSize: "11px" }}>—</span>
                        <span style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "var(--color-text-primary)",
                        }}>
                            {t(project.title, project.titleEn)}
                        </span>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            border: "0.5px solid var(--color-border)",
                            background: "var(--color-bg-glass)",
                            color: "var(--color-text-secondary)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--color-brand)";
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.borderColor = "var(--color-brand)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--color-bg-glass)";
                            e.currentTarget.style.color = "var(--color-text-secondary)";
                            e.currentTarget.style.borderColor = "var(--color-border)";
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Marquee area */}
                <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    style={{
                        position: "relative",
                        flex: 1,
                        minHeight: 0,
                        padding: "1.5rem 0",
                        display: "flex",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Shadow overlays for smooth fade edges */}
                    <div style={{
                        position: "absolute",
                        top: 0, left: 0, bottom: 0, width: "10%",
                        background: "linear-gradient(to right, var(--color-bg-secondary), transparent)",
                        zIndex: 10,
                        pointerEvents: "none"
                    }} />
                    <div style={{
                        position: "absolute",
                        top: 0, right: 0, bottom: 0, width: "10%",
                        background: "linear-gradient(to left, var(--color-bg-secondary), transparent)",
                        zIndex: 10,
                        pointerEvents: "none"
                    }} />

                    {/* Slide track */}
                    <div style={{
                        display: "flex",
                        gap: "24px",
                        width: "max-content",
                        padding: "0 24px",
                        animation: "marqueeScroll 25s linear infinite",
                        animationPlayState: isPaused ? "paused" : "running",
                    }}>
                        {marqueeItems.map((g, i) => (
                            <div key={i} style={{ 
                                width: "650px", 
                                height: "420px", 
                                flexShrink: 0,
                                borderRadius: "16px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.05)"
                            }}>
                                <GalleryMockupScreen
                                    gradient={g.gradient}
                                    label={language === "en" ? g.labelEn : g.label}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer instructions */}
                <div style={{
                    padding: "1rem 1.5rem",
                    borderTop: "0.5px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}>
                    <span style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "var(--color-text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    }}>
                        {t("Pasa el cursor para pausar", "Hover to pause")}
                    </span>
                </div>
            </div>

            {/* Modal animations */}
            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalSlideUp {
                    from { opacity: 0; transform: translateY(24px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes marqueeScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(calc(-50% - 12px)); }
                }
                @media (max-width: 768px) {
                    .marquee-item {
                        width: 80vw !important;
                        height: 320px !important;
                    }
                }
            `}</style>
        </div>
    );
}

/* ─── Full page mockup wireframe (card preview) ─── */

function PageMockup() {
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
                borderBottom: "1px solid var(--color-border)",
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
    onOpen,
}: {
    project: typeof projects[0];
    index: number;
    total: number;
    t: (es: string, en: string) => string;
    language: string;
    onOpen: () => void;
}) {
    const stickyTop = 80 + index * 16;
    const accentColor = "var(--color-brand)";

    return (
        <div style={{
            height: "100vh",
            position: "relative",
        }}>
            <div
                onClick={onOpen}
                style={{
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
                    cursor: "pointer",
                    transition: "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease",
                }}
                className="sticky-project-card"
            >

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

                        {/* "View project" hint */}
                        <div style={{
                            marginTop: "auto",
                            paddingTop: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "var(--color-brand)",
                            opacity: 0.7,
                            transition: "opacity 0.3s ease",
                        }} className="view-hint">
                            <span>{t("Ver proyecto", "View project")}</span>
                            <span style={{ fontSize: "16px", transition: "transform 0.3s ease" }} className="view-arrow">→</span>
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
    const [openProject, setOpenProject] = useState<typeof projects[0] | null>(null);

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
                        onOpen={() => setOpenProject(project)}
                    />
                ))}
            </div>

            {/* ── Modal ── */}
            {openProject && (
                <ProjectModal
                    project={openProject}
                    language={language}
                    t={t}
                    onClose={() => setOpenProject(null)}
                />
            )}

            {/* Hover + Responsive styles */}
            <style>{`
                .sticky-project-card {
                    transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
                }
                .sticky-project-card:hover {
                    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.25), 0 0 0 1px var(--color-border-brand) !important;
                    transform: translateY(-4px);
                    border-color: var(--color-border-brand) !important;
                }
                .sticky-project-card:hover .view-hint {
                    opacity: 1 !important;
                }
                .sticky-project-card:hover .view-arrow {
                    transform: translateX(4px);
                }
                .sticky-project-card:active {
                    transform: translateY(-2px) scale(0.995);
                }
                @media (max-width: 768px) {
                    .sticky-card-layout {
                        grid-template-columns: 1fr !important;
                        grid-template-rows: auto 1fr !important;
                    }
                    .sticky-card-layout > div:first-child {
                        padding: 1.5rem !important;
                        border-right: none !important;
                        border-bottom: 0.5px solid var(--color-border);
                    }
                    .sticky-card-layout > div:last-child {
                        padding: 1rem !important;
                    }
                }
            `}</style>
        </section>
    );
}
