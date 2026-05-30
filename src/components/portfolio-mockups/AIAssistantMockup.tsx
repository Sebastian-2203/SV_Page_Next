"use client";

import React from "react";
import {
    IconPlus,
    IconMessageCircle,
    IconSparkles,
    IconSend,
    IconPaperclip,
    IconUser,
    IconChartBar,
    IconTarget,
    IconReportMoney,
    IconArrowUpRight,
    IconBolt,
    IconSettings,
    IconCircleCheck,
    IconClock,
    IconRobot,
} from "@tabler/icons-react";
import s from "./mockups.module.css";

type Lang = "es" | "en";
const tt = (lang: Lang, es: string, en: string) => (lang === "en" ? en : es);

/* ── Shell: conversation sidebar + main area ── */

function AssistantShell({
    activeConv,
    lang,
    children,
}: {
    activeConv: number;
    lang: Lang;
    children: React.ReactNode;
}) {
    const recent = [
        { es: "Análisis de ventas Q2", en: "Q2 sales analysis" },
        { es: "Resumen de clientes", en: "Client summary" },
        { es: "Proyección de ingresos", en: "Revenue projection" },
        { es: "Automatizar reportes", en: "Automate reports" },
    ];

    return (
        <div className={s.mockupRoot}>
            <aside className={s.sidebar}>
                <div className={s.brand}>
                    <div className={s.brandMark}>
                        <IconSparkles size={17} stroke={1.8} />
                    </div>
                    <div>
                        <div className={s.brandName}>Nexus AI</div>
                        <div className={s.brandSub}>{tt(lang, "Asistente de datos", "Data assistant")}</div>
                    </div>
                </div>

                <button className={s.newChatBtn}>
                    <IconPlus size={16} stroke={2} />
                    {tt(lang, "Nueva conversación", "New conversation")}
                </button>

                <div className={s.sectionLabel}>{tt(lang, "Recientes", "Recent")}</div>
                {recent.map((c, i) => (
                    <div key={i} className={`${s.convItem} ${activeConv === i ? s.convItemActive : ""}`}>
                        <IconMessageCircle size={16} stroke={1.6} />
                        <span className={s.convLabel}>{tt(lang, c.es, c.en)}</span>
                    </div>
                ))}

                <div className={s.navSpacer} />

                <div className={s.convItem}>
                    <IconSettings size={16} stroke={1.6} />
                    {tt(lang, "Configuración", "Settings")}
                </div>
            </aside>

            {children}
        </div>
    );
}

/* ── Screen 1: Conversation with insight ── */

export function AssistantChat({ lang }: { lang: Lang }) {
    const suggestions = [
        { icon: <IconChartBar size={14} stroke={1.7} />, es: "Ver reportes detallados", en: "View detailed reports" },
        { icon: <IconTarget size={14} stroke={1.7} />, es: "Estrategia de follow-up", en: "Follow-up strategy" },
        { icon: <IconReportMoney size={14} stroke={1.7} />, es: "Proyectar próximo trimestre", en: "Project next quarter" },
    ];

    return (
        <AssistantShell activeConv={0} lang={lang}>
            <div className={s.chatMain}>
                <div className={s.topbar}>
                    <div className={s.msgAvatar + " " + s.msgAvatarAi} style={{ width: 30, height: 30 }}>
                        <IconSparkles size={16} stroke={1.8} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{tt(lang, "Análisis de ventas Q2", "Q2 sales analysis")}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                            {tt(lang, "Claude · en línea", "Claude · online")}
                        </div>
                    </div>
                </div>

                <div className={s.chatScroll}>
                    {/* user */}
                    <div className={`${s.msgRow} ${s.msgRowUser}`}>
                        <div className={`${s.msgAvatar} ${s.msgAvatarUser}`}>
                            <IconUser size={16} stroke={1.6} />
                        </div>
                        <div className={`${s.bubble} ${s.bubbleUser}`}>
                            {tt(lang, "¿Cómo van las ventas este trimestre frente al anterior?", "How are sales this quarter vs last?")}
                        </div>
                    </div>

                    {/* ai */}
                    <div className={s.msgRow}>
                        <div className={`${s.msgAvatar} ${s.msgAvatarAi}`}>
                            <IconSparkles size={16} stroke={1.8} />
                        </div>
                        <div>
                            <div className={`${s.bubble} ${s.bubbleAi}`}>
                                {tt(
                                    lang,
                                    "Las ventas de Q2 crecieron un 24.8% frente a Q1, impulsadas por suscripciones. Detecté un repunte en clientes B2B.",
                                    "Q2 sales grew 24.8% vs Q1, driven by subscriptions. I detected a spike in B2B clients."
                                )}
                                <div className={s.insightCard}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, fontSize: 11.5, color: "#7ab8f0", fontWeight: 600 }}>
                                        <IconBolt size={14} stroke={1.8} />
                                        {tt(lang, "INSIGHT ACCIONABLE", "ACTIONABLE INSIGHT")}
                                    </div>
                                    <div className={s.miniStat}>
                                        <span style={{ fontSize: 22, fontWeight: 700 }}>+24.8%</span>
                                        <span className={s.trendUp}>
                                            <IconArrowUpRight size={13} stroke={2} />
                                            {tt(lang, "vs trimestre anterior", "vs last quarter")}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 6, lineHeight: 1.5 }}>
                                        {tt(
                                            lang,
                                            "Recomiendo reforzar el equipo de soporte B2B para sostener el ritmo.",
                                            "I recommend reinforcing the B2B support team to keep the pace."
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.suggestRow}>
                    {suggestions.map((sg, i) => (
                        <div key={i} className={s.suggestItem}>
                            {sg.icon}
                            {tt(lang, sg.es, sg.en)}
                        </div>
                    ))}
                </div>

                <div className={s.composer}>
                    <IconPaperclip size={18} stroke={1.6} color="rgba(255,255,255,0.4)" />
                    <span className={s.composerInput}>{tt(lang, "Escribe tu consulta…", "Type your query…")}</span>
                    <div className={s.sendBtn}>
                        <IconSend size={17} stroke={1.8} />
                    </div>
                </div>
            </div>
        </AssistantShell>
    );
}

/* ── Screen 2: Insights board ── */

export function AssistantInsights({ lang }: { lang: Lang }) {
    const insights = [
        {
            icon: <IconReportMoney size={18} stroke={1.7} />,
            es: "Oportunidad de upsell",
            en: "Upsell opportunity",
            body_es: "32 clientes superaron su límite de uso 3 meses seguidos.",
            body_en: "32 clients exceeded their usage limit 3 months in a row.",
            tag_es: "Alta prioridad",
            tag_en: "High priority",
        },
        {
            icon: <IconTarget size={18} stroke={1.7} />,
            es: "Riesgo de churn",
            en: "Churn risk",
            body_es: "8 cuentas redujeron su actividad un 40% este mes.",
            body_en: "8 accounts dropped activity by 40% this month.",
            tag_es: "Revisar",
            tag_en: "Review",
        },
        {
            icon: <IconChartBar size={18} stroke={1.7} />,
            es: "Producto estrella",
            en: "Top product",
            body_es: "El plan Pro genera el 61% de los ingresos recurrentes.",
            body_en: "The Pro plan drives 61% of recurring revenue.",
            tag_es: "Estable",
            tag_en: "Stable",
        },
    ];

    return (
        <AssistantShell activeConv={1} lang={lang}>
            <div className={s.chatMain}>
                <div className={s.topbar}>
                    <div style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 9 }}>
                        <IconBolt size={18} stroke={1.7} color="#7ab8f0" />
                        {tt(lang, "Insights generados por IA", "AI-generated insights")}
                    </div>
                    <div style={{ flex: 1 }} />
                    <span className={s.pill}>
                        <IconSparkles size={13} stroke={1.8} />
                        {tt(lang, "Actualizado hace 2 min", "Updated 2 min ago")}
                    </span>
                </div>

                <div className={s.chatScroll} style={{ gap: 12 }}>
                    {insights.map((it, i) => (
                        <div key={i} className={s.listRow}>
                            <div className={s.listIcon}>{it.icon}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{tt(lang, it.es, it.en)}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3, lineHeight: 1.5 }}>
                                    {tt(lang, it.body_es, it.body_en)}
                                </div>
                            </div>
                            <span className={`${s.badge} ${i === 1 ? s.badgePend : s.badgeOk}`}>{tt(lang, it.tag_es, it.tag_en)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AssistantShell>
    );
}

/* ── Screen 3: Automations / workflows ── */

export function AssistantAutomation({ lang }: { lang: Lang }) {
    const flows = [
        { es: "Resumen diario a las 9:00", en: "Daily summary at 9:00", on: true, icon: <IconClock size={18} stroke={1.7} /> },
        { es: "Alerta de churn en Slack", en: "Churn alert to Slack", on: true, icon: <IconBolt size={18} stroke={1.7} /> },
        { es: "Reporte semanal por email", en: "Weekly email report", on: true, icon: <IconReportMoney size={18} stroke={1.7} /> },
        { es: "Clasificar tickets entrantes", en: "Classify incoming tickets", on: false, icon: <IconRobot size={18} stroke={1.7} /> },
    ];

    return (
        <AssistantShell activeConv={3} lang={lang}>
            <div className={s.chatMain}>
                <div className={s.topbar}>
                    <div style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 9 }}>
                        <IconRobot size={18} stroke={1.7} color="#7ab8f0" />
                        {tt(lang, "Automatizaciones", "Automations")}
                    </div>
                    <div style={{ flex: 1 }} />
                    <span className={s.ghostBtn}>
                        <IconPlus size={14} stroke={2} />
                        {tt(lang, "Crear flujo", "New flow")}
                    </span>
                </div>

                <div className={s.chatScroll} style={{ gap: 11 }}>
                    {flows.map((f, i) => (
                        <div key={i} className={s.listRow}>
                            <div className={s.listIcon}>{f.icon}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{tt(lang, f.es, f.en)}</div>
                                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginTop: 3, display: "flex", alignItems: "center", gap: 5 }}>
                                    <IconCircleCheck size={13} stroke={1.7} color={f.on ? "#34d399" : "rgba(255,255,255,0.3)"} />
                                    {f.on ? tt(lang, "Activo · sin errores", "Active · no errors") : tt(lang, "Pausado", "Paused")}
                                </div>
                            </div>
                            <div className={`${s.toggle} ${f.on ? "" : s.toggleOff}`} />
                        </div>
                    ))}
                </div>
            </div>
        </AssistantShell>
    );
}
