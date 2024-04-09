import { lucia } from "@/src/libs/auth";
import { prismaClient } from "@/src/libs/prisma";
import { BadRequestException } from "@/src/plugins/error/exceptions";
import { password as bunPassword } from "bun";
import { t } from "elysia";
import { createBaseElysia } from "../base";

const login = createBaseElysia().post(
	"/login",
	async ({ body: { email, password }, cookie, set, log }) => {
		const user = await prismaClient.user.findUnique({
			where: {
				email,
			},
		});

		if (!user || !user.passwordSalt || !user.hashedPassword) {
			log.error("User not found.");
			throw new BadRequestException("User not found.");
		}

		const passwordPepper = process.env.PASSWORD_PEPPER;

		if (!passwordPepper) {
			log.error("Password pepper is not set.");
			throw new Error("Password pepper is not set.");
		}

		const passwordValid = bunPassword.verify(user.passwordSalt + password + passwordPepper, user.hashedPassword);

		if (!passwordValid) {
			log.error("Password is invalid.");
			throw new BadRequestException("Password is invalid.");
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		set.status = 200;

		cookie[sessionCookie.name]?.set({
			value: sessionCookie.value,
			...sessionCookie.attributes,
		});

		return user;
	},
	{
		body: t.Object({
			email: t.String({
				format: "email",
			}),
			password: t.String(),
		}),
	},
);

export { login };
