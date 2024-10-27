import { create } from 'zustand'; // o usar Context si prefieres
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (userToken) => {
    await AsyncStorage.setItem('userToken', userToken);
    set({ user: userToken, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('userToken');
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    const storedUser = await AsyncStorage.getItem('userToken');
    if(storedUser) {
        set({ user: storedUser, isAuthenticated: !!token });
    }
  }
}));