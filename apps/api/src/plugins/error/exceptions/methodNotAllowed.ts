class MethodNotAllowedException extends Error {
	code = "METHOD_NOT_ALLOWED";
	status = 405;
	constructor(message?: string) {
		super(message ?? "The HTTP method is not allowed. Please check the request method.");
		this.name = "METHOD_NOT_ALLOWED";
	}
}

export { MethodNotAllowedException };
