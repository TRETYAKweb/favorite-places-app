import React, { useEffect } from "react";
import { Routing } from "./routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { fontAssets } from "shared/lib";
import { StatusBar } from "expo-status-bar";

export const App: React.FC = () => {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Routing />
    </>
  );
};
