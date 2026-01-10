import { ThemeToggle } from "@/components/ModeToggle"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Country Explorer</h1>
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}
