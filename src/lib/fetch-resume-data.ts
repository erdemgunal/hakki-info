const RESUME_BASE_URL = 'https://raw.githubusercontent.com/erdemgunal/hakki-info/refs/heads/main/content/data/resume';

export type Locale = 'tr' | 'en' | 'de' | 'fr';

export interface ResumeData {
  hero: {
    name: string;
    title: string;
    email: string;
    location: string;
    profileImage: string;
    summary: string;
    contact: {
      phone: string;
      social: Array<{
        name: string;
        url: string;
        iconKey: string;
      }>;
    };
  };
  footer: {
    brand: {
      name: string;
      description: string;
    };
    quickLinks: {
      title: string;
      links: Array<{
        href: string;
        text: string;
      }>;
    };
    contact: {
      title: string;
    };
  };
  about: {
    description: string;
  };
  education: Array<{
    degree: string;
    school: string;
    start: string;
    end: string;
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
  skills: {
    technical: Array<{
      name: string;
      skills: Array<{
        name: string;
      }>;
    }>;
    soft: Array<{
      name: string;
    }>;
  };
  projects: Array<{
    title: string;
    description: string;
    problem: string;
    solution: string;
    result: string;
    techStack: string[];
    label: string;
    year: string;
    images: string[];
    links: {
      live: string | null;
      github: string;
    };
  }>;
}

export async function fetchResumeData(locale: Locale = 'tr'): Promise<ResumeData> {
  const url = `${RESUME_BASE_URL}/${locale}.json`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch resume data for locale ${locale}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as ResumeData;
  } catch (error) {
    console.error(`Error fetching resume data for locale ${locale}:`, error);
    // Fallback to Turkish if fetch fails
    if (locale !== 'tr') {
      return fetchResumeData('tr');
    }
    throw error;
  }
}

