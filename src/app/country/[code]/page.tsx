import { notFound } from "next/navigation"
import { fetchCountryByCode } from "@/services/api"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { CountryDetails } from "@/components/country-details"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

interface CountryPageProps {
    params: Promise<{
        code: string
    }>
}

async function CountryContent({ code }: { code: string }) {
    const country = await fetchCountryByCode(code.toUpperCase())
    if (!country) {
        notFound()
    }
    return <CountryDetails country={country} />
}

export default async function CountryPage({ params }: CountryPageProps) {
    const router = useRouter()
    const resolvedParams = await params
    return (
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2 mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back
            </Button>
                <Suspense
                    fallback={
                        <div className="space-y-8">
                            <Skeleton className="w-full h-96" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} className="h-32" />
                                ))}
                            </div>
                        </div>
                    }
                >
                    <CountryContent code={resolvedParams.code} />
                </Suspense>
            </main>
    )
}
