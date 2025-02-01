"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

export default function ThemeSwitch() {
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
    <Button
      variant="outline"
      size="icon"
      className="group h-10 w-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={toggleTheme}
    >
      {theme === "dark" ? <LuSun /> : <IoMoonSharp />}
    </Button>
  );
}
