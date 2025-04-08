import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      token: null,
      setCurrentUser: (newUser) => set({ currentUser: newUser }),
      removeCurrentUser: () => set({ currentUser: null, token: null }),
      setToken: (newToken) => set({ token: newToken }),  // Add setToken to manage the token in store
    }),
    {
      name: "auth-storage", // name for localStorage key
      getStorage: () => localStorage, // persist to localStorage
    }
  )
);

export default useAuthStore;
