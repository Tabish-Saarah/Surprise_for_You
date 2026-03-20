import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const navItems = [
    { id: 'surprise', label: 'Surprise' },
    { id: 'letter', label: 'Letter' },
    { id: 'photos', label: 'Photos' },
    { id: 'memory-game', label: 'Memory Game' },
    { id: 'secret', label: 'Secret' },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('surprise');

    useEffect(() => {
        const observers = [];
        const sections = navItems.map((item) => document.getElementById(item.id));

        sections.forEach((section) => {
            if (!section) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(section.id);
                    }
                },
                { threshold: 0.3, rootMargin: '-56px 0px 0px 0px' }
            );
            observer.observe(section);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 56;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        >
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollTo(item.id)}
                >
                    {item.label}
                </button>
            ))}
        </motion.nav>
    );
}
