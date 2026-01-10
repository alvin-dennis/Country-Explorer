# Country Explorer 🌍

A responsive, interactive web application to explore countries around the world. Users can search, filter by region, view favorites, and sort countries by name or population.  

---

## Project Overview

Country Explorer is a Next.js-based web application that allows users to:

- Browse a list of countries worldwide.
- Search countries by name.
- Filter countries by region.
- Mark and view favorite countries.
- Sort countries alphabetically or by population.
- Paginate results for better performance and usability.

The application focuses on responsive design, usability, and optimized performance.

---

## Features Implemented

- **Search**: Instant filtering by country name.
- **Region Filter**: Filter countries by continents (Africa, Americas, Asia, Europe, Oceania).
- **Favorites**: Mark/unmark countries as favorites and filter only favorites.
- **Sorting**: Sort countries by name (A-Z, Z-A) or population (Low-High, High-Low).
- **Pagination**: Display countries in paginated grids for faster rendering.
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop screens.
- **Loading Skeletons**: Provides skeleton UI while fetching data.

---

## Tech Stack & Libraries Used

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, ShadCN UI components
- **State Management**: Zustand (for favorites handling)
- **Data Fetching**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Other**: React Markdown, Skeleton UI for loading states

---

## Setup & Installation Instructions

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/alvin-dennis/Country-Explorer.git
cd Country-Explorer

# Install dependencies
bun install

# Run development server
bun dev
```

- The app should now be running at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
bun run build
```

---

## Architecture & Approach

- **Component-based structure**: Each feature (filters, cards, pagination) is modularized into separate components.
- **State Management**:
  - Local component state for search, region, sorting, and pagination.
  - Zustand store for managing favorites across the app.
- **Data Fetching**:
  - React Query is used to fetch all countries from the REST Countries API.
  - Client-side filtering and sorting are applied after fetching for responsiveness.
- **Performance Considerations**:
  - Pagination implemented to render only a subset of countries per page.
  - Memoization with `useMemo` to prevent unnecessary re-renders.

---

## Challenges & Solutions

1. **Favorites persistence**:
   - Challenge: Maintaining favorites state globally across components.
   - Solution: Used Zustand for centralized state management, making it easy to toggle and access favorites anywhere.

2. **Efficient Filtering & Sorting**:
   - Challenge: Filtering and sorting large datasets without lag.
   - Solution: Applied `useMemo` hooks to memoize filtered and sorted results to improve performance.

3. **Responsive UI**:
   - Challenge: Designing a grid layout that works across all screen sizes.
   - Solution: Tailwind’s responsive utilities and CSS grid were used for flexible layouts.

---

## Assumptions & Areas for Improvement

- **Assumptions**:
  - Each country has a unique `cca2` code.
  - Favorite countries are stored in client state (not persisted in a backend or local storage).

- **Areas for Improvement**:
  - Persist favorites in a backend for long-term storage.
  - Add advanced filters (e.g., by language, currency, or capital city).
  - Implement server-side filtering for faster load on very large datasets.
  - Improve accessibility and keyboard navigation.

---

## Author

[Your Name] – [GitHub](https://github.com/your-username)  

---

### License

This project is open source and available under the MIT License.
