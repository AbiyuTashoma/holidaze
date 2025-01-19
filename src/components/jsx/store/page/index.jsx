import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist } from "zustand/middleware";
import { defaultUrl } from "../../../js/constants";

/**
 * creates a page store
 * It stores url, search and sort states
 */
const usePage = create(persist((set) => ({
  url: defaultUrl,
  searchText: "",
  sortBy: "created",
  updateUrl: (newUrl) => set({url: newUrl}),
  updateSearchText: (text) => set({searchText: text}),
  updateSortBy: (sort) => set({sortBy: sort}),
  resetPages: () => set({url: defaultUrl, searchText: "", sortBy: "created"}),
}), {
  name: "page",
}));

export default usePage;