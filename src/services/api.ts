import axios from "axios";
import { toast } from "sonner";
import { CountryInfo } from "@/lib/types";

export async function fetchAllCountries(): Promise<CountryInfo[]> {
  try {
    const { data } = await axios.get<CountryInfo[]>(
      "https://restcountries.com/v3.1/all?fields=name,cca2,ccn3,region,capital,flags,population,flag",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    if (typeof window !== "undefined") {
      toast.error("Failed to load countries. Please try again later.");
    }
    return [];
  }
}

export function filterCountries(
  countries: CountryInfo[],
  searchTerm: string,
  region: string
) {
  return countries.filter((country) => {
    const matchesSearch =
      !searchTerm ||
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.name.official.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      !region || region === "all" || country.region === region;
    return matchesSearch && matchesRegion;
  });
}