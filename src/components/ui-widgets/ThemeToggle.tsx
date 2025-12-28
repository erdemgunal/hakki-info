'use client';

import { useTheme } from 'next-themes';
import SunIcon from '@/components/icon/SunIcon';
import MoonIcon from '@/components/icon/MoonIcon';
import MonitorIcon from '@/components/icon/MonitorIcon';
import { useEffect, useState } from 'react';
import { THEMES } from '@/lib/constants';

const themes = THEMES.map(theme => ({
    ...theme,
    icon: theme.icon === 'Sun' ? SunIcon : theme.icon === 'Moon' ? MoonIcon : MonitorIcon
}));

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center">
                <div className="relative bg-background border border-border rounded-full p-1">
                    <div className="flex space-x-1">
                        {themes.map((themeOption) => {
                            const Icon = themeOption.icon;
                            return (
                                <div
                                    key={themeOption.id}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-foreground"
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center">
            {/* Switch Container */}
            <div className="relative bg-background border border-border rounded-full p-1">
                <div className="flex space-x-1">
                    {themes.map((themeOption) => {
                        const Icon = themeOption.icon;
                        const isActive =
                            (themeOption.id === 'system' && theme === 'system') ||
                            (themeOption.id === 'light' && theme === 'light') ||
                            (themeOption.id === 'dark' && theme === 'dark');

                        return (
                            <button
                                key={themeOption.id}
                                onClick={() => setTheme(themeOption.id)}
                                className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isActive
                                        ? 'bg-foreground text-background'
                                        : 'text-foreground hover:text-foreground'
                                    }`}
                                title={themeOption.name}
                            >
                                <Icon className="w-4 h-4" />

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-foreground rounded-full -z-10" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
} 