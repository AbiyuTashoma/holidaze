import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist } from "zustand/middleware";
import { baseUrl } from "../../../js/constants";

/**
 * creates page store
 * It stores url, previous page and next page states
 */
const usePage = create(persist((set) => ({
  url: baseUrl + "1",
  nextPage: null,
  prevPage: null,
  totalPages: null,
  searchText: "",
  updateNextPage: (nPage) => set({nextPage: nPage}),
  updatePrevPage: (pPage) => set({prevPage: pPage}),
  updateTotalPages: (tPage) => set({totalPages: tPage}),
  updateUrl: (newUrl) => set({url: newUrl}),
  updateSearchText: (text) => set({searchText: text}),
  resetPages: () => set({url: baseUrl + "1", nextPage: null, prevPage: null, totalPages: null, searchText: ""}),
}), {
  name: "page",
}));

export default usePage;