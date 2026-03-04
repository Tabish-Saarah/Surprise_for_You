import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SLIDESHOW_MEMORIES } from '../../data/slideshow';
import './WinOverlay.css';

export default function WinOverlay({ onClose }) {
    const [phase, setPhase] = useState('message'); // 'message' | 'slideshow'
    const [slideIndex, setSlideIndex] = useState(0);
    const [imgError, setImgError] = useState({});

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => document.body.classList.remove('no-scroll');
    }, []);

    useEffect(() => {
        if (phase === 'message') {
            const timer = setTimeout(() => setPhase('slideshow'), 4000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const handleTap = () => {
        if (phase === 'message') {
            setPhase('slideshow');
            return;
        }
        if (slideIndex < SLIDESHOW_MEMORIES.length - 1) {
            setSlideIndex((i) => i + 1);
        } else {
            onClose();
        }
    };

    const currentSlide = SLIDESHOW_MEMORIES[slideIndex];

    return (
        <motion.div
            className="win-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleTap}
        >
            <AnimatePresence mode="wait">
                {phase === 'message' && (
                    <motion.div
                        className="win-message"
                        key="message"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            You won 🥳🥳
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            Finally atleast in this game you showcased your memory skills 😜😝
                        </motion.p>
                        <motion.p
                            className="win-heart"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            Jokes apart you are my true one 🫶🏻🥰
                        </motion.p>
                    </motion.div>
                )}

                {phase === 'slideshow' && (
                    <motion.div
                        className="slideshow"
                        key={`slide-${slideIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="slideshow-counter">
                            {slideIndex + 1} / {SLIDESHOW_MEMORIES.length}
                        </span>

                        <div className="slideshow-image-container">
                            {imgError[currentSlide.id] ? (
                                <div className="slideshow-placeholder">
                                    📷
                                    <span>Memory photo</span>
                                </div>
                            ) : (
                                <img
                                    className="slideshow-image"
                                    src={currentSlide.src}
                                    alt={currentSlide.caption}
                                    onError={() =>
                                        setImgError((prev) => ({ ...prev, [currentSlide.id]: true }))
                                    }
                                />
                            )}
                        </div>

                        <p className="slideshow-caption">{currentSlide.caption}</p>
                        <p className="slideshow-date">{currentSlide.date}</p>

                        <span className="slideshow-hint">Tap to continue</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
