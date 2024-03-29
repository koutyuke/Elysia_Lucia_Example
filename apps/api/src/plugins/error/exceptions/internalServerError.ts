class InternalServerErrorException extends Error {
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(message?: string) {
		super(message ?? "An internal server error has occurred. Please contact the administrator.");
		this.name = "INTERNAL_SERVER_ERROR";
	}
}

export { InternalServerErrorException };
