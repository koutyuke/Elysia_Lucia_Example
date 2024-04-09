import { authGuard } from "@/src/plugins/guard";
import { createBaseElysia } from "../base";

const me = createBaseElysia()
	.use(authGuard)
	.get("/me", ({ user }) => {
		return user;
	});

export { me };
