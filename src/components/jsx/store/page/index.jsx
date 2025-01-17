import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist } from "zustand/middleware";
import { defaultUrl } from "../../../js/constants";

/**
 * creates a page store
 * It stores url and search states
 */
const usePage = create(persist((set) => ({
  url: defaultUrl,
  searchText: "",
  updateUrl: (newUrl) => set({url: newUrl}),
  updateSearchText: (text) => set({searchText: text}),
  resetPages: () => set({url: defaultUrl, searchText: ""}),
}), {
  name: "page",
}));

export default usePage;