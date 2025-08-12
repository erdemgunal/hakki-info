import { Crimson_Text, Oxygen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";

const headingFont = Crimson_Text({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bodyFont = Oxygen({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Hakkı Günal - Full Stack Developer Portfolio",
  description:
    "Hakkı Günal'ın kişisel portfolyo sitesi. Full Stack Developer olarak React, Node.js, Python ve modern web teknolojileri konusunda uzmanlaşmış yazılım geliştiricisi.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Node.js",
    "Python",
    "Web Development",
    "Portfolio",
  ],
  author: "Hakkı Günal",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
