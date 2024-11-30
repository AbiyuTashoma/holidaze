import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSearch = create(persist((set) => ({
  searchVenues: [],
  updateSearchVenues: (items) => set({searchVenues: [...items]}),
}), {
  name: "searchData",
}));

export default useSearch;