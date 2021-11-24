import { describe } from "@payvo/sdk-test";

import { findKey } from "./find-key";

describe("findKey", async ({ assert, it }) => {
	it("should work with a function", () => {
		assert.is(
			findKey(
				{
					barney: { age: 36, active: true },
					fred: { age: 40, active: false },
					pebbles: { age: 1, active: true },
				},
				(o) => o.age < 40,
			),
			"barney",
		);
	});
});
