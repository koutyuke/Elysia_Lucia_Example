import { createBaseElysia } from "../../base";
import { passwordResetConfirm } from "./confirm";
import { passwordResetRequest } from "./request";

const passwordReset = createBaseElysia({
	prefix: "/password-reset",
})
	.use(passwordResetConfirm)
	.use(passwordResetRequest);

export { passwordReset };
