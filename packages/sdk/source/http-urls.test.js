import { describe } from "@payvo/sdk-test";
import { ensureTrailingSlash } from "./http-urls";

describe("HTTP URLs", ({ assert, it }) => {
	it("should ensure a trailing slash is set", () => {
		assert.is(ensureTrailingSlash("#"), "#/");
		assert.is(ensureTrailingSlash("/"), "/");
	});
});
