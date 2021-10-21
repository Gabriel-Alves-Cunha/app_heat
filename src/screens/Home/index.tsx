import { View, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";

import { SendMessageForm } from "../../components/SendMessageForm";
import { MessageList } from "../../components/MessageList";
import { SigninBox } from "../../components/SigninBox";
import { Header } from "../../components/Header";

import { styles } from "./styles";
import { useAuth } from "../../hooks/auth";

export function Home() {
	const { user } = useAuth();

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<View style={styles.container}>
				<Header />

				<MessageList />

				{user ? <SendMessageForm /> : <SigninBox />}
			</View>
		</KeyboardAvoidingView>
	);
}
