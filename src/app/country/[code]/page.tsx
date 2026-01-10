"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CountryDetails } from "./_components/CountryDetails"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import type { CountryInfo } from "@/lib/types"
import { fetchCountryByCode } from "@/services/api"

export default function CountryPage() {
    const params = useParams()
    const router = useRouter()
    const code = (params.code as string)?.toUpperCase()
    const {
        data: country,
        isLoading,
        isError,
    } = useQuery<CountryInfo | null>({
        queryKey: ["country", code],
        queryFn: () => fetchCountryByCode(code),
        enabled: !!code,
        staleTime: 1000 * 60 * 60 * 24,
    })
    if (isLoading) {
        return (
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <Skeleton className="w-32 h-10" />
                <Skeleton className="w-full h-96" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                </div>
            </main>
        )
    }
    if (isError) {
        toast.error("Failed to load country details.");
        router.push("/");
        return null;
    }

    if (!country) {
        toast.error("Country not found.");
        router.push("/");
        return null;
    }

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/">
                <Button variant="default" className="gap-2 mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </Link>
            <CountryDetails country={country} />
        </main>
    )
}
