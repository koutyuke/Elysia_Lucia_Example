import { logger as pinoLogger } from "@bogeychan/elysia-logger";

const logger = pinoLogger({
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
		},
	},
});

export { logger };
