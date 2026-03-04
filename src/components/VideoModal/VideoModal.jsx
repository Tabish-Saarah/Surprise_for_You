import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECRET_VIDEO } from '../../data/video';
import './VideoModal.css';

export default function VideoModal({ isOpen, onClose }) {
    const videoRef = useRef(null);
    const [ended, setEnded] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            setEnded(false);
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => document.body.classList.remove('no-scroll');
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    const handleClose = () => {
        if (videoRef.current) videoRef.current.pause();
        onClose();
    };

    const handleReplay = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setEnded(false);
        }
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
                        <button className="modal-close-btn" onClick={handleClose}>
                            ✕
                        </button>

                        {videoError ? (
                            <div className="video-error">
                                <p>Video not available. Add your video to /public/videos/secret.mp4</p>
                            </div>
                        ) : (
                            <>
                                <video
                                    ref={videoRef}
                                    controls
                                    playsInline
                                    onEnded={() => setEnded(true)}
                                    onError={() => setVideoError(true)}
                                >
                                    <source src={SECRET_VIDEO.src} type={SECRET_VIDEO.type} />
                                </video>

                                {ended && (
                                    <motion.div
                                        className="replay-overlay"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <button className="replay-btn" onClick={handleReplay}>
                                            ▶ Replay
                                        </button>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
