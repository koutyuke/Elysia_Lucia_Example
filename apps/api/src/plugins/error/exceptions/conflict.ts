class ConflictException extends Error {
	code = "CONFLICT";
	status = 409;
	constructor(message?: string) {
		super(
			message ?? "The request could not be completed due to a conflict with the current state of the target resource.",
		);
		this.name = "CONFLICT";
	}
}

export { ConflictException };
