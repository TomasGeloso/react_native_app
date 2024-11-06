import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export function useCustomFonts() {
    const [fontsLoaded, fontError] = useFonts({
        "CerebriSans-Regular": require("../assets/fonts/CerebriSans-Regular.ttf"),
        "CerebriSans-Medium": require("../assets/fonts/CerebriSans-Medium.ttf"),
        "CerebriSans-SemiBold": require("../assets/fonts/CerebriSans-SemiBold.ttf"),
        "CerebriSans-Bold": require("../assets/fonts/CerebriSans-Bold.ttf"),
        "CerebriSans-ExtraBold": require("../assets/fonts/CerebriSans-ExtraBold.ttf"),

        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if (fontError) throw fontError;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    return [fontsLoaded, fontError];
} 
