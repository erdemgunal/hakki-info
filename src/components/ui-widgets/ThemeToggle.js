'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { THEMES } from '@/lib/constants';

const themes = THEMES.map(theme => ({
    ...theme,
    icon: theme.icon === 'Sun' ? Sun : theme.icon === 'Moon' ? Moon : Monitor
}));

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
              <motion.button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isActive 
                    ? 'bg-foreground text-background' 
                    : 'text-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={themeOption.name}
              >
                <Icon className="w-4 h-4" />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTheme"
                    className="absolute inset-0 bg-foreground rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 