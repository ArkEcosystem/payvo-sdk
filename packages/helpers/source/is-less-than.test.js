import { isLessThan } from "./is-less-than";

describe("#isLessThan", () => {
	test("should pass", () => {
		assert.is(isLessThan(5, 10), true);
	});

	test("should fail", () => {
		assert.is(isLessThan(10, 5), false);
	});
});
