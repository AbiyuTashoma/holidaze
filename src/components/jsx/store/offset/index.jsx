import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * creates offset store
 */
const useOffset = create(persist((set) => ({
  offset: 0,
  setOffset: () => set((state) => ({offset: state.offset + 100})),
  resetOffset: () => set({ offset: 0}),
}), {
  name: "offset",
}));

export default useOffset;