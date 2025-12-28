import {
    Hero,
    About,
    Education,
    Languages,
    Skills,
    Projects,
} from '@/components/sections';
import {
    Footer
} from '@/components/layout';
import { fetchResumeData, type Locale } from '@/lib/fetch-resume-data';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid, fallback to English if not
  const validLocale = (routing.locales as readonly string[]).includes(locale) 
    ? (locale as Locale) 
    : 'en' as Locale;

  // Fetch resume data based on locale
  const resumeData = await fetchResumeData(validLocale);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
        <div className="bg-surface border border-border rounded-2xl shadow-xl shadow-white/5 backdrop-blur-sm overflow-hidden">
          <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10">
            <Hero resumeData={resumeData} />
            <div className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16 pb-10 sm:pb-12 md:pb-14 lg:pb-16">
              <About resumeData={resumeData} />
              <Education resumeData={resumeData} />
              <Languages resumeData={resumeData} />
              <Skills resumeData={resumeData} />
              <Projects resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>
      <Footer resumeData={resumeData} />
    </main>
  );
}

