import { describe } from "@payvo/sdk-test";

import { trimTrailingSlash } from "./trim-trailing-slash";

describe("trimTrailingSlash", async ({ assert, it }) => {
	it("should remove all trailing slashes", () => {
		assert.is(trimTrailingSlash("/owner/path"), "/owner/path");
		assert.is(trimTrailingSlash("/owner/path/"), "/owner/path");
		assert.is(trimTrailingSlash("/owner/path//"), "/owner/path");
		assert.is(trimTrailingSlash("/owner/path//"), "/owner/path");
		assert.is(trimTrailingSlash("/owner/path///"), "/owner/path");
	});
});
