import Elysia from "elysia";
import { logger } from "../logger";
import {
	BadGatewayException,
	BadRequestException,
	ForbiddenException,
	ImATeapotException,
	InternalServerErrorException,
	MethodNotAllowedException,
	NotFoundException,
	NotImplementedException,
	ServiceUnavailableException,
	UnauthorizedException,
} from "./exceptions";

/**
 * 400 - Bad Request
 * BadRequestException
 *
 * 401 - Unauthorized
 * UnauthorizedException
 *
 * 403 - Forbidden
 * ForbiddenException
 *
 * 404 - Not Found
 * NotFoundException
 *
 * 405 - Method Not Allowed
 * MethodNotAllowedException
 *
 * 418 - I'm a teapot
 * ImATeapotException
 *
 * 500 - Internal Server Error
 * InternalServerErrorException
 *
 * 501 - Not Implemented
 * NotImplementedException
 *
 * 502 - Bad Gateway
 * BadGatewayException
 *
 * 503 - Service Unavailable
 * ServiceUnavailableException
 */

const error = new Elysia()
	.use(logger)
	.error({
		BadGatewayException,
		BadRequestException,
		ForbiddenException,
		ImATeapotException,
		InternalServerErrorException,
		MethodNotAllowedException,
		NotFoundException,
		NotImplementedException,
		ServiceUnavailableException,
		UnauthorizedException,
	})
	.onError({ as: "global" }, ctx => {
		const { code, error, log } = ctx;
		log.error({
			code,
			error,
		});
		return error;
	});

export { error };
