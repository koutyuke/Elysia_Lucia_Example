import { Google as GoogleInstance } from "arctic";
import type { openIdConnectUserInfo } from "../type";
import type { BaseAuthAccountInfo } from "./type";

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const baseURL = process.env.BASE_URL ?? "http://localhost:3001";

const google = new GoogleInstance(clientId, clientSecret, `${baseURL}/auth/google/callback`);

const authUrl = async (state: string, codeVerifier: string) =>
	await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ["profile", "email"],
	});

const getTokens = async (code: string, codeVerifier: string) => google.validateAuthorizationCode(code, codeVerifier);

const getAccount = async (accessToken: string): Promise<BaseAuthAccountInfo> => {
	const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const user: GoogleResponse = await response.json();
	if (!user || !user.email || !user.name || !user.picture) {
		throw new Error("The user does not have an email address.");
	}
	return {
		id: user.sub,
		username: user.name,
		email: user.email,
		iconUrl: user.picture,
	};
};

type GoogleResponse = openIdConnectUserInfo;

export type { GoogleResponse };
export { google, authUrl as googleAuthUrl, getAccount as getGoogleAccount, getTokens as getGoogleTokens };
