import { Elysia } from "elysia";
import { login } from "./login";
import { logout } from "./logout";
import { provider } from "./provider";
import { providerCallback } from "./providerCallback";
import { signup } from "./signup";

const auth = new Elysia({
	prefix: "/auth",
})
	.use(provider)
	.use(providerCallback)
	.use(signup)
	.use(login)
	.use(logout);

// .group("/auth", app =>
// 	app.use(provider).use(providerCallback).use(signup).use(login).use(logout),
// );

export { auth };
