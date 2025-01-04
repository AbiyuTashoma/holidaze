import { create } from "zustand";
import { persist } from "zustand/middleware";
import { baseUrl } from "../../../js/constants";

/**
 * creates page store
 * It stores url, previous page and next page states
 */
const usePage = create(persist((set) => ({
  url: baseUrl + "1",
  nextPage: 2,
  prevPage: null,
  searchText: "",
  updateNextPage: (nPage) => set({nextPage: nPage}),
  updatePrevPage: (pPage) => set({prevPage: pPage}),
  updateUrl: (newUrl) => set({url: newUrl}),
  updateSearchText: (text) => set({searchText: text}),
}), {
  name: "page",
}));

export default usePage;