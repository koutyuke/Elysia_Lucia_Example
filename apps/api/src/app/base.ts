import { Elysia, type ElysiaConfig } from "elysia";
import { env } from "../plugins/env";
import { error } from "../plugins/error";
import { logger } from "../plugins/logger";

const baseElysia = <const BasePath extends string = "", const Scoped extends boolean = false>(
	config?: ElysiaConfig<BasePath, Scoped>,
) => new Elysia(config).use(env).use(logger).use(error);

const createBaseElysia = (config?: Parameters<typeof baseElysia>[0]) =>
	new Elysia(config) as ReturnType<typeof baseElysia>;

export { createBaseElysia, baseElysia };
