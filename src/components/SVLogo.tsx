import React from 'react';

export default function SVLogo({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) {
    return (
        <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
            <text x="25" y="74" fontFamily="Arial, sans-serif" fontSize="70" fontWeight="300" textAnchor="middle" fill="currentColor">{"{"}</text>
            <path fill="currentColor" d="M 38 30 L 52 30 L 52 42 L 44 42 L 44 49 L 52 49 L 52 74 L 38 74 L 38 62 L 46 62 L 46 55 L 38 55 Z" />
            <polygon fill="currentColor" points="56,30 64,30 70,60 76,30 84,30 73,74 67,74" />
            <text x="97" y="74" fontFamily="Arial, sans-serif" fontSize="70" fontWeight="300" textAnchor="middle" fill="currentColor">{"}"}</text>
        </svg>
    );
}
