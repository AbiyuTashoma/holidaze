import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useApi = create(persist((set) => ({
  venues: [],
  isLoading: false,
  isError: false,
  searchText: "",
  updateVenues: (items) => set({venues: [...items]}),
  updateIsLoading: (bool) => set({isLoading: bool}),
  updateIsError: (bool) => set({isError: bool}),
  updateSearchText: (text) => set({searchText: text}),
}), {
  name: "apiData",
}));

export default useApi;