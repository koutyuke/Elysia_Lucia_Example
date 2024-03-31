type AuthProvider = "discord" | "google" | "line";

type BaseAuthAccountInfo = {
	id: string;
	username: string;
	email: string;
	iconUrl: string;
};

export type { AuthProvider, BaseAuthAccountInfo };
