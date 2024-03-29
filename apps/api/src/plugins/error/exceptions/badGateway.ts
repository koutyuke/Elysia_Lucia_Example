class BadGatewayException extends Error {
	code = "BAD_GATEWAY";
	status = 502;
	constructor(message?: string) {
		super(message ?? "The upstream server returned an invalid response.");
		this.name = "BAD_GATEWAY";
	}
}

export { BadGatewayException };
