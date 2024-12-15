import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * creates page store
 * It stores url, previous page and next page states
 */
const useUser = create(persist((set) => ({
  logged: false,
  venueManager: false,
  accessToken: null,
  updateLogged: (status) => set({logged: status}),
  updateVenueManager: (bool) => set({venueManager: bool}),
  updateAccessToken: (token) => set({accessToken: token}),
}), {
  name: "user",
}));

export default useUser;