"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "./Navbar.module.css";

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

const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
);

const MoonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
);

export default function Navbar({ onBookCall }: Props) {
    const { t, language, toggleLanguage } = useLanguage();
    const [darkMode, setDarkMode] = useState(true);
    const [activeSection, setActiveSection] = useState("inicio");

    useEffect(() => {
        // Track the active section on scroll
        const sections = ["inicio", "servicios", "proceso", "portafolio"];
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
        { href: "#portafolio", label: t("Portafolio", "Portfolio"), icon: <PortfolioIcon />, section: "portafolio" },
    ];

    return (
        <nav className={`${styles.navbar} ${darkMode ? styles.navbarDark : styles.navbarLight}`}>
            {links.map(({ href, label, icon, section }) => {
                const isActive = activeSection === section;
                return (
                    <a 
                        key={href} 
                        href={href} 
                        className={`${styles.navItem} ${isActive ? styles.navItemActive : styles.navItemInactive}`}
                    >
                        {icon}
                        <span className="nav-label">{label}</span>
                    </a>
                );
            })}

            {/* Action buttons mapping to Contacto modal triggers */}
            <button
                onClick={onBookCall}
                className={`${styles.navItem} ${styles.navItemInactive}`}
            >
                <ContactIcon />
                <span className="nav-label">{t("Contacto", "Contact")}</span>
            </button>

            {/* Separator line */}
            <div className={styles.separator} />

            {/* Language Selector */}
            <button 
                onClick={toggleLanguage} 
                className={styles.iconButton}
                aria-label="Cambiar idioma"
            >
                {language === "es" ? "EN" : "ES"}
            </button>

            {/* Toggle tema */}
            <button
                onClick={toggleTheme}
                className={styles.iconButton}
                aria-label="Cambiar tema"
            >
                {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
        </nav>
    );
}
