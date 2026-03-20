import { motion } from 'framer-motion';
import './LetterPage.css';

const letterLines = [
    { text: 'Hiii My dear Saarah.. ❤️😉', className: 'lp-greeting' },
    { text: 'Here is a little surprise for you,' },
    { text: 'just an emotional moment shared by me.' },
    { text: '' },
    { text: 'We crossed days, months, years' },
    { text: 'with too much love, fights, jokes,' },
    { text: 'and funny moments…' },
    { text: '' },
    { text: 'This will continue forever… always!!' },
];

const highlightLine = 'I friend you Saarah 🌙 🫶🏻';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
};

export default function LetterPage() {
    return (
        <section id="letter" className="letter-page-section">
            <motion.h4
                className="section-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                My Letter 💌
            </motion.h4>

            <motion.div
                className="lp-card"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Corner ornaments */}
                <div className="lp-ornament lp-tl">✦</div>
                <div className="lp-ornament lp-tr">✦</div>
                <div className="lp-ornament lp-bl">✦</div>
                <div className="lp-ornament lp-br">✦</div>

                {letterLines.map((line, i) =>
                    line.text === '' ? (
                        <motion.br key={i} variants={itemVariants} />
                    ) : (
                        <motion.p
                            key={i}
                            className={`lp-line ${line.className || ''}`}
                            variants={itemVariants}
                        >
                            {line.text}
                        </motion.p>
                    )
                )}

                <motion.p className="lp-highlight" variants={itemVariants}>
                    {highlightLine}
                </motion.p>
            </motion.div>
        </section>
    );
}
