import { getAuthAccount, lucia } from "@/src/libs/auth";
import { getTokens } from "@/src/libs/auth/provider";
import { prismaClient } from "@/src/libs/prisma";
import { BadRequestException, InternalServerErrorException } from "@/src/plugins/error/exceptions";
import { OAuth2RequestError } from "arctic";
import { t } from "elysia";
import { generateId } from "lucia";
import { createBaseElysia } from "../base";

const providerCallback = createBaseElysia().get(
	"/:provider/callback",
	async ({ query: { code, state }, cookie, params: { provider }, set, log }) => {
		const { oauth_state, oauth_code_verifier, oauth_next } = cookie;
		const next = oauth_next?.value ?? "/";
		const storedState = oauth_state?.value;
		const storedCodeVerifier = oauth_code_verifier?.value;

		if (!storedState || !storedCodeVerifier || state !== storedState) {
			throw new BadRequestException("The state provided does not match the state in the cookie.");
		}

		try {
			const userId = generateId(15);
			const tokens = await getTokens(provider, code, storedCodeVerifier);
			const account = await getAuthAccount(provider, tokens.accessToken);

			const existingUser = await prismaClient.user.findUnique({
				where: {
					email: account.email,
				},
			});

			const existingOAuthAccount = await prismaClient.oAuthAccount.findUnique({
				where: {
					provider_providerAccountId: {
						provider,
						providerAccountId: account.id,
					},
				},
			});

			if (!existingUser) {
				await prismaClient.user
					.create({
						data: {
							id: userId,
							name: account.username,
							email: account.email,
							iconUrl: account.iconUrl,
						},
					})
					.catch(error => {
						log.error(error);
						throw new InternalServerErrorException();
					});
			}

			if (!existingOAuthAccount) {
				await prismaClient.oAuthAccount
					.create({
						data: {
							provider: provider,
							providerAccountId: account.id,
							userId: existingUser === null ? userId : existingUser.id,
						},
					})
					.catch(error => {
						log.error(error);
						throw new InternalServerErrorException();
					});
			}

			const session = await lucia.createSession(existingUser === null ? userId : existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			cookie[sessionCookie.name]?.set({
				value: sessionCookie.value,
				...sessionCookie.attributes,
			});
			set.redirect = next;
		} catch (error) {
			log.error(error);
			if (error instanceof OAuth2RequestError) {
				throw new BadRequestException();
			}
			throw new InternalServerErrorException();
		}
	},
	{
		query: t.Object(
			{
				code: t.String(),
				state: t.String(),
			},
			{ additionalProperties: true },
		),
		params: t.Object({
			provider: t.Union([t.Literal("discord"), t.Literal("google"), t.Literal("line")]),
		}),
	},
);

export { providerCallback };
