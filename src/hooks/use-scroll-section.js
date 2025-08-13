import { useEffect, useState, useCallback } from 'react';
import { SECTIONS, SCROLL_OFFSET } from '@/lib/constants';

export function useScrollSection() {
    const [activeSection, setActiveSection] = useState('hero');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Find active section
    const findActiveSection = useCallback(() => {
        if (!mounted) return 'hero';
        
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        let activeId = SECTIONS[0].id;
        let smallestDistance = Infinity;

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementCenter = elementTop + rect.height / 2;
            const distance = Math.abs(elementCenter - scrollPosition);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                activeId = id;
            }
        });

        return activeId;
    }, [mounted]);

    // Handle scroll to update active section
    useEffect(() => {
        if (!mounted) return;
        
        const handleScroll = () => {
            const newActiveSection = findActiveSection();
            if (newActiveSection !== activeSection) {
                setActiveSection(newActiveSection);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [findActiveSection, activeSection, mounted]);

    const scrollToSection = useCallback((sectionId) => {
        if (!mounted) return;
        
        const element = document.getElementById(sectionId);
        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset + SCROLL_OFFSET;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });

            setActiveSection(sectionId);
        }
    }, [mounted]);

    return {
        activeSection: mounted ? activeSection : 'hero',
        sections: SECTIONS,
        scrollToSection,
        findActiveSection
    };
} 