"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchAllCountries, filterCountries } from "@/services/api"
import type { CountryInfo } from "@/lib/types"
import { CountryCard } from "@/app/(home)/_components/CountryCard"
import { CountryFilters } from "@/app/(home)/_components/CountryFilter"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination } from "./_components/Pagination"

const ITEMS_PER_PAGE = 16

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const { data: countries = [], isLoading, isError } = useQuery<CountryInfo[], Error>({
    queryKey: ["countries"] as const,
    queryFn: fetchAllCountries as () => Promise<CountryInfo[]>,
  })

  const filteredCountries = useMemo(
    () => filterCountries(countries, searchTerm, region),
    [countries, searchTerm, region],
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

  return (
    <main
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <CountryFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => handleFilterChange(value, region)}
        region={region}
        onRegionChange={(value) => handleFilterChange(searchTerm, value)}
      />

      {isLoading ? (
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
              <CountryCard key={country.cca2} country={country} index={index} />
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
            <p className="text-xl font-semibold text-gray-900 dark:text-foreground mb-2">
              No countries found
            </p>
            <p className="text-gray-600 dark:text-muted-foreground">
              Try adjusting your search or filter
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
