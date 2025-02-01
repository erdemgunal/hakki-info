import { Lora } from "next/font/google";
import Script from "next/script";
import Provider from '../lib/ThemeProvider';
import MetaTags from "@/components/MetaTags";
import "../styles/globals.css";

const lora = Lora({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata = {
  title: "Hakkı's Portfolio",
  description: "Personal portfolio of Hakki Erdem Gunal, showcasing skills in various programming languages, a collection of software development projects, and contact information. Explore to learn more about Hakki's experience and work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lora.className}>
      <MetaTags />
      <body className="bg-white dark:bg-[#1E1E1E]">
          <Provider>
            {children}
          </Provider>
          <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ns98caktal");
          `}
        </Script>
      </body>
    </html>
  );
}
