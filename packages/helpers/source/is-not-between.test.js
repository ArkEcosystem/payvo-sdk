import { describe } from "@payvo/sdk-test";

import { isNotBetween } from "./is-not-between";

describe("isNotBetween", async ({ assert, it }) => {
	it("should pass", () => {
		assert.true(isNotBetween(1, 2, 3));
	});

	it("should fail", () => {
		assert.false(isNotBetween(2, 1, 3));
	});
});
