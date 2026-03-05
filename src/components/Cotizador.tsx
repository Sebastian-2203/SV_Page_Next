"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

// Base prices
const PRICES = {
    webTypes: {
        landing: 500000,
        corporate: 900000,
        ecommerce: 1800000,
    },
    extraPage: 80000,
    extras: {
        contactForm: 50000,
        whatsappButton: 30000,
        basicSEO: 120000,
        adminPanel: 200000,
    },
    deliveryFrames: {
        normal: 0,
        fast: 100000,
        express: 200000,
    }
};

type WebType = keyof typeof PRICES.webTypes;
type DeliveryFrame = keyof typeof PRICES.deliveryFrames;

export default function Cotizador() {
    const { t } = useLanguage();

    const [webType, setWebType] = useState<WebType>("landing");
    const [pages, setPages] = useState<number>(3); // 3 incluidas
    const [extras, setExtras] = useState({
        contactForm: false,
        whatsappButton: false,
        basicSEO: false,
        adminPanel: false,
    });
    const [delivery, setDelivery] = useState<DeliveryFrame>("normal");
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        let newTotal = PRICES.webTypes[webType];

        if (pages > 3) {
            newTotal += (pages - 3) * PRICES.extraPage;
        }

        if (extras.contactForm) newTotal += PRICES.extras.contactForm;
        if (extras.whatsappButton) newTotal += PRICES.extras.whatsappButton;
        if (extras.basicSEO) newTotal += PRICES.extras.basicSEO;
        if (extras.adminPanel) newTotal += PRICES.extras.adminPanel;

        newTotal += PRICES.deliveryFrames[delivery];

        setTotal(newTotal);
    }, [webType, pages, extras, delivery]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
    };

    const handleExtraChange = (extra: keyof typeof extras) => {
        setExtras(prev => ({ ...prev, [extra]: !prev[extra] }));
    };

    const generateSummaryText = () => {
        const webTypeLabel = t(
            webType === 'landing' ? 'Landing Page' : (webType === 'corporate' ? 'Página Corporativa' : 'Tienda Online'),
            webType === 'landing' ? 'Landing Page' : (webType === 'corporate' ? 'Corporate Website' : 'E-commerce')
        );

        let extrasText = [];
        if (extras.contactForm) extrasText.push(t("Formulario de Contacto", "Contact Form"));
        if (extras.whatsappButton) extrasText.push(t("Botón de WhatsApp", "WhatsApp Button"));
        if (extras.basicSEO) extrasText.push(t("SEO Básico", "Basic SEO"));
        if (extras.adminPanel) extrasText.push(t("Panel Autoadministrable", "Admin Panel"));

        const extrasStr = extrasText.length > 0 ? extrasText.join(', ') : t('Ninguno', 'None');

        const deliveryLabel = t(
            delivery === 'normal' ? 'Normal (7-10 días)' : (delivery === 'fast' ? 'Rápida (4-5 días)' : 'Express (2-3 días)'),
            delivery === 'normal' ? 'Normal (7-10 days)' : (delivery === 'fast' ? 'Fast (4-5 days)' : 'Express (2-3 days)')
        );

        return `¡Hola! Me gustaría cotizar un proyecto con SyV Solutions!%0A%0A*Detalles de la cotización:*%0A- Tipo: ${webTypeLabel}%0A- Páginas: ${pages}%0A- Extras: ${extrasStr}%0A- Tiempo de entrega: ${deliveryLabel}%0A%0A*Total estimado:* ${formatCurrency(total)} COP.%0A%0AQuedo atento/a para más detalles.`;
    };

    const handleWhatsApp = () => {
        const phone = "573102163947";
        const text = generateSummaryText();
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    };

    const handleEmail = () => {
        const email = "contacto@syvsolutions.com";
        const subject = encodeURIComponent("Cotización de proyecto web");
        const body = generateSummaryText().replace(/%0A/g, '%0D%0A'); // formato para email
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="cotizador-container">
            <h3>{t("Cotizador de Proyectos", "Project Estimator")}</h3>

            <div className="cotizador-grid">
                {/* Opciones de Cotización */}
                <div className="cotizador-options">

                    {/* Tipo de Web */}
                    <div className="form-group cotizador-group">
                        <label>{t("Tipo de página web", "Type of website")}</label>
                        <div className="radio-group">
                            <label className={`radio-card ${webType === 'landing' ? 'active' : ''}`}>
                                <input type="radio" name="webType" value="landing" checked={webType === 'landing'} onChange={() => setWebType('landing')} />
                                <span>{t("Landing Page", "Landing Page")}</span>
                                <small>{formatCurrency(PRICES.webTypes.landing)}</small>
                            </label>
                            <label className={`radio-card ${webType === 'corporate' ? 'active' : ''}`}>
                                <input type="radio" name="webType" value="corporate" checked={webType === 'corporate'} onChange={() => setWebType('corporate')} />
                                <span>{t("Página Corporativa", "Corporate Website")}</span>
                                <small>{formatCurrency(PRICES.webTypes.corporate)}</small>
                            </label>
                            <label className={`radio-card ${webType === 'ecommerce' ? 'active' : ''}`}>
                                <input type="radio" name="webType" value="ecommerce" checked={webType === 'ecommerce'} onChange={() => setWebType('ecommerce')} />
                                <span>{t("Tienda Online", "E-commerce")}</span>
                                <small>{formatCurrency(PRICES.webTypes.ecommerce)}</small>
                            </label>
                        </div>
                    </div>

                    {/* Número de Páginas */}
                    <div className="form-group cotizador-group">
                        <label>{t("Número de páginas", "Number of pages")}</label>
                        <p className="hint">{t("3 páginas básicas incluidas. (+$80.000 COP c/u adicional)", "3 basic pages included. (+80,000 COP per extra page)")}</p>
                        <div className="number-input">
                            <button type="button" onClick={() => setPages(Math.max(1, pages - 1))}>-</button>
                            <input type="number" min="1" value={pages} onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))} />
                            <button type="button" onClick={() => setPages(pages + 1)}>+</button>
                        </div>
                    </div>

                    {/* Extras */}
                    <div className="form-group cotizador-group">
                        <label>{t("Funciones extra", "Extra features")}</label>
                        <div className="checkbox-group">
                            <label className={`checkbox-item ${extras.contactForm ? 'checked' : ''}`}>
                                <input type="checkbox" checked={extras.contactForm} onChange={() => handleExtraChange('contactForm')} />
                                <div className="checkbox-content">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="custom-check"></div>
                                        <span className="checkbox-title">{t("Formulario Contacto", "Contact Form")}</span>
                                    </div>
                                    <span className="checkbox-price">+{formatCurrency(PRICES.extras.contactForm)}</span>
                                </div>
                            </label>

                            <label className={`checkbox-item ${extras.whatsappButton ? 'checked' : ''}`}>
                                <input type="checkbox" checked={extras.whatsappButton} onChange={() => handleExtraChange('whatsappButton')} />
                                <div className="checkbox-content">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="custom-check"></div>
                                        <span className="checkbox-title">{t("Botón WhatsApp", "WhatsApp Button")}</span>
                                    </div>
                                    <span className="checkbox-price">+{formatCurrency(PRICES.extras.whatsappButton)}</span>
                                </div>
                            </label>

                            <label className={`checkbox-item ${extras.basicSEO ? 'checked' : ''}`}>
                                <input type="checkbox" checked={extras.basicSEO} onChange={() => handleExtraChange('basicSEO')} />
                                <div className="checkbox-content">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="custom-check"></div>
                                        <span className="checkbox-title">{t("SEO Básico", "Basic SEO")}</span>
                                    </div>
                                    <span className="checkbox-price">+{formatCurrency(PRICES.extras.basicSEO)}</span>
                                </div>
                            </label>

                            <label className={`checkbox-item ${extras.adminPanel ? 'checked' : ''}`}>
                                <input type="checkbox" checked={extras.adminPanel} onChange={() => handleExtraChange('adminPanel')} />
                                <div className="checkbox-content">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="custom-check"></div>
                                        <span className="checkbox-title">{t("Panel Admin", "Admin Panel")}</span>
                                    </div>
                                    <span className="checkbox-price">+{formatCurrency(PRICES.extras.adminPanel)}</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Tiempo de entrega */}
                    <div className="form-group cotizador-group">
                        <label>{t("Tiempo de entrega", "Delivery time")}</label>
                        <select className="cotizador-select" value={delivery} onChange={(e) => setDelivery(e.target.value as DeliveryFrame)}>
                            <option value="normal">{t("Normal (7-10 días) - Incluido", "Normal (7-10 days) - Included")}</option>
                            <option value="fast">{t("Rápida (4-5 días) - +", "Fast (4-5 days) - +")}{formatCurrency(PRICES.deliveryFrames.fast)}</option>
                            <option value="express">{t("Express (2-3 días) - +", "Express (2-3 days) - +")}{formatCurrency(PRICES.deliveryFrames.express)}</option>
                        </select>
                    </div>

                </div>

                {/* Resumen */}
                <div className="cotizador-summary">
                    <div className="summary-card">
                        <h4>{t("Resumen de Cotización", "Quote Summary")}</h4>

                        <div className="summary-total">
                            <span className="total-label">{t("Precio Estimado", "Estimated Price")}</span>
                            <span className="total-amount">{formatCurrency(total)} COP</span>
                        </div>

                        <p className="summary-disclaimer">
                            {t("*Este es un valor aproximado. El precio final puede variar según los requerimientos específicos del proyecto.", "*This is an estimated value. The final price may vary depending on project-specific requirements.")}
                        </p>

                        <div className="summary-actions">
                            <button onClick={() => alert(t("Por favor, usa los botones de WhatsApp o Correo para contactarnos", "Please use the WhatsApp or Email buttons to contact us"))} className="btn-action primary">
                                {t("Solicitar Cotización", "Request Quote")}
                            </button>
                            <button onClick={handleWhatsApp} className="btn-action whatsapp">
                                <i className="fab fa-whatsapp"></i> {t("Enviar por WhatsApp", "Send via WhatsApp")}
                            </button>
                            <button onClick={handleEmail} className="btn-action email">
                                <i className="fas fa-envelope"></i> {t("Recibir por correo", "Receive via Email")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
