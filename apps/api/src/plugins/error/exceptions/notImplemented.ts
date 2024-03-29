class NotImplementedException extends Error {
	code = "NOT_IMPLEMENTED";
	status = 501;
	constructor(message?: string) {
		super(message ?? "The requested functionality is not implemented.");
		this.name = "NOT_IMPLEMENTED";
	}
}

export { NotImplementedException };
