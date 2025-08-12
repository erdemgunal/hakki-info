'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { resumeData } from '@/app/data/resume-data';
import { GlobeIcon, Mail, ExternalLink } from "lucide-react";
import { Button } from '@/components/ui/button';
import { AnimatedSocialLinks } from '@/components/ui-widgets';

export default function Hero() {
    const { hero } = resumeData;

    return (
        <section className="py-16 text-center" id="hero">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
                {/* Name */}
                <motion.h1
                    className="text-5xl font-bold mb-4 text-foreground"
                    initial={{ scale: 0.8, opacity: 0, z: 100 }}
                    animate={{ scale: 1, opacity: 1, z: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeIn",
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    {hero.name}
                </motion.h1>

                {/* Bio */}
                <motion.div
                    className="max-w-2xl mx-auto mb-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.3,
                        ease: "easeOut"
                    }}
                >
                    <p className="text-lg leading-relaxed text-secondary text-center">
                        {hero.summary}
                    </p>
                </motion.div>

                {/* Location */}
                <motion.div
                    className="inline-flex items-center gap-2 text-secondary mb-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.5,
                        ease: "easeOut"
                    }}
                >
                    <GlobeIcon className="w-5 h-5" />
                    <span>{hero.location}</span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-4 mb-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.7,
                        ease: "easeOut"
                    }}
                >
                    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <Button
                            size="lg"
                            variant="outline"
                            className="hover:bg-primary/10 transition-all duration-200"
                        >
                            Resume
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Contact */}
                <motion.div
                    className="flex flex-wrap justify-center gap-5 text-sm"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.7,
                        ease: "easeOut"
                    }}
                >
                    <motion.div
                        initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                        animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.8,
                            ease: "easeOut"
                        }}
                    >
                        <Link
                            href={`mailto:${hero.contact?.email || hero.email}`}
                            className="inline-flex items-center justify-center text-secondary hover:text-foreground transition-all duration-200 p-2 rounded-full hover:bg-primary/10"
                            aria-label="Email"
                        >
                            <Mail className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    {/* Social Icons */}
                    <AnimatedSocialLinks socialLinks={hero.contact?.social || []} />
                </motion.div>
            </div>
        </section>
    );
} 