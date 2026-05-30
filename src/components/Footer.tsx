"use client";

import { useLanguage } from "./LanguageProvider";
import SVLogo from "./SVLogo";
import styles from "./Footer.module.css";
import React from "react";

export default function Footer() {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            {/* Main content grid */}
            <div className={styles.grid}>
                
                {/* Col 1: Brand details & Status info */}
                <div>
                    <div className={styles.brandWrapper}>
                        <SVLogo />
                    </div>
                    <p className={styles.brandDesc}>
                        {t("Diseño y código. Hacemos ambos.", "Design and code. We do both.")}
                    </p>
                    
                    {/* Live availability indicator */}
                    <div className={styles.statusWrapper}>
                        <span className={styles.statusDot} />
                        <span className={styles.statusText}>
                            {t("Disponible para proyectos", "Available for projects")}
                        </span>
                    </div>

                    {/* Geolocation and GMT timezone */}
                    <div className={styles.locationWrapper}>
                        <span className={styles.locationIcon}>📍</span>
                        <span>{t("Bogotá, CO · GMT-5", "Bogota, CO · GMT-5")}</span>
                    </div>
                </div>

                {/* Col 2: Navigation column with interactive indicators */}
                <div style={{ paddingTop: "0.5rem" }}>
                    <p className={styles.sectionTitle}>
                        / {t("Navegación", "NAVIGATION")}
                    </p>
                    <nav className={styles.navColumn}>
                        {[
                            { href: "#servicios", label: t("Servicios", "SERVICES") },
                            { href: "#proceso", label: t("Proceso", "PROCESS") },
                            { href: "#portafolio", label: t("Trabajo", "WORK") },
                            { href: "#contacto", label: t("Contacto", "CONTACT") },
                        ].map(l => (
                            <a 
                                key={l.href} 
                                href={l.href} 
                                className={styles.navLink}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Col 3: Social & Contact portals */}
                <div style={{ paddingTop: "0.5rem" }}>
                    <p className={styles.sectionTitle}>
                        / {t("Conectar", "CONNECT")}
                    </p>
                    <div className={styles.socialWrapper}>
                        {[
                            { href: "mailto:sebastianmahecha2217@gmail.com", label: "EMAIL" },
                            { href: "https://wa.me/573102163947", label: "WHATSAPP" },
                            { href: "https://instagram.com/syv.solutions", label: "INSTAGRAM" },
                        ].map(l => (
                            <a 
                                key={l.href} 
                                href={l.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <span>{l.label}</span>
                                <span className={styles.socialLinkIcon}>→</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Copyright and Badges */}
            <div className={styles.bottomBar}>
                <p className={styles.copyrightText}>
                    © {year} S&amp;V SOLUTIONS, INC.
                </p>

                <div className={styles.badgeContainer}>
                    {["PRIVACY", "LEGAL", "SVSOLUTIONS.COM"].map((label, idx) => (
                        <span key={idx} className={styles.badge}>
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
}
