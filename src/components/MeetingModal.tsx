"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

interface Props { onClose: () => void; }

export default function MeetingModal({ onClose }: Props) {
    const { t } = useLanguage();

    useEffect(() => {
        const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", fn);
        document.body.style.overflow = "hidden";
        return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const text = `Hola! Quiero agendar una reunión.\n\nNombre: ${fd.get("name")}\nEmpresa: ${fd.get("company") || "—"}\nEmail: ${fd.get("email")}\nFecha preferida: ${fd.get("date")}\nHorario: ${fd.get("time")}\nNota: ${fd.get("message") || "—"}`;
        window.open(`https://wa.me/+1234567890?text=${encodeURIComponent(text)}`, "_blank");
        onClose();
    };

    return (
        <div
            onClick={e => e.target === e.currentTarget && onClose()}
            style={{
                position: "fixed", inset: 0, zIndex: 9999,
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(10px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "1.5rem",
                animation: "fadeIn 0.2s ease",
            }}
        >
            <div style={{
                background: "var(--color-bg-secondary)",
                border: "0.5px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "2.5rem",
                width: "100%", maxWidth: 480,
                position: "relative",
                animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}>
                <button onClick={onClose} style={{
                    position: "absolute", top: "1.25rem", right: "1.25rem",
                    background: "none", border: "0.5px solid var(--color-border)",
                    borderRadius: "50%", width: 32, height: 32,
                    color: "var(--color-text-muted)", fontSize: "0.9rem",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>✕</button>

                <p style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--color-brand)", marginBottom: "0.75rem" }}>
                    {t("Sin costo · 30 min", "Free · 30 min")}
                </p>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 600, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>
                    {t("Agendá una charla.", "Book a chat.")}
                </h2>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
                    {t("Sin compromiso. Solo vemos si podemos ayudarte.", "No commitment. Just checking if we can help.")}
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                        { name: "name", placeholder: t("Nombre *", "Name *"), type: "text", required: true },
                        { name: "company", placeholder: t("Empresa (opc.)", "Company (opt.)"), type: "text", required: false },
                        { name: "email", placeholder: "Email *", type: "email", required: true },
                    ].map(f => (
                        <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder} required={f.required}
                            style={inputStyle} />
                    ))}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        <input name="date" type="date" required style={{ ...inputStyle, colorScheme: "dark" }} />
                        <input name="time" type="time" required style={{ ...inputStyle, colorScheme: "dark" }} />
                    </div>
                    <textarea name="message" placeholder={t("Nota rápida (opc.)", "Quick note (opt.)")} rows={3}
                        style={{ ...inputStyle, resize: "none" }} />
                    <button type="submit" style={{
                        marginTop: "0.25rem",
                        padding: "0.9rem", background: "var(--color-brand)", color: "#fff",
                        border: "none", borderRadius: "var(--radius-md)",
                        fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
                        fontFamily: "inherit", transition: "background 0.2s",
                    }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--color-brand-hover)"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--color-brand)"}>
                        {t("Enviar por WhatsApp →", "Send via WhatsApp →")}
                    </button>
                </form>
            </div>

            <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    background: "var(--color-bg-glass)",
    border: "0.5px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-text-primary)",
    fontSize: "0.88rem",
    fontFamily: "inherit",
    outline: "none",
};
