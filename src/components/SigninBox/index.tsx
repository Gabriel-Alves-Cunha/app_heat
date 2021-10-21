import { View } from "react-native";
import React from "react";

import { useAuth } from "../../hooks/auth";
import { Button } from "../Button";

import { COLORS } from "../../theme";
import { styles } from "./styles";

export function SigninBox() {
	const { signin, isSigningIn } = useAuth();

	return (
		<View style={styles.wrapper}>
			<Button
				icon="github"
				onPress={signin}
				isLoading={isSigningIn}
				title="ENTRAR COM O GITHUB"
				color={COLORS.BLACK_PRIMARY}
				backgroundColor={COLORS.YELLOW}
			/>
		</View>
	);
}
