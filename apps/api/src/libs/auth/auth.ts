import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { User } from "@prisma/client";
import { Lucia } from "lucia";
import { prismaClient } from "../prisma/client";

const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user);

const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: attributes => {
		return {
			name: attributes.name,
			email: attributes.email,
			iconUrl: attributes.iconUrl,
			hashedPassword: attributes.hashedPassword,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	name: User["name"];
	email: User["email"];
	iconUrl: User["iconUrl"];
	hashedPassword: User["hashedPassword"];
}

export { lucia };
