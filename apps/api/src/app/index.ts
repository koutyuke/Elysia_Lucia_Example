import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { error } from "../plugins/error";
import { logger } from "../plugins/logger";
import { auth } from "./auth";

const app = new Elysia()
	.use(cors())
	.use(swagger())
	.use(logger)
	.use(error)
	.use(auth)
	.get("/", () => {
		return { message: "Hello, world!" };
	})
	.listen(3001);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
