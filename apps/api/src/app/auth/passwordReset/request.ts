import { prismaClient } from "@/src/libs/prisma";
import { t } from "elysia";
import { TimeSpan, generateId } from "lucia";
import nodemailer from "nodemailer";
import { createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { createBaseElysia } from "../../base";

const passwordResetRequest = createBaseElysia().post(
	"/",
	async ({ env, body: { email }, set }) => {
		const user = await prismaClient.user.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			set.status = 204;
			return null;
		}
		await prismaClient.passwordResetToken.deleteMany({
			where: {
				userId: user.id,
			},
		});
		const tokenId = generateId(40);
		const hashedToken = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

		await prismaClient.passwordResetToken.create({
			data: {
				userId: user.id,
				hashedToken,
				expiresAt: createDate(new TimeSpan(2, "h")),
			},
		});

		const transporter = nodemailer.createTransport({
			service: "gmail",
			port: 465,
			auth: {
				user: env.GMAIL_USER,
				pass: env.GMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: env.GMAIL_USER,
			to: email,
			subject: "Password Reset",
			text: `Click here to reset your password: http://localhost:3000/password-reset/${tokenId}`,
		});

		set.status = 204;
		return null;
	},
	{
		body: t.Object({
			email: t.String({
				format: "email",
			}),
		}),
	},
);

export { passwordResetRequest };
