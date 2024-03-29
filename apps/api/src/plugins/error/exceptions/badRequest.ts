class BadRequestException extends Error {
	code = "BAD_REQUEST";
	status = 400;
	constructor(message?: string) {
		super(message ?? "The request is invalid. Please check the data you've entered.");
		this.name = "BAD_REQUEST";
	}
}

export { BadRequestException };
