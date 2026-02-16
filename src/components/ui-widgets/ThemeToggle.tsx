'use client';

import { useTheme } from 'next-themes';
import SunIcon from '@/components/icon/SunIcon';
import MoonIcon from '@/components/icon/MoonIcon';
import MonitorIcon from '@/components/icon/MonitorIcon';
import { THEMES } from '@/lib/constants';
import { useIsMounted } from '@/hooks/useIsMounted';

const themes = THEMES.map(theme => ({
    ...theme,
    icon: theme.icon === 'Sun' ? SunIcon : theme.icon === 'Moon' ? MoonIcon : MonitorIcon
}));

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const mounted = useIsMounted();

    if (!mounted) {
        return (
            <div className="flex items-center">
                <div className="flex">
                    {themes.map((themeOption) => {
                        const Icon = themeOption.icon;
                        return (
                            <div
                                key={themeOption.id}
                                className="w-6 h-6 rounded-md flex items-center justify-center text-secondary"
                            >
                                <Icon className="w-3.5 h-3.5" />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center">
            <div className="flex gap-0.5">
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
                            className={`relative w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 ${isActive
                                    ? 'bg-foreground text-background'
                                    : 'text-secondary hover:text-foreground hover:bg-background'
                                }`}
                            title={themeOption.name}
                            aria-label={themeOption.name}
                        >
                            <Icon className="w-3.5 h-3.5" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
} 