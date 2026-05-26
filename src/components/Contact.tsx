"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Cotizador from "./Cotizador";

type ProjectType = "landing" | "ecommerce" | "webapp" | "saas" | null;
type Feature = "cms" | "auth" | "payments" | "api" | "analytics" | "multilang";
type Timeline = "fast" | "normal" | "relaxed" | null;

const BASE_PRICES: Record<NonNullable<ProjectType>, number> = {
    landing: 600,
    ecommerce: 2200,
    webapp: 3500,
    saas: 6000,
};
const FEATURE_COSTS: Record<Feature, number> = {
    cms: 300,
    auth: 400,
    payments: 500,
    api: 600,
    analytics: 200,
    multilang: 300,
};
const TIMELINE_MULT: Record<NonNullable<Timeline>, number> = {
    fast: 1.3,
    normal: 1.0,
    relaxed: 0.9,
};

export default function Contact() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    const [projectType, setProjectType] = useState<ProjectType>(null);
    const [features, setFeatures] = useState<Feature[]>([]);
    const [timeline, setTimeline] = useState<Timeline>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");

    const toggleFeature = (f: Feature) =>
        setFeatures((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

    const estimate = (): { min: number; max: number } | null => {
        if (!projectType) return null;
        const base = BASE_PRICES[projectType];
        const feat = features.reduce((sum, f) => sum + FEATURE_COSTS[f], 0);
        const mult = timeline ? TIMELINE_MULT[timeline] : 1;
        const total = (base + feat) * mult;
        return { min: Math.round(total * 0.85), max: Math.round(total * 1.15) };
    };

    const est = estimate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const typeLabel = projectType ?? "No especificado";
        const featLabel = features.join(", ") || "Ninguna";
        const priceLabel = est ? `$${est.min} - $${est.max} USD` : "No calculado";
        const msg = `Hola! Quiero cotizar mi proyecto.\n\nNombre: ${name}\nEmpresa: ${company}\nTipo: ${typeLabel}\nFuncionalidades: ${featLabel}\nPresupuesto estimado: ${priceLabel}`;
        window.open(`https://wa.me/+1234567890?text=${encodeURIComponent(msg)}`, "_blank");
    };

    return (
        <section id="contacto" className="contact">
            <div className="container">
                <div className="contact-grid">
                    {/* Left: info */}
                    <div className="reveal" ref={(el) => setRef(el, 30)}>
                        <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>
                            {t("Trabajemos juntos", "Let's work together")}
                        </p>
                        <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
                            {t("¿Tenés un proyecto en mente?", "Got a project in mind?")}
                        </h2>
                        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                            {t(
                                "Contanos qué necesitás y te respondemos en menos de 24 horas con una propuesta personalizada.",
                                "Tell us what you need and we'll get back to you in less than 24 hours with a personalized proposal."
                            )}
                        </p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <label>{t("Email", "Email")}</label>
                                <a href="mailto:hola@svsolutions.com">hola@svsolutions.com</a>
                            </div>
                            <div className="contact-item">
                                <label>WhatsApp</label>
                                <a href="https://wa.me/+1234567890" target="_blank" rel="noopener noreferrer">
                                    +1 (234) 567‑890
                                </a>
                            </div>
                            <div className="contact-item">
                                <label>Instagram</label>
                                <a href="https://instagram.com/svsolutions" target="_blank" rel="noopener noreferrer">
                                    @svsolutions
                                </a>
                            </div>
                        </div>
                    </div>

<<<<<<< HEAD
                <div id="cotiza" className="quote-card reveal-delay" ref={(el) => setRef(el, 1)}>
                    <Cotizador />
=======
                    {/* Right: quoter */}
                    <div className="reveal-delay" ref={(el) => setRef(el, 31)}>
                        <form className="quoter" onSubmit={handleSubmit}>
                            <h3>{t("Cotizador rápido", "Quick quoter")}</h3>
                            <p className="quoter-subtitle">
                                {t("Obtené una estimación al instante.", "Get an instant estimate.")}
                            </p>

                            <div className="quoter-section">
                                <p className="quoter-section-title">{t("Tipo de proyecto", "Project type")}</p>
                                <div className="quoter-options">
                                    {([
                                        ["landing", t("Landing page", "Landing page")],
                                        ["ecommerce", t("E-commerce", "E-commerce")],
                                        ["webapp", t("App web", "Web app")],
                                        ["saas", "SaaS"],
                                    ] as const).map(([val, label]) => (
                                        <button
                                            type="button" key={val}
                                            className={`quoter-chip${projectType === val ? " selected" : ""}`}
                                            onClick={() => setProjectType(projectType === val ? null : val)}
                                        >{label}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="quoter-section">
                                <p className="quoter-section-title">{t("Funcionalidades", "Features")}</p>
                                <div className="quoter-options">
                                    {([
                                        ["cms", t("CMS / Blog", "CMS / Blog")],
                                        ["auth", t("Login / Auth", "Login / Auth")],
                                        ["payments", t("Pagos en línea", "Online payments")],
                                        ["api", "API / Integraciones"],
                                        ["analytics", "Analytics"],
                                        ["multilang", t("Multi-idioma", "Multi-language")],
                                    ] as const).map(([val, label]) => (
                                        <button
                                            type="button" key={val}
                                            className={`quoter-chip${features.includes(val) ? " selected" : ""}`}
                                            onClick={() => toggleFeature(val)}
                                        >{label}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="quoter-section">
                                <p className="quoter-section-title">{t("Tiempo de entrega", "Timeline")}</p>
                                <div className="quoter-options">
                                    {([
                                        ["fast", t("Urgente (−4 sem)", "Rush (−4 wks)")],
                                        ["normal", t("Normal (4‑8 sem)", "Normal (4‑8 wks)")],
                                        ["relaxed", t("Sin apuro (8+ sem)", "Relaxed (8+ wks)")],
                                    ] as const).map(([val, label]) => (
                                        <button
                                            type="button" key={val}
                                            className={`quoter-chip${timeline === val ? " selected" : ""}`}
                                            onClick={() => setTimeline(timeline === val ? null : val)}
                                        >{label}</button>
                                    ))}
                                </div>
                            </div>

                            {est && (
                                <div className="quoter-estimate">
                                    <div>
                                        <p className="quoter-estimate-label">{t("Estimación", "Estimate")}</p>
                                        <p className="quoter-estimate-price">${est.min.toLocaleString()} USD</p>
                                        <p className="quoter-estimate-range">hasta ${est.max.toLocaleString()} USD</p>
                                    </div>
                                    <span style={{ fontSize: "2rem" }}>💡</span>
                                </div>
                            )}

                            <div style={{ marginTop: "1.75rem" }}>
                                <p className="quoter-section-title" style={{ marginBottom: "0.75rem" }}>
                                    {t("Tus datos", "Your info")}
                                </p>
                                <div className="quoter-name-row">
                                    <input className="quoter-input" placeholder={t("Tu nombre", "Your name")} value={name} onChange={(e) => setName(e.target.value)} required />
                                    <input className="quoter-input" placeholder={t("Empresa (opcional)", "Company (optional)")} value={company} onChange={(e) => setCompany(e.target.value)} />
                                </div>
                                <input className="quoter-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            <button type="submit" className="quoter-submit">
                                {t("Enviar por WhatsApp →", "Send via WhatsApp →")}
                            </button>
                        </form>
                    </div>
>>>>>>> 9278db4 (Actualizacion de diseno)
                </div>
            </div>
        </section>
    );
}
