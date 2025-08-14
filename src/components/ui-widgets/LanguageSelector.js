'use client';

import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // Default to Turkish
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // TODO: Implement actual language switching functionality
    console.log('Selected language:', language.code);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button - Mobile First Design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center min-h-[44px] min-w-[44px] px-3 py-2 bg-background border border-border rounded-lg hover:border-foreground/30 hover:bg-accent/50 transition-all duration-200 touch-manipulation"
        aria-label="Select Language"
      >
        {/* Mobile: Show only flag and chevron */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Globe className="w-4 h-4 text-secondary sm:inline" />
          <span className="text-base leading-none sm:hidden">{selectedLanguage.flag}</span>
          <span className="hidden sm:inline text-sm text-secondary">{selectedLanguage.name}</span>
          <ChevronDown 
            className={`w-3 h-3 text-secondary transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </div>
      </button>

      {/* Dropdown Menu - Mobile First */}
      {isOpen && (
        <>
          {/* Mobile overlay for easier closing */}
          <div 
            className="fixed inset-0 z-40 sm:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 bottom-full mb-4 w-48 sm:right-0 sm:bottom-full sm:mb-2 sm:w-40 bg-surface border border-border rounded-lg shadow-lg shadow-black/20 z-50">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className={`w-full text-left px-4 py-3 sm:px-3 sm:py-2 min-h-[44px] sm:min-h-0 text-sm hover:bg-accent/50 transition-colors duration-150 flex items-center space-x-3 touch-manipulation ${
                    selectedLanguage.code === language.code 
                      ? 'bg-accent/30 text-foreground' 
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  <span className="text-lg sm:text-base leading-none">{language.flag}</span>
                  <span className="flex-1 font-medium sm:font-normal">{language.name}</span>
                  {selectedLanguage.code === language.code && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}