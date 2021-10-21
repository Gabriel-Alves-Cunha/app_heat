import {
	TouchableOpacityProps,
	ActivityIndicator,
	TouchableOpacity,
	ColorValue,
	Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

import { styles } from "./styles";

type ButtonProps = TouchableOpacityProps & {
	icon?: React.ComponentProps<typeof AntDesign>["name"];
	title: string;
	color: ColorValue;
	backgroundColor: ColorValue;
	isLoading?: boolean;
};

export function Button({
	icon,
	color,
	title,
	isLoading = false,
	backgroundColor,
	...props
}: ButtonProps) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor }]}
			activeOpacity={0.7}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? (
				<ActivityIndicator color={color} />
			) : (
				<>
					<AntDesign name={icon} size={24} style={styles.icon} />
					<Text style={[styles.title, { color }]}>{title}</Text>
				</>
			)}
		</TouchableOpacity>
	);
}
