"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, X, Heart } from "lucide-react"
import { CountryFiltersProps } from "@/lib/types"

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

export function CountryFilters({
    searchTerm,
    onSearchChange,
    region,
    onRegionChange,
    showFavorites,
    onToggleFavorites,
}: CountryFiltersProps) {
    const hasFilters = region !== "all" || searchTerm.length > 0

    const clearFilters = () => {
        onSearchChange("")
        onRegionChange("all")
    }
    return (
        <div className="flex flex-wrap gap-2 mb-8 items-center">
            <div className="relative flex-1 min-w-[150px]">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 w-full"
                />
            </div>
            <Button
                variant={showFavorites ? "default" : "outline"}
                onClick={onToggleFavorites}
                className="flex items-center gap-2"
            >
                <Heart className="h-4 w-4" />
                Favorites
            </Button>
            <div className="min-w-[120px]">
                <Select value={region} onValueChange={onRegionChange}>
                    <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {REGIONS.map((r) => (
                            <SelectItem key={r} value={r}>
                                {r}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {hasFilters && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearFilters}
                    aria-label="Clear filters"
                    className="shrink-0"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}
