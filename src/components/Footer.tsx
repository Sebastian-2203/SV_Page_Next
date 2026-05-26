"use client";

import { useLanguage } from "./LanguageProvider";
import SVLogo from "./SVLogo";

export default function Footer() {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer style={{
            position: "relative",
            background: "var(--color-bg-primary)",
            borderTop: "0.5px solid var(--color-border)",
            overflow: "hidden",
            padding: "4rem 2rem 9rem",
            display: "flex",
            flexDirection: "column",
        }}>

            {/* Dramatic oversized background word, inspired by the reference */}
            <div aria-hidden style={{
                position: "absolute",
                bottom: "-0.15em",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                textAlign: "center",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end"
            }} className="footer-dramatic-text">
                {/* Stacked layers for depth effect */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        fontSize: "clamp(6rem, 18vw, 15rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.04em",
                        lineHeight: 0.85,
                        color: "transparent",
                        WebkitTextStroke: `1px rgba(255,255,255,${0.02 + (i * 0.03)})`,
                        userSelect: "none",
                        whiteSpace: "nowrap",
                        marginTop: i === 0 ? 0 : "-0.45em",
                        transform: `scaleY(${1 + (i * 0.15)}) translateY(${i * 2}px)`,
                        transformOrigin: "bottom center"
                    }}>
                        DEVELOPERS
                    </div>
                ))}
            </div>

            {/* Footer content */}
            <div style={{
                maxWidth: 1200, margin: "0 auto", width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: "5rem",
                position: "relative", zIndex: 1,
            }} className="footer-grid">

                {/* Brand */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                        <SVLogo />
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: 280, fontWeight: 500 }}>
                        {t("Design and code. We do both.", "Design and code. We do both.")}
                    </p>
                    <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>🌐</span>
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em", fontWeight: 600 }}>
                            © {year} S&amp;V SOLUTIONS, INC.
                        </p>
                    </div>
                </div>

                {/* Nav links */}
                <div style={{ paddingTop: "0.5rem" }}>
                    <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--color-brand)", marginBottom: "1.25rem" }}>
                        / {t("Navegación", "NAVIGATION")}
                    </p>
                    <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                        {[
                            { href: "#servicios", label: t("Servicios", "SERVICES") },
                            { href: "#proceso", label: t("Proceso", "PROCESS") },
                            { href: "#portafolio", label: t("Trabajo", "WORK") },
                            { href: "#contacto", label: t("Contacto", "CONTACT") },
                        ].map(l => (
                            <a key={l.href} href={l.href} style={{
                                fontSize: "0.8rem", color: "var(--color-text-secondary)",
                                transition: "color 0.2s", fontWeight: 600, letterSpacing: "0.05em"
                            }}
                                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-brand)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}>
                                {l.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Contact */}
                <div style={{ paddingTop: "0.5rem" }}>
                    <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--color-brand)", marginBottom: "1.25rem" }}>
                        / {t("Social", "SOCIAL")}
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", maxWidth: 220 }}>
                        {[
                            { href: "mailto:hola@svsolutions.com", label: "EMAIL" },
                            { href: "https://wa.me/+1234567890", label: "WHATSAPP" },
                            { href: "https://instagram.com/svsolutions", label: "INSTAGRAM" },
                            { href: "#", label: "LINKEDIN" }
                        ].map(l => (
                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                                style={{
                                    fontSize: "0.7rem", color: "var(--color-text-secondary)",
                                    transition: "all 0.2s", fontWeight: 600, letterSpacing: "0.05em",
                                    padding: "0.3rem 0.6rem", border: "0.5px solid var(--color-border)",
                                    borderRadius: "var(--radius-sm)",
                                    background: "transparent"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = "#000";
                                    e.currentTarget.style.background = "#fff";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = "var(--color-text-secondary)";
                                    e.currentTarget.style.background = "transparent";
                                }}>
                                {l.label}
                            </a>
                        ))}
                    </div>

                    <div style={{ marginTop: "3rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {["PRIVACY", "LEGAL", "SVSOLUTIONS.COM"].map((label, idx) => (
                                <span key={idx} style={{
                                    fontSize: "0.65rem", color: "var(--color-text-muted)",
                                    fontWeight: 600, letterSpacing: "0.05em",
                                    padding: "0.2rem 0.4rem", border: "0.5px solid var(--color-border)",
                                    borderRadius: "var(--radius-sm)"
                                }}>
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
        }
      `}</style>
        </footer>
    );
}
