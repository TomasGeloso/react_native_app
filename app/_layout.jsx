import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react';
import { NativeWindStyleSheet } from "nativewind"; // Import the NativeWindStyleSheet from the "nativewind" to set Output to 'native', without this the web styles won't work
import { useAuthContext } from '@context/AuthContext';
import { useCustomFonts } from '@hooks/useFonts';

NativeWindStyleSheet.setOutput({
  default: "native",
});
SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from hiding automatically



const RootLayout = () => {
  const [fontsLoaded, error] = useCustomFonts();
  
  if (!fontsLoaded && !error) {
    return null;
  }

  const { isAuthenticated } = useAuthContext();

  return (
    <Stack>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="not-found" options={{ headerShown: false }} />
        </>
      )};
    </Stack>
    );
};

export default RootLayout