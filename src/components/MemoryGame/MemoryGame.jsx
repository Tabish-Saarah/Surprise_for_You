import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GAME_EMOJIS } from '../../data/gameEmojis';
import './MemoryGame.css';

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function createCards() {
    const pairs = GAME_EMOJIS.flatMap((emoji, i) => [
        { id: i * 2, emoji, isFlipped: false, isMatched: false },
        { id: i * 2 + 1, emoji, isFlipped: false, isMatched: false },
    ]);
    return shuffleArray(pairs);
}

export default function MemoryGame({ onWin }) {
    const [cards, setCards] = useState(() => createCards());
    const [selected, setSelected] = useState([]);
    const [isLocked, setIsLocked] = useState(false);
    const [matchedCount, setMatchedCount] = useState(0);
    const [moves, setMoves] = useState(0);
    const [hasWon, setHasWon] = useState(false);

    const totalPairs = GAME_EMOJIS.length;

    const handleCardClick = useCallback(
        (cardId) => {
            if (isLocked || hasWon) return;
            const card = cards.find((c) => c.id === cardId);
            if (!card || card.isFlipped || card.isMatched) return;
            if (selected.length >= 2) return;

            const newCards = cards.map((c) =>
                c.id === cardId ? { ...c, isFlipped: true } : c
            );
            setCards(newCards);

            const newSelected = [...selected, cardId];
            setSelected(newSelected);

            if (newSelected.length === 2) {
                setMoves((m) => m + 1);
                setIsLocked(true);

                const [firstId, secondId] = newSelected;
                const first = newCards.find((c) => c.id === firstId);
                const second = newCards.find((c) => c.id === secondId);

                if (first.emoji === second.emoji) {
                    // Match!
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c) =>
                                c.id === firstId || c.id === secondId
                                    ? { ...c, isMatched: true }
                                    : c
                            )
                        );
                        setMatchedCount((m) => m + 1);
                        setSelected([]);
                        setIsLocked(false);
                    }, 400);
                } else {
                    // No match
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c) =>
                                c.id === firstId || c.id === secondId
                                    ? { ...c, isFlipped: false }
                                    : c
                            )
                        );
                        setSelected([]);
                        setIsLocked(false);
                    }, 800);
                }
            }
        },
        [cards, selected, isLocked, hasWon]
    );

    useEffect(() => {
        if (matchedCount === totalPairs && matchedCount > 0 && !hasWon) {
            setHasWon(true);
            setTimeout(() => onWin(), 1000);
        }
    }, [matchedCount, totalPairs, onWin, hasWon]);

    const resetGame = () => {
        setCards(createCards());
        setSelected([]);
        setIsLocked(false);
        setMatchedCount(0);
        setMoves(0);
        setHasWon(false);
    };

    return (
        <section id="memory-game" className="memory-section">
            <motion.h4
                className="section-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Test Your Memory 🌙
            </motion.h4>

            <div className="game-stats">
                <span>
                    Matches: <strong>{matchedCount}/{totalPairs}</strong>
                </span>
                <span>
                    Moves: <strong>{moves}</strong>
                </span>
            </div>

            <motion.div
                className="game-grid"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="memory-card"
                        onClick={() => handleCardClick(card.id)}
                    >
                        <div
                            className={`card-inner ${card.isFlipped || card.isMatched ? 'flipped' : ''
                                } ${card.isMatched ? 'matched' : ''}`}
                        >
                            <div className="card-face card-front">🌙</div>
                            <div className="card-face card-back">{card.emoji}</div>
                        </div>
                    </div>
                ))}
            </motion.div>

            <button className="reset-btn" onClick={resetGame}>
                Play Again
            </button>
        </section>
    );
}
