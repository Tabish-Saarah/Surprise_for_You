import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Letter from './components/Letter/Letter';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import PhotoCarousel from './components/PhotoCarousel/PhotoCarousel';
import MemoryGame from './components/MemoryGame/MemoryGame';
import WinOverlay from './components/WinOverlay/WinOverlay';
import VideoModal from './components/VideoModal/VideoModal';
import { FloatingParticles, SparkleOnClick } from './components/Effects/Effects';
import './App.css';

export default function App() {
  const [letterDismissed, setLetterDismissed] = useState(false);
  const [showWinOverlay, setShowWinOverlay] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      {/* Ambient particles + Click sparkles */}
      <FloatingParticles />
      <SparkleOnClick />

      {/* Letter intro */}
      <AnimatePresence>
        {!letterDismissed && (
          <Letter onDismiss={() => setLetterDismissed(true)} />
        )}
      </AnimatePresence>

      {/* Main page content */}
      {letterDismissed && (
        <>
          {/* Scroll progress bar */}
          <motion.div
            className="scroll-progress"
            style={{ scaleX }}
          />

          <Navbar />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Homepage />
            <PhotoCarousel />
            <MemoryGame onWin={() => setShowWinOverlay(true)} />

            {/* Secret video section */}
            <section id="secret" className="video-section">
              <motion.h4
                className="section-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '40px',
                }}
              >
                Something Special 🤫
              </motion.h4>

              <motion.button
                className="secret-btn"
                onClick={() => setShowVideoModal(true)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Secret
              </motion.button>
            </section>

            {/* Footer */}
            <footer className="app-footer">
              <p className="footer-text">Made with ❤️ for Saarah</p>
            </footer>
          </motion.main>
        </>
      )}

      {/* Win overlay */}
      <AnimatePresence>
        {showWinOverlay && (
          <WinOverlay onClose={() => setShowWinOverlay(false)} />
        )}
      </AnimatePresence>

      {/* Video modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </>
  );
}
