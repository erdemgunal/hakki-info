"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

export default function ThemeSwitch(){
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
        className="rounded-2xl p-1 dark:text-white dark:hover:bg-opacity-10 dark:hover:bg-gray-500 hover:bg-gray-100 text-2xl flex-shrink-0"
        onClick={toggleTheme}
    >
        {theme === "dark" ? <LuSun /> : <IoMoonSharp />}
    </button>

  );
};