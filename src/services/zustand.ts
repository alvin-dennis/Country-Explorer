import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  themeInfo: "light" | "dark" | "system";
  setTheme: (theme: ThemeState["themeInfo"]) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  themeInfo: "system",
  setTheme: (themeInfo) => set({ themeInfo }),
}));


interface FavoritesStore {
  favorites: string[];
  addFavorite: (countryCode: string) => void;
  removeFavorite: (countryCode: string) => void;
  isFavorite: (countryCode: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (countryCode: string) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, countryCode])],
        })),
      removeFavorite: (countryCode: string) =>
        set((state) => ({
          favorites: state.favorites.filter((code) => code !== countryCode),
        })),
      isFavorite: (countryCode: string) =>
        get().favorites.includes(countryCode),
    }),
    {
      name: "favoritecountries",
    }
  )
);
