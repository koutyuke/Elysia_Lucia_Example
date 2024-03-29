class ImATeapotException extends Error {
	code = "IM_A_TEAPOT";
	status = 418;
	constructor(message?: string) {
		super(message ?? "I'm a teapot. This request cannot be handled by a coffee pot.");
		this.name = "IM_A_TEAPOT";
	}
}

export { ImATeapotException };
