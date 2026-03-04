import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_PHOTOS } from '../../data/photos';
import './PhotoCarousel.css';

const imageVariants = {
    enter: { opacity: 0, scale: 1.03 },
    center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.5 } },
};

export default function PhotoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imgError, setImgError] = useState({});

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(goNext, 3000);
        return () => clearInterval(timer);
    }, [goNext]);

    const handleClick = () => goNext();

    const currentPhoto = GALLERY_PHOTOS[currentIndex];

    return (
        <section id="photos" className="photo-section">
            <motion.h4
                className="section-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Our Moments ✨
            </motion.h4>

            <motion.div
                className="carousel-container"
                onClick={handleClick}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        style={{ position: 'absolute', inset: 0 }}
                    >
                        {imgError[currentPhoto.id] ? (
                            <div className="carousel-placeholder">
                                📷
                                <span>Photo placeholder</span>
                            </div>
                        ) : (
                            <img
                                className="carousel-image"
                                src={currentPhoto.src}
                                alt={currentPhoto.caption}
                                onError={() =>
                                    setImgError((prev) => ({ ...prev, [currentPhoto.id]: true }))
                                }
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.p
                    className="carousel-caption"
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {currentPhoto.caption}
                </motion.p>
            </AnimatePresence>

            <div className="carousel-dots">
                {GALLERY_PHOTOS.map((_, i) => (
                    <button
                        key={i}
                        className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(i);
                        }}
                        aria-label={`Go to photo ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
