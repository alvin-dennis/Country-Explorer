export interface CountryInfo {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  ccn3: string;
  cioc?: string;
  region: string;
  subregion?: string;
  population: number;
  area: number;
  capital?: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  flags: {
    svg: string;
    png?: string;
  };
  coatOfArms?: {
    svg: string;
    png?: string;
  };
  borders?: string[];
  timezones?: string[];
  continents?: string[];
}

export interface CountryCardProps {
    country: CountryInfo
    index?: number
}

export interface CountryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  region: string;
  onRegionChange: (value: string) => void;
}