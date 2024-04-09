import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { auth } from "./auth";
import { baseElysia } from "./base";
import { users } from "./users";

const app = baseElysia()
	.use(
		cors({
			origin: "localhost:3000",
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.use(swagger())
	.use(auth)
	.use(users)
	.get("/", () => {
		return { message: "Hello, world!" };
	})
	.listen(3001);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
