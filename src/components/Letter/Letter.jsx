import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Letter.css';

const letterLines = [
    { text: 'Hiii My dear Saarah.. ❤️😉', className: 'letter-greeting' },
    { text: 'Here is a little surprise for you,' },
    { text: 'just an emotional moment shared by me.' },
    { text: '' },
    { text: 'We crossed days, months, years' },
    { text: 'with too much love, fights, jokes,' },
    { text: 'and funny moments…' },
    { text: '' },
    { text: 'This will continue forever… always!!' },
];

const highlightLine = 'I friend you Saarah 🎀 🫶🏻';

export default function Letter({ onDismiss }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showHighlight, setShowHighlight] = useState(false);
    const [showSwipeHint, setShowSwipeHint] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const touchStartY = useRef(0);
    const containerRef = useRef(null);

    const handleEnvelopeTap = () => {
        if (isOpen) return;
        setIsOpen(true);
        setTimeout(() => setShowContent(true), 800);
    };

    useEffect(() => {
        if (showContent) {
            const totalDelay = letterLines.length * 300 + 600;
            setTimeout(() => setShowHighlight(true), totalDelay);
            setTimeout(() => setShowSwipeHint(true), totalDelay + 800);
        }
    }, [showContent]);

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => document.body.classList.remove('no-scroll');
    }, []);

    const handleTouchStart = (e) => {
        if (!showSwipeHint) return;
        touchStartY.current = e.touches[0].clientY;
        setIsDragging(true);
    };

    const handleTouchEnd = (e) => {
        if (!showSwipeHint || !isDragging) return;
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY.current - touchEndY;
        if (diff > 50) {
            onDismiss();
        }
        setIsDragging(false);
    };

    const handleScroll = (e) => {
        if (!showSwipeHint) return;
        if (e.deltaY > 30) {
            onDismiss();
        }
    };

    return (
        <motion.div
            className="letter-container"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleScroll}
            exit={{ opacity: 0, y: '-30vh', scale: 0.95 }}
            transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="envelope" onClick={handleEnvelopeTap}>
                {/* Envelope flap */}
                <div className={`envelope-flap ${isOpen ? 'is-open' : ''}`}>
                    <div className="flap-front" />
                    <div className="flap-back" />
                </div>

                {/* Envelope body */}
                <div className={`envelope-body ${isOpen ? 'is-open' : ''}`}>
                    {/* Front label — show before opening */}
                    {!showContent && (
                        <motion.div
                            className="envelope-front-label"
                            animate={isOpen ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2>Dear Saarah</h2>
                            {!isOpen && <p>Tap to fully open</p>}
                        </motion.div>
                    )}

                    {/* Letter content — show after opening */}
                    <AnimatePresence>
                        {showContent && (
                            <motion.div
                                className="letter-content"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            >
                                {letterLines.map((line, i) =>
                                    line.text === '' ? (
                                        <motion.br
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.3 }}
                                        />
                                    ) : (
                                        <motion.p
                                            key={i}
                                            className={line.className || ''}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: i * 0.3,
                                                duration: 0.5,
                                                ease: [0.4, 0, 0.2, 1],
                                            }}
                                        >
                                            {line.text}
                                        </motion.p>
                                    )
                                )}

                                {showHighlight && (
                                    <motion.p
                                        className="letter-highlight"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        {highlightLine}
                                    </motion.p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Swipe indicator */}
                <AnimatePresence>
                    {showSwipeHint && (
                        <motion.div
                            className="swipe-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDismiss();
                            }}
                        >
                            <span>Swipe up to continue</span>
                            <div className="arrow">↓</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
