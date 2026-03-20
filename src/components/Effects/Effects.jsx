import { useState, useEffect, useCallback, useRef } from 'react';
import './Effects.css';

// ─── Floating Background Particles ───
const PARTICLE_COUNT = 20;
const PARTICLE_SYMBOLS = ['✨', '🌙', '⭐', '·', '·', '·', '·', '✦', '✧'];

function createParticle(index) {
    const isEmoji = Math.random() > 0.65;
    const symbol = isEmoji
        ? PARTICLE_SYMBOLS[Math.floor(Math.random() * 3)]
        : null;
    return {
        id: index,
        left: Math.random() * 100,
        size: isEmoji ? Math.random() * 12 + 8 : Math.random() * 4 + 2,
        duration: Math.random() * 18 + 12,
        delay: Math.random() * 18,
        opacity: Math.random() * 0.3 + 0.08,
        symbol,
        drift: (Math.random() - 0.5) * 60,
        color: isEmoji
            ? undefined
            : Math.random() > 0.5
                ? 'rgba(46,196,182,0.35)'
                : 'rgba(212,168,67,0.3)',
    };
}

export function FloatingParticles() {
    const [particles] = useState(() =>
        Array.from({ length: PARTICLE_COUNT }, (_, i) => createParticle(i))
    );

    return (
        <div className="floating-particles">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.left}%`,
                        width: p.symbol ? 'auto' : `${p.size}px`,
                        height: p.symbol ? 'auto' : `${p.size}px`,
                        background: p.symbol ? 'transparent' : p.color,
                        fontSize: p.symbol ? `${p.size}px` : undefined,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        '--particle-opacity': p.opacity,
                        '--particle-drift': `${p.drift}px`,
                    }}
                >
                    {p.symbol}
                </div>
            ))}
        </div>
    );
}

// ─── Click/Tap Sparkle Burst ───
const SPARKLE_EMOJIS = ['✨', '🌙', '⭐', '🤲', '💫', '✦'];

function createSparkles(x, y) {
    const count = 7 + Math.floor(Math.random() * 5);
    return Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const dist = 45 + Math.random() * 60;
        return {
            id: Date.now() + i,
            x,
            y,
            tx: Math.cos(angle) * dist,
            ty: Math.sin(angle) * dist,
            emoji: SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)],
            size: 10 + Math.random() * 12,
            rotation: Math.random() * 360,
        };
    });
}

export function SparkleOnClick() {
    const [sparkles, setSparkles] = useState([]);
    const timeoutRef = useRef(null);

    const handleInteraction = useCallback((clientX, clientY) => {
        const newSparkles = createSparkles(clientX, clientY);
        setSparkles((prev) => [...prev, ...newSparkles]);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => Date.now() - s.id < 900));
        }, 1000);
    }, []);

    useEffect(() => {
        const onClick = (e) => handleInteraction(e.clientX, e.clientY);
        const onTouch = (e) => {
            const t = e.touches[0];
            if (t) handleInteraction(t.clientX, t.clientY);
        };

        window.addEventListener('click', onClick);
        window.addEventListener('touchstart', onTouch, { passive: true });
        return () => {
            window.removeEventListener('click', onClick);
            window.removeEventListener('touchstart', onTouch);
        };
    }, [handleInteraction]);

    return (
        <div className="sparkle-container">
            {sparkles.map((s) => (
                <span
                    key={s.id}
                    className="sparkle"
                    style={{
                        left: s.x,
                        top: s.y,
                        fontSize: `${s.size}px`,
                        '--tx': `${s.tx}px`,
                        '--ty': `${s.ty}px`,
                        '--rot': `${s.rotation}deg`,
                    }}
                >
                    {s.emoji}
                </span>
            ))}
        </div>
    );
}
