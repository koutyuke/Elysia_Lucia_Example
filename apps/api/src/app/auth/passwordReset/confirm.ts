import { lucia } from "@/src/libs/auth";
import { prismaClient } from "@/src/libs/prisma";
import { BadRequestException } from "@/src/plugins/error/exceptions";
import { password as bunPassword } from "bun";
import { t } from "elysia";
import { isWithinExpirationDate } from "oslo";
import { alphabet, generateRandomString, sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { createBaseElysia } from "../../base";

const passwordResetConfirm = createBaseElysia().post(
	"/:token",
	async ({ params: { token }, body: { password }, env: { PASSWORD_PEPPER }, set }) => {
		const hashedToken = encodeHex(await sha256(new TextEncoder().encode(token)));
		const resetToken = await prismaClient.passwordResetToken.findUnique({
			where: {
				hashedToken,
			},
		});
		if (!resetToken) {
			throw new BadRequestException("Invalid token");
		}
		if (!isWithinExpirationDate(resetToken.expiresAt)) {
			throw new BadRequestException("Token has expired");
		}
		await lucia.invalidateSession(resetToken.userId);
		const passwordPepper = PASSWORD_PEPPER;
		const passwordSalt = generateRandomString(16, alphabet("a-z", "A-Z", "0-9"));
		const hashedPassword = await bunPassword.hash(passwordSalt + password + passwordPepper);

		await prismaClient.user.update({
			where: {
				id: resetToken.userId,
			},
			data: {
				hashedPassword: hashedPassword,
				passwordSalt: passwordSalt,
			},
		});

		await lucia.invalidateUserSessions(resetToken.userId);
		await prismaClient.passwordResetToken.delete({
			where: {
				hashedToken,
			},
		});

		set.status = 204;
	},
	{
		body: t.Object({
			password: t.String(),
		}),
	},
);

export { passwordResetConfirm };
