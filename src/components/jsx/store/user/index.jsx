import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist } from "zustand/middleware";

/**
 * creates a user data store
 * It stores logged in user data/statuses: name, access token, avatar, role and apiKey
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
  resetUser: () => set({name: null, accessToken: null, avatar: null, venueManager: null, apiKey: null}),
}), {
  name: "user",
}));

export default useUser;