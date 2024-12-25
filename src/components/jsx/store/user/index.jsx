import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * creates user store
 * It stores logged in user status: name, access token, avatar, and role
 */
const useUser = create(persist((set) => ({
  name: null,
  accessToken: null,
  avatar:null,
  venueManager: false,
  apiKey: null,
  updateName: (status) => set({name: status}),
  updateAccessToken: (token) => set({accessToken: token}),
  updateAvatar: (url) => set({avatar: url}),
  updateVenueManager: (bool) => set({venueManager: bool}),
  updateKey: (newKey) => set({apiKey: newKey}),
}), {
  name: "user",
}));

export default useUser;