import { ThemeToggle } from "@/components/ModeToggle"
import { MotionHeader } from "./Framer"
import Link from "next/link"

export function Navbar() {
    return (
        <MotionHeader
            className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div>
                    <Link href={"/"}>
                        <h1 className="text-3xl font-bold text-foreground">Country Explorer</h1>
                    </Link>
                </div>
                <ThemeToggle />
            </div>
        </MotionHeader>
    )
}
