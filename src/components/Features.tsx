"use client";

import { useLanguage } from "./LanguageProvider";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const services = [
    {
        tag: "01 · DISEÑO",
        tagEn: "01 · DESIGN",
        icon: "✦",
        title: "Diseño web que convierte.",
        titleEn: "Web design that converts.",
        desc: "Páginas corporativas, landings y portafolios diseñados para impresionar. Analizamos tu negocio, tus competidores y tu audiencia para crear una presencia digital que no solo se ve increíble, sino que convierte visitantes en clientes reales. Cada detalle está pensado para generar confianza y acción desde el primer scroll.",
        descEn: "Corporate sites, landings and portfolios designed to impress. We analyze your business, competitors, and audience to create a digital presence that not only looks incredible but converts visitors into real clients. Every detail is crafted to build trust and drive action from the first scroll.",
        featured: false,
        bgColor: "#080c14",
    },
    {
        tag: "02 · E-COMMERCE",
        tagEn: "02 · E-COMMERCE",
        icon: "◈",
        title: "Tiendas en línea escalables.",
        titleEn: "Scalable online stores.",
        desc: "Integramos pasarelas de pago, gestión de inventario, catálogos dinámicos y experiencias de compra ultra-fluidas que maximizan tus ventas. Construimos tiendas sobre Shopify o Next.js según tu escala, con SEO optimizado desde el día uno y analíticas de conversión incluidas. Tu tienda, a tu ritmo.",
        descEn: "We integrate payment gateways, inventory management, dynamic catalogs, and ultra-smooth shopping experiences that maximize your sales. We build stores on Shopify or Next.js depending on your scale, with SEO optimized from day one and conversion analytics included.",
        featured: true,
        bgColor: "rgba(59,91,255,0.06)",
    },
    {
        tag: "03 · APPS",
        tagEn: "03 · APPS",
        icon: "⬡",
        title: "Aplicaciones web a medida.",
        titleEn: "Custom web applications.",
        desc: "CRMs, plataformas SaaS, paneles de administración y sistemas internos construidos con React, Next.js y Node.js. Arquitecturas modernas, escalables y seguras. Integramos APIs de terceros, autenticación, roles de usuario y dashboards analíticos. Desde el MVP hasta producción, con vos en cada paso.",
        descEn: "CRMs, SaaS platforms, admin panels and internal systems built with React, Next.js and Node.js. Modern, scalable, secure architectures. We integrate third-party APIs, authentication, user roles and analytics dashboards. From MVP to production, with you every step of the way.",
        featured: false,
        bgColor: "#080c14",
    },
];

export default function Services() {
    const { t } = useLanguage();
    const { setRef } = useIntersectionObserver();

    return (
        <section id="servicios" className="services">
            <div className="container">
                <div className="section-header reveal" ref={(el) => setRef(el, 10)}>
                    <p className="section-eyebrow">{t("Qué hacemos", "What we do")}</p>
                    <h2 className="section-title">
                        {t("Soluciones digitales.", "Digital solutions.")}
                    </h2>
                    <p className="section-subtitle">
                        {t(
                            "Desde el concepto hasta el lanzamiento — nos encargamos de todo.",
                            "From concept to launch — we handle everything."
                        )}
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className={`service-card reveal-item${s.featured ? " featured" : ""}`}
                            ref={(el) => setRef(el, 11 + i)}
                            style={{ transitionDelay: `${i * 0.08}s` }}
                        >
                            <p className="service-card-tag">{t(s.tag, s.tagEn)}</p>
                            <div className="service-card-icon">{s.icon}</div>
                            <h3>{t(s.title, s.titleEn)}</h3>

                            {/* mask-image fades the text out — no external component needed */}
                            <div style={{
                                height: "130px",
                                overflow: "hidden",
                                marginTop: "1rem",
                                maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                            }}>
                                <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                                    {t(s.desc, s.descEn)}
                                </p>
                            </div>

                            <div className="service-card-footer" style={{ marginTop: "1.5rem" }}>
                                {t("Ver más", "Learn more")} →
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
