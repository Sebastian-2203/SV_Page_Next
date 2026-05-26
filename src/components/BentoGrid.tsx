"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

const CartIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#a1a1aa", marginBottom: "16px", marginTop: "8px" }}>
        <circle cx="8" cy="21" r="1"/>
        <circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
);

const LightningIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#a1a1aa", marginBottom: "16px", marginTop: "8px" }}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
);

const BrainIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#a1a1aa", marginBottom: "16px", marginTop: "8px" }}>
        <path d="M9.5 2c-1.4 0-2.5 1.1-2.5 2.5 0 .2.1.4.1.6C5.4 5.9 4 7.6 4 9.5c0 1.8 1 3.4 2.6 4.3-.2.4-.2.8-.2 1.2 0 2.2 1.8 4 4 4h3.1c2.2 0 4-1.8 4-4 0-.4-.1-.8-.2-1.2 1.6-.9 2.6-2.5 2.6-4.3 0-1.9-1.4-3.6-3.1-4.4.1-.2.1-.4.1-.6C16.9 3.1 15.8 2 14.4 2 13 2 12 3 12 3s-1-1-2.5-1z"/>
        <path d="M12 3v16"/>
        <path d="M8 9h8"/>
        <path d="M9 14h6"/>
    </svg>
);

const IdeaPill = ({ color, text }: { color: 'blue' | 'purple' | 'green' | 'orange' | 'teal', text: string }) => {
    const bgMap = {
        blue: '#0F3B82',
        purple: '#2E1963',
        green: '#114D1C',
        orange: '#754A0D',
        teal: '#0C4A3A'
    };
    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: bgMap[color],
            padding: '6px 14px',
            borderRadius: '999px',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 500,
            marginTop: 'auto',
            width: 'fit-content',
        }}>
            <span style={{ fontSize: '14px' }}>💡</span> {text}
        </div>
    );
};

/* ───────────────────────────────────────────────
   Sub-components for individual card visuals
   ─────────────────────────────────────────────── */

// Browser mockup with shimmer animation (Web Design card)
function BrowserMockup() {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '10px',
            padding: '12px',
            marginTop: '16px',
            marginBottom: '16px',
        }}>
            {/* Browser chrome bar */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', alignItems: 'center' }}>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)' }} />
            </div>
            {/* Text lines */}
            <div style={{
                height: 6,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.08)',
                width: '100%',
                marginBottom: 8,
            }} />
            <div style={{
                height: 6,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.05)',
                width: '80%',
                marginBottom: 12,
            }} />
            {/* Hero block */}
            <div style={{
                height: 36,
                borderRadius: 6,
                background: 'rgba(74, 144, 217, 0.2)',
            }} />
        </div>
    );
}

// Stack pills row
function StackPills({ items }: { items: string[] }) {
    return (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px', marginBottom: '16px' }}>
            {items.map((label) => (
                <span key={label} style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '0.5px solid rgba(255,255,255,0.1)',
                    borderRadius: '999px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                }}>{label}</span>
            ))}
        </div>
    );
}

// Branding metrics grid
function BrandingMetrics({ label1, label2 }: { label1: string; label2: string }) {
    const metricStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '10px',
        padding: '10px 14px',
    };
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px', marginBottom: '16px' }}>
            <div style={metricStyle}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>12+</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{label1}</div>
            </div>
            <div style={metricStyle}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>100%</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{label2}</div>
            </div>
        </div>
    );
}

// Automation timeline static display
function AutomationTimeline({ steps }: { steps: { color: string; text: string }[] }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px', marginBottom: '16px' }}>
            {steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: step.color,
                        flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{step.text}</span>
                </div>
            ))}
        </div>
    );
}

// IA terminal mockup
function IATerminal({ line1, line2, line3 }: { line1: string; line2: string; line3: string }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '16px',
            marginBottom: '16px',
            fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace',
            fontSize: '12px',
            lineHeight: '1.8',
        }}>
            <div>
                <span style={{ color: '#4a90d9' }}>→ </span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{line1}</span>
            </div>
            <div>
                <span style={{ color: '#4a90d9' }}>✓ </span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{line2}</span>
            </div>
            <div>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{line3}</span>
            </div>
        </div>
    );
}

/* ───────────────────────────────────────────────
   Animated Wrapper for Cards
   ─────────────────────────────────────────────── */

function AnimatedBentoCard({ children }: { children: React.ReactNode }) {
    return (
        <div 
            style={{
                position: "relative",
                overflow: "visible", // Allows the glowing blur to expand outside card borders
                height: "100%",
                display: "flex",
                flexDirection: "column"
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
                borderRadius: "var(--radius-lg, 16px)",
                transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }} />
            
            {/* Inner card content wrapper */}
            <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
            </div>
        </div>
    );
}

/* ───────────────────────────────────────────────
   Main BentoGrid component
   ─────────────────────────────────────────────── */

export default function BentoGrid() {
    const { t } = useLanguage();

    const automationSteps = [
        { color: '#1D9E75',  text: t('Recibe formulario', 'Receive form') },
        { color: '#1D9E75',  text: t('Notifica en Slack', 'Slack notification') },
        { color: '#4a90d9', text: t('CRM actualizado', 'CRM updated') },
    ];

    return (
        <section id="servicios" style={{
            padding: '6rem 2rem',
            background: 'var(--color-bg-primary)',
            borderTop: '0.5px solid var(--color-border)',
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* ── Section Header ── */}
                <div style={{ marginBottom: '4rem' }}>
                    <p style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '2.5px',
                        textTransform: 'uppercase',
                        color: 'var(--color-brand)',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <span style={{ width: 24, height: 1, background: 'var(--color-border-brand)', display: 'inline-block' }} />
                        {t("Capacidades", "Capabilities")}
                    </p>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.2,
                        maxWidth: 600,
                        color: 'var(--color-text-primary)',
                    }}>
                        {t("Ingeniería y diseño para productos premium.", "Engineering and design for premium products.")}
                    </h2>
                </div>

                {/* ── Row 1: Web Design (2fr) + Branding (1fr) ── */}
                <div className="bento-row1" style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '14px',
                    marginBottom: '14px',
                }}>
                    {/* Card 1 — Web Design & Dev */}
                    <AnimatedBentoCard>
                        <div className="bento-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            overflow: 'hidden',
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● WEB DESIGN & DEV
                            </div>
                            <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Sitios Premium.", "Premium Sites.")}
                            </h3>
                            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                                {t(
                                    "Landings, corporativos y portafolios construidos para impresionar.",
                                    "Landings, corporate, and portfolios built to impress."
                                )}
                            </p>
                            <BrowserMockup />
                            <IdeaPill color="blue" text={t("Idea: agrega un gif o video loop de uno de tus proyectos aquí", "Idea: add a gif or video loop of one of your projects here")} />
                        </div>
                    </AnimatedBentoCard>

                    {/* Card 2 — Branding */}
                    <AnimatedBentoCard>
                        <div className="bento-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            overflow: 'hidden',
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● BRANDING
                            </div>
                            <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Sistemas Visuales.", "Visual Systems.")}
                            </h3>
                            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                                {t(
                                    "Identidad que comunica.",
                                    "Identity that communicates."
                                )}
                            </p>
                            <BrandingMetrics
                                label1={t("Marcas", "Brands")}
                                label2={t("Custom", "Custom")}
                            />
                            <IdeaPill color="purple" text={t("Muestra tus logos reales o números reales", "Show your real logos or real numbers")} />
                        </div>
                    </AnimatedBentoCard>
                </div>

                {/* ── Row 2: E-commerce + Automatización + IA (1fr each) ── */}
                <div className="bento-row2" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '14px',
                }}>
                    {/* Card 3 — E-commerce */}
                    <AnimatedBentoCard>
                        <div className="bento-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            overflow: 'hidden',
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● E-COMMERCE
                            </div>
                            <CartIcon />
                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Tiendas que escalan.", "Stores that scale.")}
                            </h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                                {t(
                                    "Arquitecturas para máxima conversión.",
                                    "Architectures for maximum conversion."
                                )}
                            </p>
                            <StackPills items={["Stripe", "Next.js", "Custom"]} />
                            <IdeaPill color="green" text={t("Agrega el stack real que usas", "Add the real stack you use")} />
                        </div>
                    </AnimatedBentoCard>

                    {/* Card 4 — Automatización */}
                    <AnimatedBentoCard>
                        <div className="bento-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            overflow: 'hidden',
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● {t("AUTOMATIZACIÓN", "AUTOMATION")}
                            </div>
                            <LightningIcon />
                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Menos clics.", "Fewer clicks.")}
                            </h3>
                            <AutomationTimeline steps={automationSteps} />
                            <IdeaPill color="orange" text={t("Un mini-flow animado funciona muy bien aquí", "An animated mini-flow works great here")} />
                        </div>
                    </AnimatedBentoCard>

                    {/* Card 5 — IA */}
                    <AnimatedBentoCard>
                        <div className="bento-card" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            overflow: 'hidden',
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● IA
                            </div>
                            <BrainIcon />
                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Software inteligente.", "Smart software.")}
                            </h3>
                            <IATerminal
                                line1={t("Analizando consulta...", "Analyzing query...")}
                                line2={t("Respuesta generada", "Response generated")}
                                line3={t("// integrado en tu web", "// integrated into your web")}
                            />
                            <IdeaPill color="teal" text={t("Un chat demo en vivo sería un wow", "A live demo chat would be a wow factor")} />
                        </div>
                    </AnimatedBentoCard>
                </div>

            </div>

            {/* Hover + Responsive styles */}
            <style>{`
                .bento-card {
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .bento-card:hover {
                    border-color: rgba(74,144,217,0.4) !important;
                    box-shadow: 0 10px 40px -10px rgba(74,144,217,0.08);
                    transform: translateY(-2px);
                }
                @media (max-width: 768px) {
                    .bento-row1 {
                        grid-template-columns: 1fr !important;
                    }
                    .bento-row2 {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
