import { lucia } from "@/src/libs/auth";
import { BadRequestException } from "@/src/plugins/error/exceptions";
import { createBaseElysia } from "../base";

const logout = createBaseElysia().post("/logout", async ({ cookie }) => {
	const sessionCookie = cookie[lucia.sessionCookieName];

	if (!sessionCookie?.value) {
		throw new BadRequestException("Session not found");
	}
	await lucia.invalidateSession(sessionCookie.value);
	const blankSessionCookie = lucia.createBlankSessionCookie();

	sessionCookie.set({
		value: blankSessionCookie.value,
		...blankSessionCookie.attributes,
	});
});

export { logout };
