import { Line as LineInstance } from "arctic";
import type { BaseAuthAccountInfo } from "./type";

const clientId = process.env.LINE_CLIENT_ID!;
const clientSecret = process.env.LINE_CLIENT_SECRET!;
const baseURL = process.env.BASE_URL ?? "http://localhost:3001";

const line = new LineInstance(clientId, clientSecret, `${baseURL}/auth/line/callback`);

const authUrl = async (state: string, codeVerifier: string) =>
	await line.createAuthorizationURL(state, codeVerifier, {
		scopes: ["profile", "email"],
	});

const getTokens = async (code: string, codeVerifier: string) => line.validateAuthorizationCode(code, codeVerifier);

const getAccount = async (accessToken: string): Promise<BaseAuthAccountInfo> => {
	const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			id_token: accessToken,
			client_id: clientId,
		}),
	});
	const user: IdTokenVerifyResponse = await response.json();
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

type IdTokenVerifyResponse = {
	iss: string;
	sub: string;
	aud: string;
	exp: number;
	iat: number;
	nonce?: string;
	amr: string[];
	name?: string;
	picture?: string;
	email?: string;
};

export type { IdTokenVerifyResponse };
export { line, authUrl as lineAuthUrl, getAccount as getLineAccount, getTokens as getLineTokens };
