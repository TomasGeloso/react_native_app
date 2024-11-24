import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import authStore from "@context/authStore";
import * as Device from "expo-device";

const api = axios.create({
  baseURL: "http://192.168.1.50:7254",
  headers: {
    "Content-Type": "application/json",
  },
});

const DEVICE_INFO = `${Device.osName} ${Device.osVersion}`;

// Interceptor for requests - add token if exists
api.interceptors.request.use(
  async (config) => {
    const token = await authStore.getState().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.url === "/api/Auth/login") {
      config.headers.deviceInfo = DEVICE_INFO;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for responses - handle expired/invalid token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = { ...error.config };

    if(error.config.url === "/api/auth/refresh-token") { // Prevent infinite loop
      console.log("Failed to renew token. Logging out...");
      await authStore.getState().logout();
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401 && error.response.headers['token-expired']) {  // When accessToken expired
      console.log("Token expired. Attempting to renew token...");

      try {
        const newAccessToken = await renewAccessToken();

        await authStore.getState().storeToken(newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to renew token: ", refreshError.response?.data?.message);
        await authStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

async function renewAccessToken() {
  try {
    const response = await api.post(
      "/api/auth/refresh-token",
      {},
      { headers: { deviceInfo: DEVICE_INFO } }
    );
    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error("No access token received");
    }

    return accessToken;
  } catch (error) {
    console.error("Error renewing access token");
    throw error;
  }
}

export default api;
