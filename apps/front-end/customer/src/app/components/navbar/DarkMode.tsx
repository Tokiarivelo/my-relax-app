"use client"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@my-relax-app/shared-ui";
import { Button } from "@my-relax-app/shared-ui";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}