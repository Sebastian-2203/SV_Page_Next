"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "./MeetingModal.module.css";

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
        window.open(`https://wa.me/573102163947?text=${encodeURIComponent(text)}`, "_blank");
        onClose();
    };

    return (
        <div
            onClick={e => e.target === e.currentTarget && onClose()}
            className={styles.modalOverlay}
        >
            <div className={styles.modalCard}>
                <button onClick={onClose} className={styles.closeBtn}>✕</button>

                <p className={styles.tagline}>
                    {t("Sin costo · 30 min", "Free · 30 min")}
                </p>
                <h2 className={styles.title}>
                    {t("Agendá una charla.", "Book a chat.")}
                </h2>
                <p className={styles.description}>
                    {t("Sin compromiso. Solo vemos si podemos ayudarte.", "No commitment. Just checking if we can help.")}
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {[
                        { name: "name", placeholder: t("Nombre *", "Name *"), type: "text", required: true },
                        { name: "company", placeholder: t("Empresa (opc.)", "Company (opt.)"), type: "text", required: false },
                        { name: "email", placeholder: "Email *", type: "email", required: true },
                    ].map(f => (
                        <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder} required={f.required}
                            className={styles.input} />
                    ))}
                    <div className={styles.dateTimeGrid}>
                        <input name="date" type="date" required className={styles.input} style={{ colorScheme: "dark" }} />
                        <input name="time" type="time" required className={styles.input} style={{ colorScheme: "dark" }} />
                    </div>
                    <textarea name="message" placeholder={t("Nota rápida (opc.)", "Quick note (opt.)")} rows={3}
                        className={`${styles.input} ${styles.textarea}`} />
                    <button type="submit" className={styles.submitBtn}>
                        {t("Enviar por WhatsApp →", "Send via WhatsApp →")}
                    </button>
                </form>
            </div>
        </div>
    );
}
