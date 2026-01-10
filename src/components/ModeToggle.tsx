"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useThemeStore } from "@/services/zustand"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const setZustandTheme = useThemeStore((s) => s.setTheme)
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    const isDark = resolvedTheme === "dark"

    const handleToggle = () => {
        const nextTheme = isDark ? "light" : "dark"
        setTheme(nextTheme)
        setZustandTheme(nextTheme)
    }

    return (
        <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={handleToggle}
            className="rounded-full transition-colors bg-transparent hover:bg-muted"
        >
            {isDark ? (
                <Sun className="h-4 w-4 transition-transform" />
            ) : (
                <Moon className="h-4 w-4 transition-transform" />
            )}
        </Button>
    )
}
