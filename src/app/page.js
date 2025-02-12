import HeaderSection from "@/components/sections/HeaderSection";
import MainContent from "@/components/sections/MainContent";
import { RESUME_DATA } from "@/data/resume-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1E1E] dark:to-[#141414]">
      <div className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-8 lg:p-12">
        <section className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg dark:border-gray-800 dark:bg-[#1E1E1E] print:space-y-6">
          <HeaderSection resumeData={RESUME_DATA} />
          <MainContent resumeData={RESUME_DATA} />
        </section>
      </div>
    </main>
  );
}
