import { motion } from 'framer-motion';
import './Homepage.css';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
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
                <motion.h3 className="homepage-subtitle" variants={itemVariants}>
                    Pleasant Surprise
                </motion.h3>

                <motion.div className="homepage-name-wrapper" variants={itemVariants}>
                    <p className="homepage-to-my">To my</p>
                    <h1 className="homepage-name">Saarah 💫</h1>
                </motion.div>

                <motion.p className="homepage-paragraph" variants={itemVariants}>
                    Short emotional paragraph will be added here.
                </motion.p>
            </motion.div>
        </section>
    );
}
