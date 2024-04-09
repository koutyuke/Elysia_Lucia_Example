import { createBaseElysia } from "../base";
import { me } from "./me";

const users = createBaseElysia({ prefix: "/users" }).use(me);

export { users };
