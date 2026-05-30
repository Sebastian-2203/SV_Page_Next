"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "./PortfolioSection.module.css";


type Lang = "es" | "en";

/* ─── Project data with gallery screens ─── */

interface GalleryItem {
    label: string;
    labelEn: string;
    gradient?: string;
    image?: string;
}

interface Screen {
    id: string;
    label: string;
    labelEn: string;
    render: (lang: Lang) => React.ReactNode;
}

interface Project {
    id: string;
    tag: string;
    tagEn: string;
    title: string;
    titleEn: string;
    features: string[];
    featuresEn: string[];
    thumbnail?: string;
    gallery: GalleryItem[];
    /* Optional: interactive multi-screen mockups (live React components) */
    interactive?: boolean;
    screens?: Screen[];
    /* Optional: tech stack chips + external link */
    tech?: string[];
    link?: string;
}

const projects: Project[] = [
    {
        id: "overflod",
        tag: "DISEÑO Y PRODUCCIÓN",
        tagEn: "DESIGN & PRINT",
        title: "Overflod Design",
        titleEn: "Overflod Design",
        features: [
            "Plataforma e-commerce",
            "Catálogo digital vibrante",
            "Seguimiento de pedidos",
            "Branding corporativo"
        ],
        featuresEn: [
            "E-commerce platform",
            "Vibrant digital catalog",
            "Order tracking system",
            "Corporate branding"
        ],
        thumbnail: "/images/overflod-1.png",
        gallery: [
            { label: "Página de Inicio", labelEn: "Home Page", image: "/images/overflod-1.png" },
            { label: "Catálogo de Productos", labelEn: "Product Catalog", image: "/images/overflod-2.png" },
            { label: "Detalle de Producto", labelEn: "Product Detail", image: "/images/overflod-3.png" },
            { label: "Diseño & Señalización", labelEn: "Design & Signage", image: "/images/overflod-4.png" },
            { label: "Carrito & Checkout", labelEn: "Cart & Checkout", image: "/images/overflod-5.png" },
            { label: "Portal de Pedidos", labelEn: "Order Portal", image: "/images/overflod-6.png" },
        ],
    },
    {
        id: "puertoamor",
        tag: "ECOTURISMO",
        tagEn: "ECOTOURISM",
        title: "Puerto Amor Eco-Habs",
        titleEn: "Puerto Amor Eco-Habs",
        features: [
            "Sistema de reservas online",
            "Experiencia inmersiva",
            "Diseño adaptativo",
            "Galería de paisajes"
        ],
        featuresEn: [
            "Online booking system",
            "Immersive experience",
            "Responsive design",
            "Landscape gallery"
        ],
        thumbnail: "/images/puertoamor-1.png",
        gallery: [
            { label: "Inicio", labelEn: "Home", image: "/images/puertoamor-1.png" },
            { label: "Experiencias", labelEn: "Experiences", image: "/images/puertoamor-2.png" },
            { label: "Alojamiento", labelEn: "Accommodation", image: "/images/puertoamor-3.png" },
            { label: "Naturaleza", labelEn: "Nature", image: "/images/puertoamor-4.png" },
        ],
    },
    {
        id: "psicologia",
        tag: "SALUD MENTAL",
        tagEn: "MENTAL HEALTH",
        title: "Blog & Terapia Psicológica",
        titleEn: "Psychology Blog & Therapy",
        features: [
            "Blog de artículos",
            "Reserva de citas",
            "Perfil profesional",
            "Diseño empático y accesible"
        ],
        featuresEn: [
            "Article blog",
            "Appointment booking",
            "Professional profile",
            "Empathetic and accessible design"
        ],
        thumbnail: "/images/psicologia-1.png",
        gallery: [
            { label: "Inicio", labelEn: "Home", image: "/images/psicologia-1.png" },
            { label: "Diarios", labelEn: "Journals", image: "/images/psicologia-2.png" },
            { label: "Artículo", labelEn: "Article", image: "/images/psicologia-3.png" },
            { label: "Servicios", labelEn: "Services", image: "/images/psicologia-4.png" },
            { label: "Reservas", labelEn: "Booking", image: "/images/psicologia-5.png" },
            { label: "Modo admin", labelEn: "Admin Mode", image: "/images/psicologia-6.png" },
        ],
    },
    {
        id: "dashboard-financiero",
        tag: "APLICACIONES WEB",
        tagEn: "WEB APPLICATIONS",
        title: "Dashboard Financiero",
        titleEn: "Financial Dashboard",
        features: [
            "Gráficas en tiempo real",
            "Análisis de ingresos y gastos",
            "Reportes automáticos exportables",
            "APIs escalables y multi-cuenta",
        ],
        featuresEn: [
            "Real-time charts",
            "Revenue & expense analytics",
            "Automated exportable reports",
            "Scalable multi-account APIs",
        ],
        thumbnail: "/images/dashboard-1.png",
        gallery: [
            { label: "Resumen", labelEn: "Overview", image: "/images/dashboard-1.png" },
            { label: "Análisis", labelEn: "Analytics", image: "/images/dashboard-2.png" },
            { label: "Reportes", labelEn: "Reports", image: "/images/dashboard-3.png" },
        ],
    },
    {
        id: "asistente-ia",
        tag: "INTELIGENCIA ARTIFICIAL",
        tagEn: "ARTIFICIAL INTELLIGENCE",
        title: "Asistente IA",
        titleEn: "AI Assistant",
        features: [
            "IA conversacional con LLMs",
            "Consultas en lenguaje natural",
            "Insights accionables al instante",
            "Automatización de flujos",
        ],
        featuresEn: [
            "Conversational AI with LLMs",
            "Natural language queries",
            "Instant actionable insights",
            "Workflow automation",
        ],
        thumbnail: "/images/ai-1.png",
        gallery: [
            { label: "Chat", labelEn: "Chat", image: "/images/ai-1.png" },
            { label: "Insights", labelEn: "Insights", image: "/images/ai-2.png" },
            { label: "Automatización", labelEn: "Automation", image: "/images/ai-3.png" },
        ],
    }
];

/* ─── Mockup screen for gallery slides ─── */

function GalleryMockupScreen({ gradient, label, image }: { gradient?: string; label: string; image?: string }) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: image ? "var(--color-bg-secondary)" : gradient,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            border: "1px solid var(--color-border)",
        }}>
            {/* Browser chrome */}
            <div style={{
                padding: "12px 16px",
                display: "flex",
                gap: "6px",
                alignItems: "center",
                background: "rgba(0,0,0,0.3)",
                flexShrink: 0,
                borderBottom: "1px solid var(--color-border)",
                zIndex: 2,
            }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.1)", marginLeft: 16, maxWidth: 260 }} />
            </div>

            {/* Page content or real image screenshot */}
            {image ? (
                <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                    <img 
                        src={image} 
                        alt={label} 
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top center",
                            display: "block",
                        }} 
                    />
                </div>
            ) : (
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
            )}

            {/* Section label overlay */}
            <div style={{
                position: "absolute",
                bottom: 16,
                left: 20,
                fontSize: "12px",
                fontWeight: 600,
                color: image ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                background: image ? "rgba(0,0,0,0.5)" : "transparent",
                padding: image ? "4px 10px" : "0",
                borderRadius: image ? "6px" : "0",
                zIndex: 2,
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
    project: Project;
    language: string;
    t: (es: string, en: string) => string;
    onClose: () => void;
}) {
    const [isPaused, setIsPaused] = useState(false);
    const [activeScreen, setActiveScreen] = useState(0);

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
        <div onClick={onClose} className={styles.modalOverlay}>
            {/* Modal card */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={styles.modalCard}
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
                        className={styles.closeButton}
                    >
                        ✕
                    </button>
                </div>

                {/* Interactive multi-screen viewer */}
                {project.interactive && project.screens ? (
                    <>
                        <div className={styles.viewerTabs}>
                            {project.screens.map((sc, i) => (
                                <button
                                    key={sc.id}
                                    onClick={() => setActiveScreen(i)}
                                    className={`${styles.viewerTab} ${activeScreen === i ? styles.viewerTabActive : ""}`}
                                >
                                    {language === "en" ? sc.labelEn : sc.label}
                                </button>
                            ))}
                        </div>
                        <div className={styles.viewerStage}>
                            <div key={activeScreen} className={styles.viewerScreen}>
                                {project.screens[activeScreen].render(language as Lang)}
                            </div>
                        </div>
                        <div style={{
                            padding: "0 1.5rem 1.25rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "1rem",
                            flexWrap: "wrap",
                            flexShrink: 0,
                        }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                {project.tech?.map((tech) => (
                                    <span key={tech} className={styles.techTag}>{tech}</span>
                                ))}
                            </div>
                            <span style={{
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "var(--color-text-muted)",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                            }}>
                                {t("Cambia de pantalla con las pestañas", "Switch screens with the tabs")}
                            </span>
                        </div>
                    </>
                ) : (
                <>
                {/* Marquee area */}
                <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={styles.marqueeArea}
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
                    <div className={`${styles.marqueeTrack} ${isPaused ? styles.marqueeTrackPaused : ""}`}>
                        {marqueeItems.map((g, i) => (
                            <div key={i} className={styles.marqueeItem}>
                                <GalleryMockupScreen
                                    gradient={g.gradient}
                                    image={g.image}
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
                </>
                )}
            </div>
        </div>
    );
}

/* ─── Full page mockup wireframe (card preview) ─── */

function PageMockup({ image, label }: { image?: string; label?: string }) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: image ? "var(--color-bg-secondary)" : "var(--color-bg-glass)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid var(--color-border)",
        }}>
            {/* Browser chrome */}
            <div style={{
                padding: "10px 14px",
                display: "flex",
                gap: "6px",
                alignItems: "center",
                borderBottom: "1px solid var(--color-border)",
                flexShrink: 0,
                zIndex: 2,
            }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-border)" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-border)" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-border)" }} />
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: "var(--color-border)", marginLeft: 12, maxWidth: 200 }} />
            </div>

            {/* Page content or thumbnail image */}
            {image ? (
                <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                    <img 
                        src={image} 
                        alt={label || "Preview"} 
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top center",
                            display: "block",
                        }} 
                    />
                </div>
            ) : (
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
            )}
        </div>
    );
}

/* ─── Sticky Card ─── */

function StickyProjectCard({
    project,
    index,
    t,
    language,
    onOpen,
}: {
    project: Project;
    index: number;
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
                    top: stickyTop,
                    height: `calc(100vh - ${stickyTop + 40}px)`,
                    maxHeight: "600px",
                }}
                className={styles.stickyProjectCard}
            >

                {/* Full card layout */}
                <div className={styles.stickyCardLayout}>

                    {/* Left: Project Info */}
                    <div className={styles.leftProjectInfo}>
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

                        {/* Tech stack chips */}
                        {project.tech && (
                            <div className={styles.techRow}>
                                {project.tech.map((tech) => (
                                    <span key={tech} className={styles.techTag}>{tech}</span>
                                ))}
                            </div>
                        )}

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
                        }} className={styles.viewHint}>
                            <span>{t("Ver proyecto", "View project")}</span>
                            <span style={{ fontSize: "16px", transition: "transform 0.3s ease" }} className={styles.viewArrow}>→</span>
                        </div>
                    </div>

                    {/* Right: Page Mockup (live screen for interactive projects) */}
                    <div className={styles.rightPageMockup}>
                        {project.interactive && project.screens ? (
                            <div style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "12px",
                                overflow: "hidden",
                                border: "1px solid var(--color-border)",
                                boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5)",
                            }}>
                                {project.screens[0].render(language as Lang)}
                            </div>
                        ) : (
                            <PageMockup image={project.thumbnail} label={t(project.title, project.titleEn)} />
                        )}
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
        </section>
    );
}
