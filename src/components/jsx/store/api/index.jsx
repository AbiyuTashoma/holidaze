import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useApi = create(persist((set) => ({
  venues: [],
  isLoading: false,
  isError: false,
  updateVenues: (items) => set({venues: [...items]}),
  updateIsLoading: (bool) => set({isLoading: bool}),
  updateIsError: (bool) => set({isError: bool}),
  extendVenues: (newItems) => set((state) => ({venues: state.venues.concat(newItems)}))
}), {
  name: "apiData",
}));

export default useApi;