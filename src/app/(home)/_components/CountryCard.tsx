import Link from "next/link"
import Image from "next/image"
import type { CountryCardProps } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavoritesStore } from "@/services/zustand"
import { MotionDiv } from "@/components/Framer"

export function CountryCard({ country, index = 0 }: CountryCardProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()
    const favorite = isFavorite(country.cca2)

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        favorite ? removeFavorite(country.cca2) : addFavorite(country.cca2)
    }

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -4 }}
        >
            <Link href={`/country/${country.cca2.toLowerCase()}`}>
                <div className="relative h-full cursor-pointer rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={country.flags.svg}
                        alt={`Flag of ${country.name.common}`}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />

                    <div className="relative z-10 flex flex-col h-full justify-between p-4 text-white">
                        <div className="flex justify-end">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="bg-black/50 hover:bg-black/70 transition"
                                onClick={toggleFavorite}
                                aria-label="Toggle favorite"
                            >
                                <Heart
                                    className="h-5 w-5"
                                    fill={favorite ? "currentColor" : "none"}
                                    color={favorite ? "hsl(var(--destructive))" : "white"}
                                />
                            </Button>
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-semibold line-clamp-2">{country.name.common}</h3>
                            <p className="text-sm text-white">{country.region}</p>

                            <div className="mt-2 text-sm space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-white">Population</span>
                                    <span className="font-medium">{country.population.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white">Capital</span>
                                    <span className="font-medium">{country.capital?.[0] || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-white/70 mt-2">
                            Country Code: {country.cca2}
                        </div>
                    </div>
                </div>
            </Link>
        </MotionDiv>
    )
}
