import React, { useEffect } from "react";
import { Routing } from "./routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { fontAssets } from "shared";

export const App: React.FC = () => {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Routing />;
};
