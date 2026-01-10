"use client"

import type { CountryDetailsProps } from "@/lib/types"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavoritesStore } from "@/services/zustand"
import { Variants } from "framer-motion"
import { MotionDiv } from "@/components/Framer"
import Image from "next/image"

export function CountryDetails({ country }: CountryDetailsProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore()
    const favorite = isFavorite(country.cca2)

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(country.cca2)
        } else {
            addFavorite(country.cca2)
        }
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
        },
    }

    return (
        <MotionDiv variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <MotionDiv variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative rounded-lg overflow-hidden h-96">
                    <Image
                        src={country.flags.svg}
                        alt={`Flag of ${country.name.common}`}
                        fill
                        className="w-full h-auto object-contain"
                    />
                </div>
                <div className="space-y-4">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">{country.name.common}</h1>
                        <p className="text-lg text-muted-foreground">{country.name.official}</p>
                    </div>

                    <Button
                        onClick={toggleFavorite}
                        variant={"default"}
                        className="gap-2 w-full sm:w-auto"
                    >
                        <Heart className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
                        {favorite ? "Remove from Favorites" : "Add to Favorites"}
                    </Button>

                    <div className="flex flex-wrap gap-2 pt-4">
                        {country.continents?.map((continent) => (
                            <Badge key={continent} variant="secondary">
                                {continent}
                            </Badge>
                        ))}
                    </div>
                </div>
            </MotionDiv>
            <MotionDiv variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-6">
                    <CardHeader>
                        <p className="text-sm font-medium text-muted-foreground">Population</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{(country.population / 1_000_000).toFixed(2)}M</p>
                    </CardContent>
                </Card>

                <Card className="p-6">
                    <CardHeader>
                        <p className="text-sm font-medium text-muted-foreground">Area</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{(country.area / 1_000).toFixed(0)}K km²</p>
                    </CardContent>
                </Card>

                <Card className="p-6">
                    <CardHeader>
                        <p className="text-sm font-medium text-muted-foreground">Region</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{country.region}</p>
                    </CardContent>
                </Card>
                {country.capital && (
                    <Card className="p-6">
                        <CardHeader>
                            <p className="text-sm font-medium text-muted-foreground">Capital</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{country.capital[0]}</p>
                        </CardContent>
                    </Card>
                )}
                {country.subregion && (
                    <Card className="p-6">
                        <CardHeader>
                            <p className="text-sm font-medium text-muted-foreground">Subregion</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{country.subregion}</p>
                        </CardContent>
                    </Card>
                )}
                <Card className="p-6">
                    <CardHeader>
                        <p className="text-sm font-medium text-muted-foreground">Code</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{country.cca2}</p>
                    </CardContent>
                </Card>
            </MotionDiv>
            <MotionDiv variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {country.languages && (
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>Languages</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {Object.values(country.languages).map((lang) => (
                                <Badge key={lang} variant="outline">{lang}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                )}
                {country.currencies && (
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>Currencies</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {Object.entries(country.currencies).map(([code, curr]) => (
                                <div key={code} className="flex justify-between">
                                    <span className="text-muted-foreground">{code}</span>
                                    <span className="font-medium">{curr.name} ({curr.symbol})</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </MotionDiv>
            <MotionDiv variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(country.timezones || []).length > 0 && (
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>Timezones</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {(country.timezones || []).map((tz) => (
                                <Badge key={tz} variant="outline" className="p-2">
                                    {tz}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                )}
                {(country.borders || []).length > 0 && (
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>Bordering Countries</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {(country.borders || []).map((border) => (
                                <Badge key={border} variant="secondary">
                                    {border}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </MotionDiv>
        </MotionDiv>
    )
}