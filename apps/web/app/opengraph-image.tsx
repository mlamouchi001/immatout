import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Immatout — Calcul officiel du coût de la carte grise (France 2026)';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 72,
        color: '#f8fafc',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, opacity: 0.8 }}>
        <span
          style={{
            display: 'flex',
            width: 40,
            height: 40,
            borderRadius: 10,
            background: '#3b82f6',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          🚘
        </span>
        <span>Immatout · Carte grise 2026</span>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
          Calcul officiel
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2, color: '#60a5fa' }}>
          du coût de la carte grise
        </div>
        <div style={{ fontSize: 28, marginTop: 28, opacity: 0.8 }}>
          CIBS · Loi de Finances 2026 · 18 régions · Export PDF
        </div>
      </div>
    </div>,
    size,
  );
}
