"use client"

import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchAllCountries, filterCountries } from "@/services/api"
import type { CountryInfo } from "@/lib/types"
import { CountryCard } from "@/app/(home)/_components/CountryCard"
import { CountryFilters } from "@/app/(home)/_components/CountryFilter"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination } from "./_components/Pagination"

const ITEMS_PER_PAGE = 16
const FAVOURITES_KEY = "favouritecountries"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFavorites, setShowFavorites] = useState(false)
  const [favoriteCodes, setFavoriteCodes] = useState<string[]>([])
  const [favoritesLoaded, setFavoritesLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVOURITES_KEY)
      if (!stored) {
        setFavoritesLoaded(true)
        return
      }
      const parsed = JSON.parse(stored)
      const favorites = parsed?.state?.favorites ?? []

      if (Array.isArray(favorites)) {
        setFavoriteCodes(favorites.map((c: string) => c.toUpperCase()))
      }
    } catch {
      setFavoriteCodes([])
    } finally {
      setFavoritesLoaded(true)
    }
  }, [])

  const {
    data: countries = [],
    isLoading,
    isError,
  } = useQuery<CountryInfo[], Error>({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  })
  const baseCountries = useMemo(() => {
    if (showFavorites && !favoritesLoaded) return []
    if (!showFavorites) return countries
    return countries.filter((country) =>
      favoriteCodes.includes(country.cca2.toUpperCase())
    )
  }, [countries, showFavorites, favoriteCodes, favoritesLoaded])

  const filteredCountries = useMemo(
    () => filterCountries(baseCountries, searchTerm, region),
    [baseCountries, searchTerm, region]
  )

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)
  const paginatedCountries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredCountries.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredCountries, currentPage])

  const handleFilterChange = (search: string, reg: string) => {
    setSearchTerm(search)
    setRegion(reg)
    setCurrentPage(1)
  }
  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev)
    setCurrentPage(1)
  }
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CountryFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => handleFilterChange(value, region)}
        region={region}
        onRegionChange={(value) => handleFilterChange(searchTerm, value)}
        showFavorites={showFavorites}
        onToggleFavorites={toggleFavorites}
      />

      {isLoading || (showFavorites && !favoritesLoaded) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-full h-48 bg-gray-200 dark:bg-muted" />
              <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-muted" />
              <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-muted" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-500">
          Failed to load countries
        </div>
      ) : paginatedCountries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCountries.map((country, index) => (
              <CountryCard
                key={country.cca2}
                country={country}
                index={index}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">
              {showFavorites
                ? "No favorite countries found"
                : "No countries found"}
            </p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
