import { NativeWindStyleSheet } from "nativewind"; // Import the NativeWindStyleSheet from the "nativewind" to set Output to 'native', without this the web styles won't work
import '../global.css';
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react';
import { useCustomFonts } from '@hooks/useFonts';
import useAuthStore from '@context/useAuthStore';

// NativeWindStyleSheet.setOutput({
//   default: "native",
// });
SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from hiding automatically

const RootLayout = () => {
  const [fontsLoaded, fontError] = useCustomFonts();
  const { checkAuth, rehydrated } = useAuthStore();

  useEffect(() => {
    const authenticate = async () => {
      console.log("Checking auth");
      await checkAuth();
    };
    authenticate();
  }, [checkAuth]);

  if (!fontsLoaded && !fontError) return null;
  if (!rehydrated) return null;

  console.log("rehydrated: ", rehydrated);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
    );
};

export default RootLayout