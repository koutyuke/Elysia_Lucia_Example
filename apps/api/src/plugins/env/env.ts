import { Elysia } from "elysia";
import { envValidateScheme } from "./scheme";

const env = () => {
	const app = new Elysia({
		name: "env",
	});

	const env = envValidateScheme.parse(process.env);

	return app.decorate("env", {
		...env,
		env: process.env,
	});
};

export { env };
