'use client';

import { motion } from 'framer-motion';
import { useScrollSection } from '@/hooks/use-scroll-section';
import { useScreenSize } from '@/hooks/use-screen-size';
import { useEffect, useState } from 'react';

export default function ActiveSectionIndicator() {
    const { activeSection, sections, scrollToSection } = useScrollSection();
    const { isLargeScreen } = useScreenSize();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isLargeScreen) return null;

    return (
        <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
            <div className="relative">
                {/* Background line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />

                {/* Section dots and labels */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <div key={section.id} className="relative flex items-center">
                            {/* Dot */}
                            <motion.button
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${activeSection === section.id
                                    ? 'bg-primary shadow-glow'
                                    : 'bg-border hover:bg-primary/50'
                                    }`}
                                onClick={() => scrollToSection(section.id)}
                                whileTap={{ scale: 0.9 }}
                                animate={{
                                    scale: activeSection === section.id ? 1.1 : 1,
                                    opacity: activeSection === section.id ? 1 : 0.6
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                            />

                            {/* Label */}
                            <motion.button
                                className={`absolute left-8 px-3 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${activeSection === section.id
                                    ? 'text-primary'
                                    : 'text-muted-foreground/60 hover:text-foreground hover:bg-surface/50'
                                    }`}
                                onClick={() => scrollToSection(section.id)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {section.name}
                            </motion.button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}