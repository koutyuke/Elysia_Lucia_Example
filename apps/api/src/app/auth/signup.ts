import { lucia } from "@/src/libs/auth";
import { prismaClient } from "@/src/libs/prisma";
import { ConflictException, InternalServerErrorException } from "@/src/plugins/error/exceptions";
import { password as bunPassword } from "bun";
import { t } from "elysia";
import { generateId } from "lucia";
import { alphabet, generateRandomString } from "oslo/crypto";
import { createBaseElysia } from "../base";

const signup = createBaseElysia().post(
	"/signup",
	async ({ body: { email, password, name }, cookie, set, log, env: { PASSWORD_PEPPER: passwordPepper } }) => {
		const existingUser = await prismaClient.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			log.error("User already exists.");
			throw new ConflictException("User already exists.");
		}

		const userId = generateId(15);
		const passwordSalt = generateRandomString(16, alphabet("a-z", "A-Z", "0-9"));

		const hashedPassword = await bunPassword.hash(passwordSalt + password + passwordPepper);

		try {
			const newUser = await prismaClient.user.create({
				data: {
					id: userId,
					email,
					hashedPassword: hashedPassword,
					passwordSalt,
					name,
				},
			});
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			set.status = 201;
			cookie[sessionCookie.name]?.set({
				value: sessionCookie.value,
				...sessionCookie.attributes,
			});

			return newUser;
		} catch (error) {
			log.error(error);
			throw new InternalServerErrorException();
		}
	},
	{
		body: t.Object({
			email: t.String({
				format: "email",
			}),
			password: t.String({
				minLength: 8,
				maxLength: 64,
			}),
			name: t.String({
				minLength: 3,
				maxLength: 32,
			}),
		}),
	},
);

export { signup };
