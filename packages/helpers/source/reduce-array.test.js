import { reduceArray } from "./reduce-array";

describe("#reduceArray", () => {
	test("should work with a function", () => {
		assert.is(
			reduceArray([1, 2], (sum, n) => sum + n, 0),
			3,
		);
	});
});
