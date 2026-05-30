"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "./BentoGrid.module.css";

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

/* ───────────────────────────────────────────────
   Sub-components for individual card visuals
   ─────────────────────────────────────────────── */

// Lighthouse-style score gauges (Web Design card)
function LighthouseGauge({ score, label, delay }: { score: number; label: string; delay: number }) {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 90 ? '#0cce6b' : score >= 50 ? '#ffa400' : '#ff4e42';

    return (
        <div className={styles.lighthouseGauge} style={{ '--gauge-delay': `${delay}s` } as React.CSSProperties}>
            <svg width="68" height="68" viewBox="0 0 68 68" className={styles.lighthouseRing}>
                {/* Track */}
                <circle cx="34" cy="34" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                {/* Score arc */}
                <circle
                    cx="34" cy="34" r={radius} fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    className={styles.lighthouseArc}
                    style={{
                        '--target-offset': offset,
                        '--circumference': circumference,
                        '--gauge-color': color,
                    } as React.CSSProperties}
                    transform="rotate(-90 34 34)"
                />
            </svg>
            <span className={styles.lighthouseScore} style={{ color }}>{score}</span>
            <span className={styles.lighthouseLabel}>{label}</span>
        </div>
    );
}

function BrowserMockup() {
    return (
        <div className={styles.lighthouseContainer}>
            <div className={styles.lighthouseHeader}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffa400' }}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span className={styles.lighthouseTitle}>PageSpeed Insights</span>
            </div>
            <div className={styles.lighthouseGauges}>
                <LighthouseGauge score={98} label="Performance" delay={0} />
                <LighthouseGauge score={100} label="SEO" delay={0.3} />
                <LighthouseGauge score={97} label="Accessibility" delay={0.6} />
            </div>
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
                    background: 'var(--color-bg-glass)',
                    border: '0.5px solid var(--color-border)',
                    borderRadius: '999px',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 500,
                }}>{label}</span>
            ))}
        </div>
    );
}

// Branding metrics grid
function BrandingMetrics({ value1, label1, value2, label2 }: { value1: string; label1: string; value2: string; label2: string }) {
    const metricStyle: React.CSSProperties = {
        background: 'var(--color-bg-secondary)',
        borderRadius: '10px',
        padding: '10px 14px',
    };
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px', marginBottom: '16px' }}>
            <div style={metricStyle}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{value1}</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{label1}</div>
            </div>
            <div style={metricStyle}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{value2}</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{label2}</div>
            </div>
        </div>
    );
}

// Automation timeline animated display
function AutomationTimeline({ steps }: { steps: { color: string; text: string }[] }) {
    return (
        <div className={styles.automationTimeline}>
            <div className={styles.automationTrack}>
                <div className={styles.automationProgress} />
            </div>
            {steps.map((step, i) => (
                <div key={i} className={styles.automationStep} style={{ "--step-index": i } as React.CSSProperties}>
                    <div className={styles.automationDot} style={{ "--step-color": step.color } as React.CSSProperties}>
                        <div className={styles.automationPulse} />
                    </div>
                    <span className={styles.automationText}>{step.text}</span>
                </div>
            ))}
        </div>
    );
}

// IA terminal mockup
function IATerminal({ line1, line2, line3 }: { line1: string; line2: string; line3: string }) {
    return (
        <div style={{
            background: 'var(--color-bg-secondary)',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '16px',
            marginBottom: '16px',
            fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace',
            fontSize: '12px',
            lineHeight: '1.8',
        }}>
            <div>
                <span style={{ color: 'var(--color-brand)' }}>→ </span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{line1}</span>
            </div>
            <div>
                <span style={{ color: 'var(--color-brand)' }}>✓ </span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{line2}</span>
            </div>
            <div>
                <span style={{ color: 'var(--color-text-muted)' }}>{line3}</span>
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
            className={styles.bentoCardWrapper}
            onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
            }}
        >
            {/* Ambient radial blur glow behind the card on the outside */}
            <div className={styles.glowOverlay} />
            
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
                        {t("Soluciones especializadas para cada desafío", "Specialized solutions for every challenge")}
                    </h2>
                </div>

                {/* ── Row 1: Web Design (2fr) + Branding (1fr) ── */}
                <div className={styles.bentoRow1}>
                    {/* Card 1 — Web Design & Dev */}
                    <AnimatedBentoCard>
                        <div className={styles.bentoCard}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● WEB DESIGN & DEV
                            </div>
                            <h3 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Sitios Web que Convierten", "Websites that Convert")}
                            </h3>
                            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                {t(
                                    "Landings de alto rendimiento, portafolios profesionales y aplicaciones web. Diseñadas para SEO, optimizadas para vender.",
                                    "High-performance landings, professional portfolios, and web applications. Designed for SEO, optimized to sell."
                                )}
                            </p>
                            <BrowserMockup />
                        </div>
                    </AnimatedBentoCard>

                    {/* Card 2 — Branding */}
                    <AnimatedBentoCard>
                        <div className={styles.bentoCard}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● BRANDING
                            </div>
                            <h3 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Marca Visual Completa", "Complete Visual Brand")}
                            </h3>
                            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                {t(
                                    "Logotipos, color, tipografía y guías que comunican sin explicarse. Coherencia en todas las plataformas.",
                                    "Logos, color, typography, and guidelines that communicate without explanation. Consistency across all platforms."
                                )}
                            </p>
                            <BrandingMetrics
                                value1="360°"
                                label1={t("Identidad", "Identity")}
                                value2="100%"
                                label2={t("A medida", "Custom")}
                            />
                        </div>
                    </AnimatedBentoCard>
                </div>

                {/* ── Row 2: E-commerce + Automatización + IA (1fr each) ── */}
                <div className={styles.bentoRow2}>
                    {/* Card 3 — E-commerce */}
                    <AnimatedBentoCard>
                        <div className={styles.bentoCard}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● E-COMMERCE
                            </div>
                            <CartIcon />
                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Tiendas Online Rentables", "Profitable Online Stores")}
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                {t(
                                    "Integración de pagos, checkout optimizado y reportes de venta. Construidas para cerrar transacciones.",
                                    "Payment integration, optimized checkout, and sales reports. Built to close transactions."
                                )}
                            </p>
                            <StackPills items={["Shopify", "WooCommerce", "Stripe", "Mercado Pago", "Next.js", "Custom API"]} />
                        </div>
                    </AnimatedBentoCard>

                    {/* Card 4 — Automatización */}
                    <AnimatedBentoCard>
                        <div className={styles.bentoCard}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● {t("AUTOMATIZACIÓN", "AUTOMATION")}
                            </div>
                            <LightningIcon />
                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Procesos sin fricción", "Frictionless processes")}
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                {t(
                                    "Automatiza formularios, email, CRM y pagos. Reduce trabajo manual, aumenta eficiencia.",
                                    "Automate forms, email, CRM, and payments. Reduce manual work, increase efficiency."
                                )}
                            </p>
                            <AutomationTimeline steps={automationSteps} />
                        </div>
                    </AnimatedBentoCard>

                    {/* Card 5 — IA */}
                    <AnimatedBentoCard>
                        <div className={styles.bentoCard}>
                            <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.75rem', fontWeight: 500 }}>
                                ● IA
                            </div>
                            <BrainIcon />
                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                                {t("Potencia tu producto con IA", "Power your product with AI")}
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                {t(
                                    "Chatbots inteligentes, análisis automático y atención al cliente 24/7. Integración OpenAI, Claude o modelos custom.",
                                    "Smart chatbots, automatic analysis, and 24/7 customer support. OpenAI, Claude, or custom model integration."
                                )}
                            </p>
                            <IATerminal
                                line1={t("> Entrenando asistente de ventas con tu catálogo...", "> Training sales assistant with your catalog...")}
                                line2={t("✔ Modelo listo. Tasa de conversión proyectada: +35%", "✔ Model ready. Projected conversion rate: +35%")}
                                line3={t("// Despliegue de IA completado", "// AI deployment completed")}
                            />
                        </div>
                    </AnimatedBentoCard>
                </div>
            </div>
        </section>
    );
}
