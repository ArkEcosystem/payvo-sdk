import { describe } from "@payvo/sdk-test";

import { isConstructor } from "./is-constructor";

describe("isConstructor", async ({ assert, it }) => {
	it("should pass", () => {
		assert.true(isConstructor(Date));
	});

	it("should fail", () => {
		assert.false(isConstructor([]));
	});
});
