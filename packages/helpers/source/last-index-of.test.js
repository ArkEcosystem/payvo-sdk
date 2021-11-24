import { describe } from "@payvo/sdk-test";

import { lastIndexOf } from "./last-index-of";

describe("lastIndexOf", async ({ assert, it }) => {
	it("should return the expected index", () => {
		assert.is(lastIndexOf([1, 2, 1, 2], 2), 3);
		assert.is(lastIndexOf([1, 2, 1, 2], 2, 3), 3);
		assert.is(lastIndexOf([1, 2, 1, 2], 2, 2), 1);
		assert.is(lastIndexOf([1, 2, 1, 2], 3), -1);
		assert.is(lastIndexOf([], 0, -1), -1);
	});
});
