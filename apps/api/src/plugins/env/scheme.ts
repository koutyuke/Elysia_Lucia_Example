import { z } from "zod";

const envValidateScheme = z.object({
	//Server
	NODE_ENV: z.string(),

	//DB
	DATABASE_URL: z.string(),

	//OAuth Providers
	DISCORD_CLIENT_ID: z.string(),
	DISCORD_CLIENT_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	LINE_CLIENT_ID: z.string(),
	LINE_CLIENT_SECRET: z.string(),

	// Password Pepper
	PASSWORD_PEPPER: z.string(),
});

export { envValidateScheme };
