import { View, TextInput, Alert, Keyboard } from "react-native";
import React, { useState } from "react";

import { styles } from "./styles";
import { Button } from "../Button";
import { COLORS } from "../../theme";
import { api } from "../../services/api";

export function SendMessageForm() {
	const [sendingMsg, setSendingMsg] = useState(false);
	const [msg, setMsg] = useState("");

	async function handleMsgSubmit() {
		const msgFormatted = msg.trim();

		if (msgFormatted.length > 0) {
			setSendingMsg(true);

			await api.post("/messages", { message: msgFormatted });

			setMsg("");

			Keyboard.dismiss();

			setSendingMsg(false);

			Alert.alert("Mensagem enviada com sucesso!");
		} else {
			Alert.alert("Escreva uma mensagem para enviar!");
		}
	}

	return (
		<View style={styles.wrapper}>
			<TextInput
				placeholder="Qual a sua expectativa para o evento?"
				placeholderTextColor={COLORS.GRAY_PRIMARY}
				keyboardAppearance="dark"
				editable={!sendingMsg}
				onChangeText={setMsg}
				style={styles.input}
				maxLength={140}
				value={msg}
				multiline
			/>

			<Button
				backgroundColor={COLORS.PINK}
				onPress={handleMsgSubmit}
				title="ENVIAR MENSAGEM"
				isLoading={sendingMsg}
				color={COLORS.WHITE}
			/>
		</View>
	);
}
