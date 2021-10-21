import React, {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

type User = {
	id: string;
	avatar_url: string;
	name: string;
	login: string;
};

type AuthResponse = {
	token: string;
	user: User;
};

type AuthorizationResponse = {
	params: {
		code?: string;
		error?: string;
	};
	type?: string;
};

type AuthContextProps = {
	user: User | null;
	isSigningIn: boolean;
	signin(): Promise<void>;
	signout(): Promise<void>;
};

type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext({} as AuthContextProps);

const TOKEN_STORAGE = "@app_heat:token";
const USER_STORAGE = "@app_heat:user";
const SCOPE = "read:user";
const CLIENT_ID = "d0ae73472d48ddbe2fc1";
const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

export function AuthProvider({ children }: AuthProviderProps) {
	const [isSigningIn, setIsSigningIn] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	async function signin() {
		setIsSigningIn(true);

		try {
			const { params, type } = (await AuthSession.startAsync({
				authUrl,
			})) as AuthorizationResponse;

			if (type === "success" && params.error !== "access_denied") {
				const authResponse = await api.post<AuthResponse>("/authenticate", {
					code: params.code,
				});
				const { token, user: userToSignIn } = authResponse.data;

				api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

				await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(userToSignIn));
				await AsyncStorage.setItem(TOKEN_STORAGE, token);

				setUser(userToSignIn);
			}
		} catch (error) {
			console.error("Error on signin function", error);
		} finally {
			setIsSigningIn(false);
		}
	}

	async function signout() {
		setUser(null);
		await AsyncStorage.removeItem(TOKEN_STORAGE);
		await AsyncStorage.removeItem(USER_STORAGE);
		api.defaults.headers.common["Authorization"] = `Bearer `;
	}

	useEffect(() => {
		(async function loadUserStoragedData() {
			const tokenStoraged = await AsyncStorage.getItem(TOKEN_STORAGE);
			const userStoraged = await AsyncStorage.getItem(USER_STORAGE);

			if (tokenStoraged && userStoraged) {
				api.defaults.headers.common[
					"Authorization"
				] = `Bearer ${tokenStoraged}`;
				console.log("Token =", tokenStoraged);

				setUser(JSON.parse(userStoraged));
			}

			setIsSigningIn(false);
		})();
	}, []);

	useEffect(() => {
		console.log("User =", user);
	}, [user]);

	return (
		<AuthContext.Provider value={{ signin, signout, isSigningIn, user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);

	return ctx;
}
