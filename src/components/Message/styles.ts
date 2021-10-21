import { StyleSheet } from "react-native";

import { FONTS, COLORS } from "../../theme";

export const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		marginBottom: 36,
	},
	message: {
		fontSize: 15,
		fontFamily: FONTS.REGULAR,
		color: COLORS.WHITE,
		lineHeight: 20,
		marginBottom: 12,
	},
	footer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	userName: {
		fontSize: 15,
		fontFamily: FONTS.REGULAR,
		color: COLORS.WHITE,
		marginLeft: 16
	}
});
