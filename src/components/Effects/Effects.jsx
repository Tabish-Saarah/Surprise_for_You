import { useState, useEffect, useCallback, useRef, memo } from 'react';
import './Effects.css';

// ─── Floating Background Particles (optimized: fewer particles, GPU-friendly) ───
const PARTICLE_COUNT = 24;
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

export const FloatingParticles = memo(function FloatingParticles() {
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
});

// ─── Click/Tap Sparkle Burst (optimized: direct DOM manipulation, no React re-renders) ───
const SPARKLE_EMOJIS = ['✨', '🌙', '⭐', '🤲', '💫', '✦'];
const MAX_SPARKLES = 30;
const THROTTLE_MS = 100;

export const SparkleOnClick = memo(function SparkleOnClick() {
    const containerRef = useRef(null);
    const lastTrigger = useRef(0);
    const activeCount = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const spawnSparkles = (clientX, clientY) => {
            const now = performance.now();
            // Throttle rapid clicks/taps
            if (now - lastTrigger.current < THROTTLE_MS) return;
            // Cap total active sparkles
            if (activeCount.current >= MAX_SPARKLES) return;
            lastTrigger.current = now;

            const count = 5 + Math.floor(Math.random() * 3);
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
                const dist = 45 + Math.random() * 55;
                const tx = Math.cos(angle) * dist;
                const ty = Math.sin(angle) * dist;
                const emoji = SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)];
                const size = 10 + Math.random() * 10;
                const rotation = Math.random() * 360;

                const el = document.createElement('span');
                el.className = 'sparkle';
                el.textContent = emoji;
                el.style.cssText = `left:${clientX}px;top:${clientY}px;font-size:${size}px;--tx:${tx}px;--ty:${ty}px;--rot:${rotation}deg;`;
                fragment.appendChild(el);
                activeCount.current++;

                // Self-cleanup after animation ends
                el.addEventListener('animationend', () => {
                    el.remove();
                    activeCount.current--;
                }, { once: true });
            }

            container.appendChild(fragment);
        };

        const onClick = (e) => spawnSparkles(e.clientX, e.clientY);
        const onTouch = (e) => {
            const t = e.touches[0];
            if (t) spawnSparkles(t.clientX, t.clientY);
        };

        window.addEventListener('click', onClick);
        window.addEventListener('touchstart', onTouch, { passive: true });
        return () => {
            window.removeEventListener('click', onClick);
            window.removeEventListener('touchstart', onTouch);
        };
    }, []);

    return <div className="sparkle-container" ref={containerRef} />;
});
