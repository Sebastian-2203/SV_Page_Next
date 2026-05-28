"use client";

import { useLanguage } from "./LanguageProvider";
import ScrollReveal from "./ScrollReveal";
import React from "react";
import styles from "./CTASection.module.css";

interface Props { onBookCall?: () => void; }

export default function CTASection({ onBookCall }: Props) {
    const { t } = useLanguage();

    return (
        <section className={styles.section}>
            {/* Subtle background glow */}
            <div className={styles.glow} />

            <div className={styles.content}>
                <div className={styles.taglineWrapper}>
                    <span className={styles.taglineDot} />
                    <p className={styles.taglineText}>
                        {t("¿Listo para empezar?", "Ready to start?")}
                    </p>
                </div>

                <ScrollReveal as="h2" baseOpacity={0} blurStrength={3} baseRotation={1} textClassName={styles.ctaTitle}>
                    {t("Empieza tu siguiente proyecto hoy", "Start your next project today")}
                </ScrollReveal>

                <p className={styles.description}>
                    {t(
                        "Hablemos de tu idea. En 30 minutos sabremos si somos el equipo indicado.",
                        "Let's talk about your idea. In 30 minutes we'll know if we're the right team."
                    )}
                </p>

                <ul className={styles.featureList}>
                    <li className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span> {t("Sin formularios largos", "No long forms")}
                    </li>
                    <li className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span> {t("Consulta 100% gratuita", "100% free consultation")}
                    </li>
                    <li className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span> {t("Propuesta en menos de 48 horas", "Proposal in less than 48 hours")}
                    </li>
                </ul>

                <button 
                    className={styles.ctaButton}
                    onClick={onBookCall}
                >
                    {t("Agendar llamada gratuita", "Schedule free call")}
                </button>
            </div>
        </section>
    );
}
