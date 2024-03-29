class ServiceUnavailableException extends Error {
	code = "SERVICE_UNAVAILABLE";
	status = 503;
	constructor(message?: string) {
		super(message ?? "The server is currently unavailable (because it is overloaded or down for maintenance).");
		this.name = "SERVICE_UNAVAILABLE";
	}
}

export { ServiceUnavailableException };
