"use client"

import { ThemeProvider as ThemeProviderProps, useTheme } from "next-themes"
import { useEffect } from "react"
import { useThemeStore } from "@/services/zustand"

function ZustandStore() {
    const { theme } = useTheme()
    const setTheme = useThemeStore((s) => s.setTheme)

    useEffect(() => {
        if (theme) setTheme(theme as "light" | "dark" | "system")
    }, [theme, setTheme])

    return null
}

export function ThemeProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProviderProps
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ZustandStore />
            {children}
        </ThemeProviderProps>
    )
}
