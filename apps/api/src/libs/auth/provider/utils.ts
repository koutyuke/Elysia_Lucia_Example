import { BadRequestException } from "@/src/plugins/error/exceptions";
import { discordAuthUrl, getDiscordAccount, getDiscordTokens } from "./discord";
import { getGoogleAccount, getGoogleTokens, googleAuthUrl } from "./google";
import { getLineAccount, getLineTokens, lineAuthUrl } from "./line";
import type { AuthProvider } from "./type";

const genAuthUrl = (provider: AuthProvider, state: string, codeVerifier: string) => {
	switch (provider) {
		case "discord":
			return discordAuthUrl(state);
		case "google":
			return googleAuthUrl(state, codeVerifier);
		case "line":
			return lineAuthUrl(state, codeVerifier);
		default:
			throw new BadRequestException("Provider not found");
	}
};

const getAuthAccount = async (provider: AuthProvider, accessToken: string) => {
	switch (provider) {
		case "discord":
			return await getDiscordAccount(accessToken);
		case "google":
			return await getGoogleAccount(accessToken);
		case "line":
			return await getLineAccount(accessToken);
		default:
			throw new Error("Provider not found");
	}
};

const getTokens = async (provider: AuthProvider, code: string, codeVerifier: string) => {
	switch (provider) {
		case "discord":
			return await getDiscordTokens(code);
		case "google":
			return await getGoogleTokens(code, codeVerifier);
		case "line":
			return await getLineTokens(code, codeVerifier);
		default:
			throw new Error("Provider not found");
	}
};

export { genAuthUrl, getAuthAccount, getTokens };
