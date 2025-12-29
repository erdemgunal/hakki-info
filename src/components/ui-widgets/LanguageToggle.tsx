'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import GlobeIcon from '@/components/icon/GlobeIcon';
import { useState, useEffect } from 'react';

const languages = [
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
];

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    useEffect(() => {
        const scrollY = sessionStorage.getItem('scrollPosition');
        if (scrollY) {
            requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(scrollY, 10));
                sessionStorage.removeItem('scrollPosition');
            });
        }
    }, [locale]);

    const handleLanguageChange = (newLocale: string) => {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        router.replace(pathname, { locale: newLocale, scroll: false });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-background transition-colors duration-200 text-secondary hover:text-foreground"
                aria-label="Change language"
                aria-expanded={isOpen}
            >
                <GlobeIcon className="w-4 h-4" />
                <span className="text-xs font-medium">{currentLanguage.code.toUpperCase()}</span>
                <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-surface border border-border rounded-lg shadow-xl z-20 overflow-hidden backdrop-blur-sm">
                        {languages.map((language) => {
                            const isActive = language.code === locale;
                            return (
                                <button
                                    key={language.code}
                                    onClick={() => handleLanguageChange(language.code)}
                                    className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors duration-200 ${isActive
                                            ? 'bg-primary/10 text-foreground font-medium'
                                            : 'text-secondary hover:bg-background hover:text-foreground'
                                        }`}
                                >
                                    <span className="text-xs font-mono text-secondary w-8">{language.code.toUpperCase()}</span>
                                    <span className="flex-1 text-sm">{language.name}</span>
                                    {isActive && (
                                        <svg
                                            className="w-4 h-4 text-primary flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}