import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import io from "socket.io-client";

import { Message, MessageProps } from "../Message";
import { api } from "../../services/api";

import { styles } from "./styles";

const socket = io(String(api.defaults.baseURL));
let msgsQueue: MessageProps[] = [];
socket.on("new_message", msg => msgsQueue.push(msg));

export function MessageList() {
	const [currMsgs, setCurrMsgs] = useState([] as MessageProps[]);

	useEffect(() => {
		(async function fetchLast3Msgs() {
			const res = await api.get<MessageProps[]>("messages/last3");

			setCurrMsgs(res.data);
		})();
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (msgsQueue.length > 0) {
				setCurrMsgs(oldMsgs => [msgsQueue[0], oldMsgs[0], oldMsgs[1]]);
				msgsQueue.shift();
			}
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	return (
		<ScrollView
			contentContainerStyle={styles.content}
			keyboardShouldPersistTaps="never"
			style={styles.wrapper}
		>
			{currMsgs.map(msg => (
				<Message data={msg} key={msg.id} />
			))}
		</ScrollView>
	);
}
