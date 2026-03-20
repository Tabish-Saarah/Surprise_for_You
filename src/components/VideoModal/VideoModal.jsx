import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECRET_VIDEOS } from '../../data/video';
import './VideoModal.css';

export default function VideoModal({ isOpen, onClose }) {
    const videoRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoError, setVideoError] = useState({});
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentVideo = SECRET_VIDEOS[currentIndex];

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            setCurrentIndex(0);
            setVideoError({});
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => document.body.classList.remove('no-scroll');
    }, [isOpen]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]);

    const handleClose = () => {
        if (videoRef.current) videoRef.current.pause();
        onClose();
    };

    const goToNext = useCallback(() => {
        setIsTransitioning(true);
        if (videoRef.current) videoRef.current.pause();

        setTimeout(() => {
            // Loop back to first video after last
            setCurrentIndex((prev) => (prev + 1) % SECRET_VIDEOS.length);
            setIsTransitioning(false);
        }, 300);
    }, []);

    const goToPrev = useCallback(() => {
        setIsTransitioning(true);
        if (videoRef.current) videoRef.current.pause();

        setTimeout(() => {
            // Loop to last video if at first
            setCurrentIndex((prev) =>
                prev === 0 ? SECRET_VIDEOS.length - 1 : prev - 1
            );
            setIsTransitioning(false);
        }, 300);
    }, []);

    // Auto-play current video when it loads
    const handleVideoLoaded = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    };

    // When a video ends, auto-advance to the next one (loops)
    const handleVideoEnded = () => {
        goToNext();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) handleClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="video-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        className="video-modal"
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.85, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Close button — top-right corner */}
                        <button className="modal-close-btn" onClick={handleClose}>
                            ✕
                        </button>

                        {/* Video counter */}
                        <div className="video-counter">
                            {currentIndex + 1} / {SECRET_VIDEOS.length}
                        </div>

                        {videoError[currentIndex] ? (
                            <div className="video-error">
                                <p>Video not available. Add your video to /public/videos/</p>
                            </div>
                        ) : (
                            <div className="video-player-wrapper">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        className="video-slide"
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -40 }}
                                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    >
                                        <video
                                            ref={videoRef}
                                            controls
                                            playsInline
                                            onLoadedData={handleVideoLoaded}
                                            onEnded={handleVideoEnded}
                                            onError={() =>
                                                setVideoError((prev) => ({
                                                    ...prev,
                                                    [currentIndex]: true,
                                                }))
                                            }
                                        >
                                            <source
                                                src={currentVideo.src}
                                                type={currentVideo.type}
                                            />
                                        </video>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation arrows */}
                                <button
                                    className="video-nav-btn video-nav-prev"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToPrev();
                                    }}
                                    aria-label="Previous video"
                                >
                                    ‹
                                </button>
                                <button
                                    className="video-nav-btn video-nav-next"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                    aria-label="Next video"
                                >
                                    ›
                                </button>
                            </div>
                        )}

                        {/* Video dots indicator */}
                        <div className="video-dots">
                            {SECRET_VIDEOS.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`video-dot ${idx === currentIndex ? 'active' : ''}`}
                                    onClick={() => {
                                        if (videoRef.current) videoRef.current.pause();
                                        setCurrentIndex(idx);
                                    }}
                                    aria-label={`Go to video ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
