import { Elysia } from "elysia";
import { provider } from "./provider";
import { providerCallback } from "./providerCallback";

const auth = new Elysia().group("/auth", app => app.use(provider).use(providerCallback));

export { auth };
