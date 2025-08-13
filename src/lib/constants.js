import { Home, User, Briefcase, GraduationCap, Languages, Code, FolderOpen } from 'lucide-react';

export const SECTIONS = [
    { id: 'hero', name: 'Ana Sayfa', icon: Home },
    { id: 'about', name: 'Hakkımda', icon: User },
    { id: 'education', name: 'Eğitim', icon: GraduationCap },
    { id: 'languages', name: 'Diller', icon: Languages },
    { id: 'skills', name: 'Beceriler', icon: Code },
    { id: 'projects', name: 'Projeler', icon: FolderOpen }
];

export const THEMES = [
    { id: 'light', name: 'Açık', icon: 'Sun' },
    { id: 'dark', name: 'Koyu', icon: 'Moon' },
    { id: 'system', name: 'Sistem', icon: 'Monitor' }
];

export const SCROLL_OFFSET = -80;
export const MOBILE_BREAKPOINT = 1024; 