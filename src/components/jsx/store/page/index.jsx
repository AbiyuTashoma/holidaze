import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist } from "zustand/middleware";
import { defaultUrl } from "../../../js/constants";

/**
 * creates a page store
 * It stores url, previous page, next page and search states
 */
const usePage = create(persist((set) => ({
  url: defaultUrl,
  nextPage: null,
  prevPage: null,
  totalPages: null,
  searchText: "",
  updateNextPage: (nPage) => set({nextPage: nPage}),
  updatePrevPage: (pPage) => set({prevPage: pPage}),
  updateTotalPages: (tPage) => set({totalPages: tPage}),
  updateUrl: (newUrl) => set({url: newUrl}),
  updateSearchText: (text) => set({searchText: text}),
  resetPages: () => set({url: defaultUrl, nextPage: null, prevPage: null, totalPages: null, searchText: ""}),
}), {
  name: "page",
}));

export default usePage;