import { Inter } from "next/font/google";
import Provider from '../lib/ThemeProvider';
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap"});

export const metadata = {
  title: "hakki.info",
  description: "Personal portfolio of Hakki Erdem Gunal, showcasing skills in various programming languages, a collection of software development projects, and contact information. Explore to learn more about Hakki's experience and work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white dark:bg-[#1E1E1E]">
          <Provider>
            {children}
          </Provider>
      </body>
    </html>
  );
}
