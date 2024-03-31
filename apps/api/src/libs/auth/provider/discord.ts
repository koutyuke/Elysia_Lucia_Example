import { Discord as DiscordInstance } from "arctic";
import type { APIUser } from "discord-api-types/v10";
import type { BaseAuthAccountInfo } from "./type";

const clientId = process.env.DISCORD_CLIENT_ID!;
const clientSecret = process.env.DISCORD_CLIENT_SECRET!;
const baseURL = process.env.BASE_URL ?? "http://kousuke.local:3001";

const discord = new DiscordInstance(clientId, clientSecret, `${baseURL}/auth/discord/callback`);

const authUrl = async (state: string) =>
	await discord.createAuthorizationURL(state, {
		scopes: ["identify", "email"],
	});

const getTokens = async (code: string) => discord.validateAuthorizationCode(code);

const getAccount = async (accessToken: string): Promise<BaseAuthAccountInfo> => {
	const response = await fetch("https://discord.com/api/v10/users/@me", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const user: APIUser = await response.json();
	if (!user || !user.email) {
		throw new Error("The user does not have an email address.");
	}
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		iconUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
	};
};

type DiscordResponse = APIUser;

export type { DiscordResponse };
export { discord, authUrl as discordAuthUrl, getAccount as getDiscordAccount, getTokens as getDiscordTokens };
