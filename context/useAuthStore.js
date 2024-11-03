import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import api from '@services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      isAuthenticated: false,
      rehydrated: false, // This is used to check if the store has been rehydrated from asyncStorage

      // Actions
      login: async (email, password) => {
        try {
          const response = await api.post("/api/Auth/login", {
            email,
            password,
          });
          
          set({ isAuthenticated: true });

          await AsyncStorage.setItem("userToken", response.data.token);
        } catch (error) {
          throw error;
        }
      },

      register: async (email, password, username) => {
        try {
          await api.post("/api/Auth/register", {
            email,
            password,
            username,
          });
          
          await get().login(email, password);
        } catch (error) {
          throw error;
        }
      },

      logout: async () => {
        set({ isAuthenticated: false });
        await AsyncStorage.removeItem("userToken");
      },

      checkAuth: async () => {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
        set({ rehydrated: true });
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

export default useAuthStore;