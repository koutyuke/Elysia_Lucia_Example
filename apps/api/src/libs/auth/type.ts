// ref: https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims

type openIdConnectUserInfo = {
	sub: string; // Subject - Identifier for the End-User at the Issuer.
	name?: string; // End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences.
	given_name?: string; // Given name(s) or first name(s) of the End-User.
	family_name?: string; // Surname(s) or last name(s) of the End-User.
	middle_name?: string; // Middle name(s) of the End-User.
	nickname?: string; // Casual name of the End-User that may or may not be the same as the given_name.
	preferred_username?: string; // Shorthand name by which the End-User wishes to be referred to.
	profile?: string; // URL of the End-User's profile page.
	picture?: string; // URL of the End-User's profile picture.
	website?: string; // URL of the End-User's Web page or blog.
	email?: string; // End-User's preferred e-mail address.
	email_verified?: boolean; // True if the End-User's e-mail address has been verified; otherwise false.
	gender?: string; // End-User's gender.
	birthdate?: string; // End-User's birthday, represented as an ISO 8601:2004 [ISO8601‑2004] YYYY-MM-DD format. The year may be 0000, indicating that it is omitted.
	zoneinfo?: string; // String from zoneinfo time zone database representing the End-User's time zone.
	locale?: string; // End-User's locale, represented as a BCP47 [RFC5646] language tag.
	phone_number?: string; // End-User's preferred telephone number.
	phone_number_verified?: boolean; // True if the End-User's phone number has been verified; otherwise false.
	address?: {
		formatted?: string; // Full mailing address, formatted for display or use on a mailing label.
		street_address?: string; // Full street address component, which MAY include house number, street name, Post Office Box, and multi-line extended street address information.
		locality?: string; // City or locality component.
		region?: string; // State, province, prefecture, or region component.
		postal_code?: string; // Zip code or postal code component.
		country?: string; // Country name component.
	};
	updated_at?: number; // Time the information was last updated. Represented as seconds since the Unix epoch.
};

export type { openIdConnectUserInfo };
