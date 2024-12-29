import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useApi = create(persist((set) => ({
  searchText: "",
  updateSearchText: (text) => set({searchText: text}),
}), {
  name: "apiData",
}));

export default useApi;