export interface CountryInfo {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
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
  };
  borders?: string[];
  timezones?: string[];
  continents?: string[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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


export interface CountryPageProps {
  params: Promise<{
    code: string;
  }>;
}

export interface CountryDetailsProps {
    country: CountryInfo
}
