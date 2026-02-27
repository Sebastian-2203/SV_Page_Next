"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import SVLogo from "./SVLogo";

export default function Navbar() {
    const { t, language, toggleLanguage } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
                <div className="nav-container">
                    <a href="#inicio" className="logo" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <SVLogo style={{ width: '40px', height: 'auto' }} />
                        <span className="accent">Solutions</span>
                    </a>

                    <ul className="nav-links">
                        <li><a href="#inicio">{t("Inicio", "Home")}</a></li>
                        <li><a href="#portafolio">{t("Portafolio", "Portfolio")}</a></li>
                        <li><a href="#nosotros">{t("Sobre nosotros", "About Us")}</a></li>
                        <li><a href="#contacto">{t("Contacto", "Contact")}</a></li>
                    </ul>

                    <div className="nav-actions">
                        <button
                            onClick={toggleLanguage}
                            className="lang-btn"
                            aria-label="Toggle language"
                        >
                            <span className="lang-text">{language === "es" ? "EN" : "ES"}</span>
                        </button>
                        <a href="#cotiza" className="cta-nav">
                            {t("Cotiza tu proyecto", "Get a Quote")}
                        </a>
                    </div>

                    <button
                        className="menu-toggle"
                        aria-label="Menu"
                        onClick={toggleMenu}
                        style={{
                            transform: menuOpen ? "rotate(90deg)" : "none",
                        }}
                    >
                        <span style={{ transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none" }} />
                        <span style={{ transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none" }} />
                    </button>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobile-menu">
                <ul className="mobile-nav-links">
                    <li>
                        <a href="#inicio" className="mobile-link" onClick={closeMenu}>
                            {t("Inicio", "Home")}
                        </a>
                    </li>
                    <li>
                        <a href="#portafolio" className="mobile-link" onClick={closeMenu}>
                            {t("Portafolio", "Portfolio")}
                        </a>
                    </li>
                    <li>
                        <a href="#nosotros" className="mobile-link" onClick={closeMenu}>
                            {t("Sobre nosotros", "About Us")}
                        </a>
                    </li>
                    <li>
                        <a href="#contacto" className="mobile-link" onClick={closeMenu}>
                            {t("Contacto", "Contact")}
                        </a>
                    </li>
                    <li>
                        <a href="#cotiza" className="mobile-link accent" onClick={closeMenu}>
                            {t("Cotiza tu proyecto", "Get a Quote")}
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
