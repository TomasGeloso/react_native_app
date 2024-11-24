import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import authStore from "@context/authStore";
import { useCustomFonts } from "@hooks/useFonts";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useCustomFonts();
  const { checkAuth, rehydrated } = authStore();

  useEffect(() => {
    const prepare = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Error checking auth: ", error);
      } finally {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }
    };

    prepare();
  }, [checkAuth, fontsLoaded, fontError]);

  if ((!fontsLoaded && !fontError) || !rehydrated)
    return (
      <View className="align-middle justify-center">
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );

  console.log("rehydrated: ", rehydrated);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
