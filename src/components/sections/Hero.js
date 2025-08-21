'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { resumeData } from '@/app/data/resume-data';
import { GlobeIcon, ExternalLink } from "lucide-react";
import { Button } from '@/components/ui/button';
import { AnimatedSocialLinks } from '@/components/ui-widgets';
import { scaleIn, fadeInUpWithDelay, buttonHover } from '@/lib/animations';

export default function Hero() {
    const { hero } = resumeData;

    return (
        <section className="py-16 text-center" id="hero">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
                {/* Name */}
                <motion.h1
                    className="text-5xl font-bold mb-4 text-foreground"
                    {...scaleIn}
                >
                    {hero.name}
                </motion.h1>

                {/* Bio */}
                <motion.div
                    className="max-w-2xl mx-auto mb-8"
                    {...fadeInUpWithDelay(0.3)}
                >
                    <p className="text-lg leading-relaxed text-secondary text-center">
                        {hero.summary}
                    </p>
                </motion.div>

                {/* Location */}
                <motion.div
                    className="inline-flex items-center gap-2 text-secondary mb-6"
                    {...fadeInUpWithDelay(0.5)}
                >
                    <GlobeIcon className="w-5 h-5" />
                    <span>{hero.location}</span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-4 mb-8"
                    {...fadeInUpWithDelay(0.7)}
                >
                    <Link href="/hakki_erdem_cv.pdf" target="_blank" rel="noopener noreferrer">
                        <motion.div {...buttonHover}>
                            <Button
                                size="lg"
                                variant="outline"
                                className="hover:bg-primary/10 transition-all duration-200"
                            >
                                Özgeçmiş
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Contact */}
                <motion.div
                    className="flex flex-wrap justify-center gap-5 text-sm"
                    {...scaleIn}
                >
                    {/* Social Icons */}
                    <AnimatedSocialLinks socialLinks={hero.contact?.social || []} />
                </motion.div>
            </div>
        </section>
    );
} 