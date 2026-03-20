import { motion } from 'framer-motion';
import './Homepage.css';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
};

export default function Homepage() {
    return (
        <section id="surprise" className="homepage">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Decorative crescent */}
                <motion.div
                    className="homepage-crescent"
                    variants={itemVariants}
                >
                    🌙
                </motion.div>

                <motion.h3 className="homepage-subtitle" variants={itemVariants}>
                    Pleasant Surprise
                </motion.h3>

                {/* Decorative divider */}
                <motion.div className="homepage-divider" variants={itemVariants}>
                    <span className="divider-line"></span>
                    <span className="divider-ornament">✦</span>
                    <span className="divider-line"></span>
                </motion.div>

                <motion.div className="homepage-eid-wrapper" variants={itemVariants}>
                    <p className="homepage-eid-label">Eid Mubarak</p>
                </motion.div>

                <motion.div className="homepage-name-wrapper" variants={itemVariants}>
                    <p className="homepage-to-my">To my</p>
                    <h1 className="homepage-name">Saarah 💫</h1>
                </motion.div>

                <motion.p className="homepage-paragraph" variants={itemVariants}>
                    Ramzan Mubarak, Hosneara 🌙✨💖 In this beautiful and blessed month 🤲, I pray that Allah fills your life with peace 🕊️, happiness 😊, and endless blessings 🌸✨. May all your prayers be answered 🤍 and your heart always stay calm and strong 💫. You mean so much to me 🥺❤️, and I feel truly lucky to have you in my life 💕.<br />
                    Let's celebrate this special time together 🥰🤝✨, filled with talks 🗣️, laughter 😂, and peaceful moments 🕊️ that we'll always remember 💭💕. Being with you makes everything feel more meaningful 😌❤️, and I truly feel lucky 🫣 to have you in my life 💕🤞🏻. I pray that this Ramzan brings you endless happiness 🤲🏻😊, peace 🕊️, and all the blessings 🤲✨ your heart deserves 💗. Can't wait to spend this beautiful day with you 😍🙈🙈🌸.
                </motion.p>

                <motion.p className="homepage-signature" variants={itemVariants}>
                    Tabish ♾️ Saarah
                </motion.p>
            </motion.div>
        </section>
    );
}
