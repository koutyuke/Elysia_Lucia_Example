class UnauthorizedException extends Error {
	code = "UNAUTHORIZED";
	status = 401;
	constructor(message?: string) {
		super(message ?? "You are not authorized to access this resource.");
		this.name = "UNAUTHORIZED";
	}
}

export { UnauthorizedException };
