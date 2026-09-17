import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import LoadingState from "../components/LoadingState";
import { LocalCupProvider } from "../context/LocalCupContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <LoadingState fullScreen />;
  }

  return (
    <LocalCupProvider>
      <StatusBar
        style="dark"
        backgroundColor="#F8F4ED"
      />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F8F4ED",
          },
          animation: "slide_from_right",
        }}
      />
    </LocalCupProvider>
  );
}