"use client";

import { ClockLoader } from "react-spinners";
import { useTheme } from "next-themes";

export default function Loader() {
    const { theme } = useTheme();
    const loaderColor = theme === "dark" ? "#ffffff" : "#000000";
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-background">
            <ClockLoader color={loaderColor} size={100} />
        </div>
    );
}
