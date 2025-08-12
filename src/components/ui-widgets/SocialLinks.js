'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function AnimatedSocialLinks({ socialLinks, className = "", iconClassName = "w-5 h-5" }) {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social, index) => {
        const Icon = social.icon;
        
        return (
            <motion.div
                key={social.name}
                initial={{
                    scale: 0.8,
                    opacity: 0
                }}
                animate={{
                    scale: 1,
                    opacity: 1
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.9 + (index * 0.08),
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
            >
                <Link
                    href={social.url}
                    className={`inline-flex items-center justify-center text-secondary hover:text-foreground transition-all duration-200 p-2 rounded-full hover:bg-primary/10 ${className}`}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className={iconClassName} title={social.name} />
                </Link>
            </motion.div>
        );
    });
} 