"use client";

import { useLanguage } from "./LanguageProvider";
import ScrollReveal from "./ScrollReveal";
import styles from "./ProcessSection.module.css";

const steps = [
    {
        num: "01",
        title: "Estrategia y Análisis", titleEn: "Strategy & Analysis",
        desc: "Entendemos tu negocio. Analizamos competencia, target, comportamiento de usuario. Planificamos objetivos medibles antes de diseñar o desarrollar.",
        descEn: "We understand your business. We analyze competition, target, user behavior. We plan measurable goals before designing or developing.",
    },
    {
        num: "02",
        title: "Diseño Estratégico", titleEn: "Strategic Design",
        desc: "Diseñamos interfaces que funcionan. Sistemas visuales coherentes, flujos intuitivos, accesibilidad. Todo pensado en conversión y experiencia del usuario.",
        descEn: "We design interfaces that work. Coherent visual systems, intuitive flows, accessibility. All designed for conversion and user experience.",
    },
    {
        num: "03",
        title: "Desarrollo Técnico", titleEn: "Technical Development",
        desc: "Código escalable y rápido. Next.js, React, Node.js. Optimizamos rendimiento, seguridad y SEO integrado desde el desarrollo.",
        descEn: "Scalable and fast code. Next.js, React, Node.js. We optimize performance, security, and SEO integrated from development.",
    },
    {
        num: "04",
        title: "Lanzamiento y Optimización", titleEn: "Launch & Optimization",
        desc: "Lanzamiento sin sorpresas. Optimización SEO, Google Analytics, pruebas A/B. Monitoreo continuo y ajustes para maximizar ROI.",
        descEn: "Launch without surprises. SEO optimization, Google Analytics, A/B testing. Continuous monitoring and adjustments to maximize ROI.",
    },
];

export default function ProcessSection() {
    const { t } = useLanguage();

    return (
        <section id="proceso" className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <p className={styles.tagline}>
                        <span className={styles.taglineLine} />
                        {t("Metodología", "Methodology")}
                    </p>
                    <ScrollReveal as="h2" baseOpacity={0} blurStrength={3} baseRotation={1} textClassName={styles.processTitle}>
                        {t("Proceso probado. De la estrategia al éxito.", "Proven process. From strategy to success.")}
                    </ScrollReveal>
                </div>

                {/* Steps */}
                <div className={styles.processGrid}>

                    {/* Connecting technical line */}
                    <div className={styles.processLine} />

                    {steps.map((step, i) => (
                        <div key={i} className={styles.stepContainer}>
                            {/* Technical Node */}
                             <div className={styles.technicalNode}>
                                <div className={styles.nodeCenter} />
                            </div>

                            <p className={styles.stepNum}>
                                PHASE {step.num}
                            </p>

                            <h3 className={styles.stepTitle}>
                                {t(step.title, step.titleEn)}
                            </h3>
                            <p className={styles.stepDesc}>
                                {t(step.desc, step.descEn)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
