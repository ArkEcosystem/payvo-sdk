import { map } from "./map.js";

describe("#map", () => {
	it("should work like lodash", () => {
		assert.is(
			map([4, 8], (n) => n * n),
			[16, 64],
		);
	});

	it("should work like lodash", () => {
		assert.is(
			map({ a: 4, b: 8 }, (n) => n * n),
			[16, 64],
		);
	});
});
