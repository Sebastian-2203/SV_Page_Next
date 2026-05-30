"use client";

import React from "react";
import {
    IconLayoutDashboard,
    IconChartLine,
    IconWallet,
    IconUsers,
    IconSettings,
    IconSearch,
    IconBell,
    IconArrowUpRight,
    IconArrowDownRight,
    IconReportMoney,
    IconCreditCard,
    IconReceipt,
    IconDownload,
    IconChartPie,
    IconFilter,
    IconFileAnalytics,
    IconBuildingBank,
} from "@tabler/icons-react";
import s from "./mockups.module.css";

type Lang = "es" | "en";
const tt = (lang: Lang, es: string, en: string) => (lang === "en" ? en : es);

/* ── Shell shared by every dashboard screen ── */

function DashboardShell({
    active,
    lang,
    children,
}: {
    active: "overview" | "analytics" | "reports" | "settings";
    lang: Lang;
    children: React.ReactNode;
}) {
    const nav = [
        { id: "overview", icon: <IconLayoutDashboard size={18} stroke={1.6} />, es: "Resumen", en: "Overview" },
        { id: "analytics", icon: <IconChartLine size={18} stroke={1.6} />, es: "Análisis", en: "Analytics" },
        { id: "reports", icon: <IconFileAnalytics size={18} stroke={1.6} />, es: "Reportes", en: "Reports" },
        { id: "settings", icon: <IconSettings size={18} stroke={1.6} />, es: "Ajustes", en: "Settings" },
    ] as const;

    return (
        <div className={s.mockupRoot}>
            <aside className={s.sidebar}>
                <div className={s.brand}>
                    <div className={s.brandMark}>
                        <IconWallet size={17} stroke={1.8} />
                    </div>
                    <div>
                        <div className={s.brandName}>Finblock</div>
                        <div className={s.brandSub}>{tt(lang, "Finanzas B2B", "B2B Finance")}</div>
                    </div>
                </div>

                {nav.map((n) => (
                    <div
                        key={n.id}
                        className={`${s.navItem} ${active === n.id ? s.navItemActive : ""}`}
                    >
                        {n.icon}
                        {tt(lang, n.es, n.en)}
                    </div>
                ))}

                <div className={s.navSpacer} />

                <div className={s.navItem}>
                    <IconBuildingBank size={18} stroke={1.6} />
                    {tt(lang, "Cuentas", "Accounts")}
                </div>
            </aside>

            <div className={s.main}>
                <div className={s.topbar}>
                    <div className={s.searchBox}>
                        <IconSearch size={16} stroke={1.6} />
                        {tt(lang, "Buscar transacciones, clientes…", "Search transactions, clients…")}
                    </div>
                    <div style={{ flex: 1 }} />
                    <div className={s.iconBtn}>
                        <IconBell size={17} stroke={1.6} />
                        <span className={s.dot} />
                    </div>
                    <div className={s.avatarSm}>SV</div>
                </div>
                {children}
            </div>
        </div>
    );
}

/* ── Simple SVG line/area chart ── */

function LineChart() {
    const pts = [32, 28, 40, 36, 52, 46, 64, 58, 76, 70, 88];
    const w = 520;
    const h = 170;
    const max = 100;
    const step = w / (pts.length - 1);
    const coords = pts.map((p, i) => [i * step, h - (p / max) * (h - 20)]);
    const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" ");
    const area = `${line} L${w},${h} L0,${h} Z`;

    return (
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <defs>
                <linearGradient id="finArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(74,144,217,0.35)" />
                    <stop offset="100%" stopColor="rgba(74,144,217,0)" />
                </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" y1={h * g} x2={w} y2={h * g} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            <path d={area} fill="url(#finArea)" />
            <path d={line} fill="none" stroke="#4a90d9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {coords.map((c, i) =>
                i === coords.length - 1 ? (
                    <circle key={i} cx={c[0]} cy={c[1]} r="4.5" fill="#7ab8f0" stroke="#0b0f1a" strokeWidth="2.5" />
                ) : null
            )}
        </svg>
    );
}

/* ── Screen 1: Overview ── */

export function DashboardOverview({ lang }: { lang: Lang }) {
    const kpis = [
        { icon: <IconReportMoney size={18} stroke={1.7} />, es: "Ingresos", en: "Revenue", value: "$248.9k", trend: "+12.4%", up: true },
        { icon: <IconCreditCard size={18} stroke={1.7} />, es: "Gastos", en: "Expenses", value: "$86.2k", trend: "-3.1%", up: false },
        { icon: <IconWallet size={18} stroke={1.7} />, es: "Beneficio neto", en: "Net profit", value: "$162.7k", trend: "+18.9%", up: true },
        { icon: <IconUsers size={18} stroke={1.7} />, es: "Clientes activos", en: "Active clients", value: "1,284", trend: "+5.6%", up: true },
    ];

    const txs = [
        { name: "Northwind Co.", color: "#4a90d9", amount: "$12,400", status: "ok", date: "30 May" },
        { name: "Acme Industries", color: "#34d399", amount: "$8,950", status: "ok", date: "29 May" },
        { name: "Lumen Studio", color: "#fbbf24", amount: "$3,200", status: "pend", date: "29 May" },
        { name: "Vertex Labs", color: "#a78bfa", amount: "$21,750", status: "ok", date: "28 May" },
    ];

    return (
        <DashboardShell active="overview" lang={lang}>
            <div className={s.content}>
                <div>
                    <h2 className={s.pageTitle}>{tt(lang, "Resumen financiero", "Financial overview")}</h2>
                    <p className={s.pageSub}>{tt(lang, "Actualizado en tiempo real · Mayo 2026", "Updated in real time · May 2026")}</p>
                </div>

                <div className={s.kpiGrid}>
                    {kpis.map((k, i) => (
                        <div key={i} className={s.card}>
                            <div className={s.kpiHead}>
                                <div className={s.kpiIcon}>{k.icon}</div>
                                <span className={k.up ? s.trendUp : s.trendDown}>
                                    {k.up ? <IconArrowUpRight size={13} stroke={2} /> : <IconArrowDownRight size={13} stroke={2} />}
                                    {k.trend}
                                </span>
                            </div>
                            <div className={s.kpiLabel}>{tt(lang, k.es, k.en)}</div>
                            <div className={s.kpiValue}>{k.value}</div>
                        </div>
                    ))}
                </div>

                <div className={s.chartRow}>
                    <div className={s.card} style={{ display: "flex", flexDirection: "column" }}>
                        <div className={s.cardHead}>
                            <span className={s.cardTitle}>{tt(lang, "Ingresos por mes", "Revenue by month")}</span>
                            <span className={s.pill}>
                                <IconChartLine size={13} stroke={1.8} />
                                {tt(lang, "Tiempo real", "Live")}
                            </span>
                        </div>
                        <div style={{ flex: 1, minHeight: 0 }}>
                            <LineChart />
                        </div>
                    </div>

                    <div className={s.card} style={{ display: "flex", flexDirection: "column" }}>
                        <div className={s.cardHead}>
                            <span className={s.cardTitle}>{tt(lang, "Transacciones", "Transactions")}</span>
                        </div>
                        <div className={s.table}>
                            {txs.map((t, i) => (
                                <div key={i} className={s.tableRow} style={{ gridTemplateColumns: "1.4fr 0.9fr" }}>
                                    <div className={s.txName}>
                                        <div className={s.txAvatar} style={{ background: `${t.color}22`, color: t.color }}>
                                            {t.name[0]}
                                        </div>
                                        <div style={{ overflow: "hidden" }}>
                                            <div style={{ fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{t.date}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right", fontWeight: 600 }}>{t.amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}

/* ── Screen 2: Analytics ── */

export function DashboardAnalytics({ lang }: { lang: Lang }) {
    const bars = [
        { label: "Q1", h: 52 },
        { label: "Q2", h: 68 },
        { label: "Q3", h: 44 },
        { label: "Q4", h: 80 },
        { label: "Q5", h: 62 },
        { label: "Q6", h: 92 },
    ];
    const segs = [
        { es: "Suscripciones", en: "Subscriptions", pct: 48, color: "#4a90d9" },
        { es: "Servicios", en: "Services", pct: 31, color: "#34d399" },
        { es: "Licencias", en: "Licenses", pct: 21, color: "#a78bfa" },
    ];
    // donut stroke offsets
    const C = 2 * Math.PI * 42;
    let acc = 0;

    return (
        <DashboardShell active="analytics" lang={lang}>
            <div className={s.content}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div>
                        <h2 className={s.pageTitle}>{tt(lang, "Análisis de ingresos", "Revenue analytics")}</h2>
                        <p className={s.pageSub}>{tt(lang, "Comparativa por trimestre y fuente", "Quarterly & source breakdown")}</p>
                    </div>
                    <span className={s.ghostBtn}>
                        <IconFilter size={14} stroke={1.7} />
                        {tt(lang, "Filtrar", "Filter")}
                    </span>
                </div>

                <div className={s.chartRow}>
                    <div className={s.card} style={{ display: "flex", flexDirection: "column" }}>
                        <div className={s.cardHead}>
                            <span className={s.cardTitle}>{tt(lang, "Crecimiento trimestral", "Quarterly growth")}</span>
                            <span className={s.trendUp}>
                                <IconArrowUpRight size={13} stroke={2} /> +24.8%
                            </span>
                        </div>
                        <div className={s.barWrap}>
                            {bars.map((b, i) => (
                                <div key={i} className={s.barCol}>
                                    <div className={s.bar} style={{ height: `${b.h}%` }} />
                                    <span className={s.barLabel}>{b.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={s.card} style={{ display: "flex", flexDirection: "column" }}>
                        <div className={s.cardHead}>
                            <span className={s.cardTitle}>{tt(lang, "Fuentes de ingreso", "Revenue sources")}</span>
                            <IconChartPie size={16} stroke={1.6} color="rgba(255,255,255,0.4)" />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
                            <svg viewBox="0 0 100 100" style={{ width: 130, height: 130 }}>
                                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="11" />
                                {segs.map((seg, i) => {
                                    const len = (seg.pct / 100) * C;
                                    const off = -acc;
                                    acc += len;
                                    return (
                                        <circle
                                            key={i}
                                            cx="50"
                                            cy="50"
                                            r="42"
                                            fill="none"
                                            stroke={seg.color}
                                            strokeWidth="11"
                                            strokeDasharray={`${len} ${C - len}`}
                                            strokeDashoffset={off}
                                            transform="rotate(-90 50 50)"
                                            strokeLinecap="round"
                                        />
                                    );
                                })}
                                <text x="50" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">$248k</text>
                                <text x="50" y="60" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.4)">{tt(lang, "TOTAL", "TOTAL")}</text>
                            </svg>
                        </div>
                        <div>
                            {segs.map((seg, i) => (
                                <div key={i} className={s.legendRow}>
                                    <span className={s.legendDot} style={{ background: seg.color }} />
                                    {tt(lang, seg.es, seg.en)}
                                    <span style={{ marginLeft: "auto", fontWeight: 600, color: "#fff" }}>{seg.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}

/* ── Screen 3: Reports ── */

export function DashboardReports({ lang }: { lang: Lang }) {
    const reports = [
        { es: "Estado de resultados", en: "Income statement", sub: "PDF · 2.4 MB", date: "30 May 2026" },
        { es: "Flujo de caja mensual", en: "Monthly cash flow", sub: "XLSX · 1.1 MB", date: "28 May 2026" },
        { es: "Balance general Q2", en: "Q2 balance sheet", sub: "PDF · 3.0 MB", date: "24 May 2026" },
        { es: "Reporte de impuestos", en: "Tax report", sub: "PDF · 980 KB", date: "20 May 2026" },
    ];

    return (
        <DashboardShell active="reports" lang={lang}>
            <div className={s.content}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div>
                        <h2 className={s.pageTitle}>{tt(lang, "Reportes automáticos", "Automated reports")}</h2>
                        <p className={s.pageSub}>{tt(lang, "Generados y exportados sin intervención", "Generated & exported automatically")}</p>
                    </div>
                    <span className={s.ghostBtn} style={{ background: "linear-gradient(135deg,#4a90d9,#7ab8f0)", color: "#fff", border: "none" }}>
                        <IconReceipt size={14} stroke={1.7} />
                        {tt(lang, "Nuevo reporte", "New report")}
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {reports.map((r, i) => (
                        <div key={i} className={s.listRow}>
                            <div className={s.listIcon}>
                                <IconFileAnalytics size={19} stroke={1.6} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{tt(lang, r.es, r.en)}</div>
                                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{r.sub} · {r.date}</div>
                            </div>
                            <span className={`${s.badge} ${s.badgeOk}`}>{tt(lang, "Listo", "Ready")}</span>
                            <span className={s.ghostBtn}>
                                <IconDownload size={14} stroke={1.7} />
                                {tt(lang, "Descargar", "Download")}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardShell>
    );
}
