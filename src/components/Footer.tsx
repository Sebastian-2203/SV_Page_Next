"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";
import SVLogo from "./SVLogo";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-logo">
                    <a href="#inicio" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <SVLogo style={{ width: '40px', height: 'auto' }} />
                        <span className="accent">Solutions</span>
                    </a>
                    <p>{t("Elevando estándares web.", "Elevating web standards.")}</p>
                </div>
                <div className="footer-links">
                    <div className="link-group">
                        <h4>{t("Navegación", "Navigation")}</h4>
                        <a href="#inicio">{t("Inicio", "Home")}</a>
                        <a href="#portafolio">{t("Portafolio", "Portfolio")}</a>
                        <a href="#nosotros">{t("Nosotros", "About")}</a>
                    </div>
                    <div className="link-group">
                        <h4>{t("Legal", "Legal")}</h4>
                        <a href="#">{t("Privacidad", "Privacy")}</a>
                        <a href="#">{t("Términos", "Terms")}</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} SV Studio.{" "}
                    <span>{t("Todos los derechos reservados.", "All rights reserved.")}</span>
                </p>
            </div>
        </footer>
    );
}
