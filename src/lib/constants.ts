import HomeIcon from '@/components/icon/HomeIcon';
import UserIcon from '@/components/icon/UserIcon';
import GraduationCapIcon from '@/components/icon/GraduationCapIcon';
import LanguagesIcon from '@/components/icon/LanguagesIcon';
import CodeIcon from '@/components/icon/CodeIcon';
import FolderOpenIcon from '@/components/icon/FolderOpenIcon';

export const SECTIONS = [
    { id: 'hero', name: 'Ana Sayfa', icon: HomeIcon },
    { id: 'about', name: 'Hakkımda', icon: UserIcon },
    { id: 'education', name: 'Eğitim', icon: GraduationCapIcon },
    { id: 'languages', name: 'Diller', icon: LanguagesIcon },
    { id: 'skills', name: 'Beceriler', icon: CodeIcon },
    { id: 'projects', name: 'Projeler', icon: FolderOpenIcon }
];

export const THEMES = [
    { id: 'light', name: 'Açık', icon: 'Sun' },
    { id: 'dark', name: 'Koyu', icon: 'Moon' },
    { id: 'system', name: 'Sistem', icon: 'Monitor' }
];