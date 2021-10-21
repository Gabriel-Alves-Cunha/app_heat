import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Logo from "../../assets/logo.svg";

import { UserPhoto } from "../UserPhoto";

import { styles } from "./styles";
import { useAuth } from "../../hooks/auth";

export function Header() {
	const { user, signout } = useAuth();

	return (
		<View style={styles.wrapper}>
			<Logo />

			<View style={styles.logoutButton}>
				{user && (
					<TouchableOpacity onPress={signout}>
						<Text style={styles.logoutText}>Sair</Text>
					</TouchableOpacity>
				)}

				<UserPhoto imgUri={user?.avatar_url} />
			</View>
		</View>
	);
}
