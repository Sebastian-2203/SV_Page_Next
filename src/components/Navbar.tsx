"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

interface Props {
    onBookCall: () => void;
}

const HomeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

const ServicesIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="3" y="3" width="7" height="9" rx="1"/>
        <rect x="14" y="3" width="7" height="5" rx="1"/>
        <rect x="14" y="12" width="7" height="9" rx="1"/>
        <rect x="3" y="16" width="7" height="5" rx="1"/>
    </svg>
);

const PortfolioIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
);

const ContactIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);

export default function Navbar({ onBookCall }: Props) {
    const { t, language, toggleLanguage } = useLanguage();
    const [darkMode, setDarkMode] = useState(true);
    const [activeSection, setActiveSection] = useState("inicio");

    useEffect(() => {
        // Track the active section on scroll
        const sections = ["inicio", "servicios", "proceso"];
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("light-theme");
    };

    const links = [
        { href: "#inicio", label: t("Inicio", "Home"), icon: <HomeIcon />, section: "inicio" },
        { href: "#servicios", label: t("Servicios", "Services"), icon: <ServicesIcon />, section: "servicios" },
        { href: "#proceso", label: t("Portafolio", "Portfolio"), icon: <PortfolioIcon />, section: "proceso" },
    ];

    return (
        <nav style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "6px 8px",
            background: darkMode ? "rgba(10, 15, 30, 0.85)" : "rgba(240, 246, 255, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: darkMode ? "0.5px solid var(--color-border)" : "0.5px solid rgba(37, 99, 235, 0.15)",
            borderRadius: "999px",
            boxShadow: darkMode 
                ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(74,144,217,0.1)" 
                : "0 8px 32px rgba(37, 99, 235, 0.08), 0 0 0 0.5px rgba(37, 99, 235, 0.15)",
            whiteSpace: "nowrap",
            animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}>
            {links.map(({ href, label, icon, section }) => {
                const isActive = activeSection === section;
                return (
                    <a key={href} href={href} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: isActive ? "8px 16px" : "8px 14px",
                        borderRadius: "999px",
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#ffffff" : "var(--color-text-secondary)",
                        background: isActive ? "var(--color-brand)" : "transparent",
                        textDecoration: "none",
                        transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={e => {
                        if (!isActive) {
                            e.currentTarget.style.color = "var(--color-brand)";
                            e.currentTarget.style.background = "var(--color-brand-subtle)";
                        }
                    }}
                    onMouseLeave={e => {
                        if (!isActive) {
                            e.currentTarget.style.color = "var(--color-text-secondary)";
                            e.currentTarget.style.background = "transparent";
                        }
                    }}
                    >
                        {icon}
                        <span className="nav-label">{label}</span>
                    </a>
                );
            })}

            {/* Action buttons mapping to Contacto modal triggers */}
            <button
                onClick={onBookCall}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.color = "var(--color-brand)";
                    e.currentTarget.style.background = "var(--color-brand-subtle)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.background = "transparent";
                }}
            >
                <ContactIcon />
                <span className="nav-label">{t("Contacto", "Contact")}</span>
            </button>

            {/* Separator line */}
            <div style={{ width: "1px", height: "20px", background: "var(--color-border)", margin: "0 6px" }} />

            {/* Language Selector */}
            <button 
                onClick={toggleLanguage} 
                style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--color-bg-glass)",
                    border: "0.5px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-text-secondary)",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.color = "var(--color-text-primary)";
                    e.currentTarget.style.background = "var(--color-brand-subtle)";
                    e.currentTarget.style.borderColor = "var(--color-border-brand)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.background = "var(--color-bg-glass)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                }}
                aria-label="Cambiar idioma"
            >
                {language === "es" ? "EN" : "ES"}
            </button>

            {/* Toggle tema */}
            <button
                onClick={toggleTheme}
                style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--color-bg-glass)",
                    border: "0.5px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-text-secondary)",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.color = "var(--color-brand)";
                    e.currentTarget.style.background = "var(--color-brand-subtle)";
                    e.currentTarget.style.borderColor = "var(--color-border-brand)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                    e.currentTarget.style.background = "var(--color-bg-glass)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                }}
                aria-label="Cambiar tema"
            >
                {darkMode ? "☀" : "🌙"}
            </button>
        </nav>
    );
}
