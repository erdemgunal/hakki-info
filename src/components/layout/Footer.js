'use client';

import React from 'react';
import { resumeData } from '@/app/data/resume-data';
import Link from 'next/link';
import { ThemeToggle, LanguageSelector } from '@/components/ui-widgets';
import { renderSocialLinks } from '@/lib/social-links';
import { getCurrentYear } from '@/lib/date-utils';

export default function Footer() {
  const { hero, footer } = resumeData;
  const currentYear = getCurrentYear();

  return (
    <footer className="bg-surface mt-16 relative overflow-hidden">
      {/* Background HAKKI Text */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <div className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-bold text-foreground/10 dark:text-foreground/2 select-none leading-none">
          HAKKI
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div>
                <span className="text-xl font-bold text-foreground">{footer.brand.name}</span>
              </div>
            </div>
            <p className="text-secondary text-sm leading-relaxed">
                {footer.brand.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className='flex items-center space-x-2'>
              <span className="text-xl font-bold text-foreground">{footer.quickLinks.title}</span>
            </div>
            <div className="space-y-2">
              {footer.quickLinks.links.map((link, index) => (
                <Link key={index} href={link.href} className="block text-secondary hover:text-foreground text-sm">
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <div className='flex items-center space-x-2'>
              <span className="text-xl font-bold text-foreground">{footer.contact.title}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-secondary text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <span>{hero.contact?.email || hero.email}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-secondary text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <span>{hero.location}</span>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {renderSocialLinks(hero.contact?.social || [], "w-8 h-8 bg-background border border-border rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:border-foreground/30", "w-4 h-4")}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
            {/* Copyright - Mobile first, centered */}
            <div className="text-secondary text-sm text-center md:text-left order-2 md:order-1 mt-4">
              © {currentYear}, All rights reserved
            </div>
            
            {/* Controls - Mobile first, centered */}
            <div className="flex flex-col space-y-4 items-center md:flex-row md:space-y-0 md:space-x-6 order-1 md:order-2">
              {/* Links */}
              <div className="flex items-center space-x-4 text-secondary text-sm">
                <Link href="/terms" className="hover:text-foreground touch-manipulation py-2">
                    Terms
                </Link>
                <Link href="/privacy" className="hover:text-foreground touch-manipulation py-2">
                    Privacy
                </Link>
              </div>
              
              {/* Language & Theme Controls */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-secondary text-sm italic">
              &ldquo;Gelecek, gençlerin eseridir.&rdquo; — Mustafa Kemal Atatürk
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};