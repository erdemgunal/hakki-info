'use client';

import React, { createContext, useContext } from 'react';
import type { ResumeData } from '@/lib/fetch-resume-data';

interface ResumeDataContextType {
  resumeData: ResumeData;
}

const ResumeDataContext = createContext<ResumeDataContextType | undefined>(undefined);

export function ResumeDataProvider({
  children,
  resumeData
}: {
  children: React.ReactNode;
  resumeData: ResumeData;
}) {
  return (
    <ResumeDataContext.Provider value={{ resumeData }}>
      {children}
    </ResumeDataContext.Provider>
  );
}

export function useResumeData() {
  const context = useContext(ResumeDataContext);
  if (context === undefined) {
    throw new Error('useResumeData must be used within a ResumeDataProvider');
  }
  return context.resumeData;
}

