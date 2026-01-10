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

export async function fetchCountryByCode(
  code: string
): Promise<CountryInfo | null> {
  try {
    const { data } = await axios.get<CountryInfo[] | CountryInfo>(
      `https://restcountries.com/v3.1/alpha/${code}?fields=name,cca2,cca3,region,subregion,population,area,capital,languages,currencies,flags,coatOfArms,borders,timezones,continents`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error(`Failed to fetch country ${code}:`, error);
    if (typeof window !== "undefined") {
      toast.error("Failed to load country details.");
    }
    return null;
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