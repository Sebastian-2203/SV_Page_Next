import React from 'react';

export function SVLogoIcon({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) {
    return (
        <div 
            className={`logo-pulse ${className}`} 
            style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                border: "2px solid var(--color-brand)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--color-bg-primary)",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "var(--color-brand)",
                userSelect: "none",
                ...style
            }}
        >
            {"{SV}"}
        </div>
    );
}

export default function SVLogo({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", ...style }} className={className}>
            <SVLogoIcon />
            <span style={{ 
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em"
            }}>
                SyV <span style={{ color: "var(--color-text-secondary)", fontWeight: 400 }}>Solutions</span>
            </span>
        </div>
    );
}
