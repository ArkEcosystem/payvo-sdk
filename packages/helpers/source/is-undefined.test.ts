import { describe } from "@payvo/sdk-test";

import { isUndefined } from "./is-undefined";

describe("isUndefined", async ({ assert, it, nock, loader }) => {
	it("should pass", () => {
		assert.true(isUndefined(undefined));
	});

	it("should fail", () => {
		assert.false(isUndefined("undefined"));
	});
});
