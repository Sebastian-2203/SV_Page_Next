"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

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
        }}>
            {/* Browser chrome bar */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.08)', marginLeft: 8 }} />
            </div>
            {/* Hero block */}
            <div style={{
                height: 60,
                borderRadius: 8,
                background: 'linear-gradient(135deg, rgba(74,144,217,0.15), rgba(74,144,217,0.05))',
                marginBottom: 8,
                animation: 'shimmer 2.5s ease-in-out infinite',
            }} />
            {/* Text lines */}
            <div style={{
                height: 8,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.08)',
                width: '80%',
                marginBottom: 6,
                animation: 'shimmer 2s ease-in-out infinite',
            }} />
            <div style={{
                height: 8,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.05)',
                width: '60%',
                animation: 'shimmer 2s ease-in-out infinite',
                animationDelay: '0.3s',
            }} />
        </div>
    );
}

// Stack pills row
function StackPills({ items }: { items: string[] }) {
    return (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '16px' }}>
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

// Automation timeline with staggered fade-in
function AutomationTimeline({ steps }: { steps: { done: boolean; text: string }[] }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '16px' }}>
            {steps.map((step, i) => (
                <React.Fragment key={i}>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        animation: 'fadeInLine 0.5s ease forwards',
                        animationDelay: `${0.1 + i * 0.4}s`,
                        opacity: 0,
                    }}>
                        <div style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: step.done ? '#1D9E75' : 'rgba(255,255,255,0.2)',
                            flexShrink: 0,
                        }} />
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>{step.text}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <div style={{
                            height: 14,
                            width: 1,
                            background: 'rgba(255,255,255,0.1)',
                            marginLeft: 2.5,
                            animation: 'fadeInLine 0.5s ease forwards',
                            animationDelay: `${0.3 + i * 0.4}s`,
                            opacity: 0,
                        }} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

// IA terminal with line-by-line fade-in
function IATerminal({ line1, line2, line3 }: { line1: string; line2: string; line3: string }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '12px',
            fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace',
            fontSize: '12px',
            lineHeight: '1.8',
        }}>
            <div style={{ animation: 'fadeInLine 0.5s ease forwards', animationDelay: '0.2s', opacity: 0 }}>
                <span style={{ color: '#4a90d9' }}>→ </span>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{line1}</span>
            </div>
            <div style={{ animation: 'fadeInLine 0.5s ease forwards', animationDelay: '0.6s', opacity: 0 }}>
                <span style={{ color: '#1D9E75' }}>✓ </span>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{line2}</span>
            </div>
            <div style={{ animation: 'fadeInLine 0.5s ease forwards', animationDelay: '1.0s', opacity: 0 }}>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>{line3}</span>
            </div>
        </div>
    );
}

/* ───────────────────────────────────────────────
   Main BentoGrid component
   ─────────────────────────────────────────────── */

export default function BentoGrid() {
    const { t } = useLanguage();

    // Automation steps data
    const automationSteps = [
        { done: true,  text: t('Formulario recibido', 'Form received') },
        { done: true,  text: t('Notificación en Slack', 'Slack notification') },
        { done: false, text: t('CRM actualizado', 'CRM updated') },
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
                    {/* Card 1 — Web Design & Dev (highlighted) */}
                    <div className="bento-card" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '0.5px solid #4a90d9',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'border-color 0.2s',
                    }}>
                        <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                            ● WEB DESIGN & DEV
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                            {t("Sitios Premium.", "Premium Sites.")}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                            {t(
                                "Landings, corporativos y portafolios. Construidos para impresionar, optimizados para convertir.",
                                "Landings, corporate, and portfolios. Built to impress, optimized to convert."
                            )}
                        </p>
                        <BrowserMockup />
                        <StackPills items={["Next.js", "React", "Tailwind", "Framer Motion"]} />
                    </div>

                    {/* Card 2 — Branding */}
                    <div className="bento-card" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '0.5px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'border-color 0.2s',
                    }}>
                        <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                            ● BRANDING
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                            {t("Sistemas Visuales.", "Visual Systems.")}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                            {t(
                                "Identidad que comunica sin tener que explicarse.",
                                "Identity that communicates without having to be explained."
                            )}
                        </p>
                        <BrandingMetrics
                            label1={t("Marcas creadas", "Brands created")}
                            label2={t("Diseño custom", "Custom design")}
                        />
                    </div>
                </div>

                {/* ── Row 2: E-commerce + Automatización + IA (1fr each) ── */}
                <div className="bento-row2" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '14px',
                }}>
                    {/* Card 3 — E-commerce */}
                    <div className="bento-card" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '0.5px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'border-color 0.2s',
                    }}>
                        <div style={{ fontSize: '28px', color: 'var(--color-brand)', marginBottom: '10px', lineHeight: 1 }}>◈</div>
                        <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                            ● E-COMMERCE
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                            {t("Tiendas que escalan.", "Stores that scale.")}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                            {t(
                                "Arquitecturas de comercio diseñadas para máxima conversión.",
                                "Commerce architectures designed for maximum conversion."
                            )}
                        </p>
                        <StackPills items={["Stripe", "MercadoPago", "Next.js", "Custom"]} />
                    </div>

                    {/* Card 4 — Automatización */}
                    <div className="bento-card" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '0.5px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'border-color 0.2s',
                    }}>
                        <div style={{ fontSize: '28px', color: 'var(--color-brand)', marginBottom: '10px', lineHeight: 1 }}>⬢</div>
                        <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                            ● {t("AUTOMATIZACIÓN", "AUTOMATION")}
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                            {t("Menos clics.", "Fewer clicks.")}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                            {t(
                                "Zapier, Make, y APIs custom para workflows inteligentes.",
                                "Zapier, Make, and custom APIs for smart workflows."
                            )}
                        </p>
                        <AutomationTimeline steps={automationSteps} />
                    </div>

                    {/* Card 5 — IA */}
                    <div className="bento-card" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '0.5px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'border-color 0.2s',
                    }}>
                        <div style={{ fontSize: '28px', color: 'var(--color-brand)', marginBottom: '10px', lineHeight: 1 }}>◭</div>
                        <div style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', fontWeight: 500 }}>
                            ● IA
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>
                            {t("Software inteligente.", "Smart software.")}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                            {t(
                                "LLMs, agentes e integraciones de IA en tu producto.",
                                "LLMs, agents, and AI integrations in your product."
                            )}
                        </p>
                        <IATerminal
                            line1={t("Analizando consulta...", "Analyzing query...")}
                            line2={t("Respuesta generada", "Response generated")}
                            line3={t("// integrado en tu sitio", "// integrated into your site")}
                        />
                    </div>
                </div>

            </div>

            {/* Hover + Responsive styles */}
            <style>{`
                .bento-card:hover {
                    border-color: rgba(74,144,217,0.3) !important;
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
