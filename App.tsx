import React from "react";
import { StatusBar } from "expo-status-bar";
import {
	Roboto_400Regular,
	Roboto_700Bold,
	useFonts,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";

import { AuthProvider } from "./src/hooks/auth";
import { Home } from "./src/screens/Home";

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	if (!fontsLoaded) return <AppLoading />;

	return (
		<AuthProvider>
			<StatusBar style="light" translucent backgroundColor="transparent " />

			<Home />
		</AuthProvider>
	);
}
