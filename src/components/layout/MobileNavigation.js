"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useScrollSection } from '@/hooks/use-scroll-section';
import { useScreenSize } from '@/hooks/use-screen-size';
import { SECTIONS } from '@/lib/constants';

export default function MobileNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { activeSection, scrollToSection } = useScrollSection();
    const { isMobile } = useScreenSize();

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const sections = SECTIONS;

    if (!isMobile) return null;

    // Only show mobile navigation after hero section (when in about or later sections)
    if (activeSection === 'hero') return null;

    return (
        <>
            {/* Mobile Navigation Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Button
                    size="lg"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full portfolio-glow bg-primary hover:bg-primary-glow"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="fixed bottom-24 right-6 z-50"
                            initial={{ scale: 0, opacity: 0, originX: 1, originY: 1 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                duration: 0.3
                            }}
                        >
                            <div className="bg-card border border-border shadow-lg rounded-2xl p-4 min-w-[240px]">
                                <div className="space-y-2">
                                    {sections.map((section, index) => {
                                        const Icon = section.icon;
                                        const isActive = activeSection === section.id;

                                        return (
                                            <motion.button
                                                key={section.id}
                                                onClick={() => {
                                                    scrollToSection(section.id);
                                                    setIsOpen(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${isActive
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'text-foreground hover:bg-surface hover:text-primary'
                                                    }`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="font-medium">{section.name}</span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
