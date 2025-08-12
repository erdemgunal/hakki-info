import { useEffect, useState } from 'react';
import { MOBILE_BREAKPOINT } from '@/lib/constants';

export function useScreenSize() {
    const [isMobile, setIsMobile] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < MOBILE_BREAKPOINT);
            setIsLargeScreen(width >= MOBILE_BREAKPOINT);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return {
        isMobile,
        isLargeScreen
    };
} 