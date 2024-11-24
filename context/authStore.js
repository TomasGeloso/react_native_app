import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authStore = create(
  persist(
    (set, get) => ({
      // States
      isAuthenticated: false,
      rehydrated: false, // This is used to check if the store has been rehydrated from asyncStorage

      // Actions
      storeToken: async (token) => {
        await AsyncStorage.setItem("userToken", token);
      },

      getToken: async () => {
        return await AsyncStorage.getItem("userToken");
      },

      login: async (accessToken) => {
          set({ isAuthenticated: true });
          await get().storeToken(accessToken);
      },

      logout: async () => {
        set({ isAuthenticated: false });
        await AsyncStorage.removeItem("userToken");
      },

      checkAuth: async () => {
        const token = await get().getToken();
        set({ isAuthenticated: !!token, rehydrated: true });
      },
    }),
    {
      name: "auth-storage", // Unique name for asyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for local storage
      onRehydrateStorage: () => (state) => {
        state.rehydrated = true; // Set rehydrated to true after rehydrating the store
      },
    }
  )
);

export default authStore;