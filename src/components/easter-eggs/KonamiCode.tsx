'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

const KONAMI_SEQUENCE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

const CONFETTI_COLORS = [
    '#10b981', '#8b5cf6', '#f59e0b',
    '#ef4444', '#3b82f6', '#ec4899',
    '#14b8a6', '#f97316',
];
const CONFETTI_SHAPES = ['■', '●', '▲', '★', '♦', '◆', '✦', '❖', '✿', '❋'];

interface ConfettiPiece {
    id: number;
    left: string;
    delay: string;
    duration: string;
    color: string;
    char: string;
    size: string;
}

// Deterministic layout so no hydration mismatch (component returns null initially anyway)
const CONFETTI: ConfettiPiece[] = Array.from({ length: 75 }, (_, i) => ({
    id: i,
    left: `${((i * 1.347) % 100).toFixed(1)}%`,
    delay: `${((i % 18) * 0.09).toFixed(2)}s`,
    duration: `${(2.4 + (i % 6) * 0.4).toFixed(1)}s`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    char: CONFETTI_SHAPES[i % CONFETTI_SHAPES.length],
    size: `${10 + (i % 12)}px`,
}));

export default function KonamiCode() {
    const [active, setActive] = useState(false);
    const keysRef = useRef<string[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const activate = useCallback(() => {
        setActive(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setActive(false), 7000);
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            keysRef.current = [...keysRef.current, e.key].slice(-KONAMI_SEQUENCE.length);
            if (keysRef.current.join(',') === KONAMI_SEQUENCE.join(',')) {
                keysRef.current = [];
                activate();
            }
        };

        const onParty = () => activate();

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('hakki:party', onParty);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('hakki:party', onParty);
        };
    }, [activate]);

    if (!active) return null;

    return (
        <div
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => setActive(false)}
            aria-hidden
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Confetti */}
            {CONFETTI.map((p) => (
                <span
                    key={p.id}
                    className="absolute top-0 select-none pointer-events-none"
                    style={{
                        left: p.left,
                        color: p.color,
                        fontSize: p.size,
                        animation: `confetti-fall ${p.duration} ${p.delay} ease-in forwards`,
                    }}
                >
                    {p.char}
                </span>
            ))}

            {/* Message */}
            <div
                className="relative z-10 text-center px-6"
                style={{ animation: 'scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
            >
                <div className="text-8xl mb-6" style={{ animation: 'spin-once 0.6s ease-out' }}>🎮</div>
                <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
                    CHEAT CODE
                </h2>
                <p
                    className="text-3xl sm:text-4xl font-black mt-1"
                    style={{ color: '#818cf8' }}
                >
                    UNLOCKED!
                </p>
                <p className="text-base sm:text-lg text-white/60 mt-5">
                    You found a secret easter egg&nbsp;🥚
                </p>
                <p className="text-xs text-white/25 mt-8 font-mono tracking-wide">
                    ↑ ↑ ↓ ↓ ← → ← → B A
                </p>
                <p className="text-xs text-white/30 mt-4">Click anywhere to dismiss</p>
            </div>
        </div>
    );
}
