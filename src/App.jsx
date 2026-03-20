import { useState, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Letter from './components/Letter/Letter';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import { FloatingParticles, SparkleOnClick } from './components/Effects/Effects';
import './App.css';

// Lazy-load heavier sections so they don't block the transition
const PhotoCarousel = lazy(() => import('./components/PhotoCarousel/PhotoCarousel'));
const MemoryGame = lazy(() => import('./components/MemoryGame/MemoryGame'));
const WinOverlay = lazy(() => import('./components/WinOverlay/WinOverlay'));
const VideoModal = lazy(() => import('./components/VideoModal/VideoModal'));
const LetterPage = lazy(() => import('./components/LetterPage/LetterPage'));

// Scroll progress bar — extracted so useScroll only runs when mounted
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export default function App() {
  const [letterDismissed, setLetterDismissed] = useState(false);
  const [letterExitDone, setLetterExitDone] = useState(false);
  const [showWinOverlay, setShowWinOverlay] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleWin = useCallback(() => setShowWinOverlay(true), []);

  return (
    <>
      {/* Ambient particles — only after letter exit finishes to reduce GPU work */}
      {letterExitDone && <FloatingParticles />}
      <SparkleOnClick />

      {/* Letter intro — fades out on top (z-index:5000) */}
      <AnimatePresence onExitComplete={() => setLetterExitDone(true)}>
        {!letterDismissed && (
          <Letter onDismiss={() => setLetterDismissed(true)} />
        )}
      </AnimatePresence>

      {/*
        Main page content — mounts as soon as "Tap to continue" is pressed.
        The letter sits on top at z-index:5000 and fades out, creating a
        smooth cross-fade with the content appearing underneath.
      */}
      {letterDismissed && (
        <>
          {/* Scroll progress bar — only mounted after letter is gone */}
          <ScrollProgress />

          <Navbar />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Homepage mounts immediately for the cross-fade effect */}
            <Homepage />

            {/* Everything else mounts ONLY AFTER the fade-out animation finishes.
                This prevents React DOM construction from lagging the animation! */}
            {letterExitDone && (
              <>
                <Suspense fallback={null}>
                  <LetterPage />
                  <PhotoCarousel />
                  <MemoryGame onWin={handleWin} />
                </Suspense>

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
                    Something Special 🌟
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
                  <p className="footer-text">Made with ❤️ for Hosneara | Eid Mubarak 🌙</p>
                </footer>
              </>
            )}
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
