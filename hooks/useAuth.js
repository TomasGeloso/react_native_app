import { create } from 'zustand'; // o usar Context si prefieres
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = create((set) => ({
  token: null,
  isAuthenticated: false,

  login: async (token) => {
    await AsyncStorage.setItem('userToken', token);
    set({ token, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('userToken');
    set({ token: null, isAuthenticated: false });
  },

  initialize: async () => {
    const token = await AsyncStorage.getItem('userToken');
    set({ token, isAuthenticated: !!token });
  }
}));