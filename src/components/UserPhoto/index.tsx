import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import React from "react";

import avatarDefault from "../../assets/avatar.png";

import { styles } from "./styles";
import { COLORS } from "../../theme";

const SIZES = {
	SMALL: {
		containerSize: 32,
		avatarSize: 28,
	},
	NORMAL: {
		containerSize: 48,
		avatarSize: 42,
	},
};

type Props = {
	imgUri?: string;
	size?: keyof typeof SIZES;
};

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarDefault).uri;

export function UserPhoto({ imgUri = AVATAR_DEFAULT, size = "NORMAL" }: Props) {
	const { avatarSize, containerSize } = SIZES[size];

	return (
		<LinearGradient
			colors={[COLORS.PINK, COLORS.YELLOW]}
			start={{ x: 0, y: 0.8 }}
			end={{ x: 0.9, y: 1 }}
			style={[
				styles.wrapper,
				{
					width: containerSize,
					height: containerSize,
					borderRadius: containerSize / 2,
				},
			]}
		>
			<Image
				style={[
					styles.avatar,
					{
						width: avatarSize,
						height: avatarSize,
						borderRadius: avatarSize / 2,
					},
				]}
				source={{ uri: imgUri }}
			/>
		</LinearGradient>
	);
}
