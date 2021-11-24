import { describe } from "@payvo/sdk-test";

import { isGreaterThan } from "./is-greater-than";

describe("isGreaterThan", async ({ assert, it }) => {
	it("should pass", () => {
		assert.true(isGreaterThan(2, 1));
	});

	it("should fail", () => {
		assert.false(isGreaterThan(1, 2));
	});
});
