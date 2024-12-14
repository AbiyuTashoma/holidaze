import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * creates page store
 * It stores url, previous page and next page states
 */
const usePage = create(persist((set) => ({
  url: "https://v2.api.noroff.dev/holidaze/venues?sort=created&sortOrder=desc&page=1",
  nextPage: 2,
  prevPage: null,
  updateNextPage: (nPage) => set({nextPage: nPage}),
  updatePrevPage: (pPage) => set({prevPage: pPage}),
  updateUrl: (newUrl) => set({url: newUrl}),
}), {
  name: "page",
}));

export default usePage;