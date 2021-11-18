import { assert, test } from "@payvo/sdk-test";

import { includes } from "./includes";

test("should work with a function", () => {
	assert.true(includes([1, 2, 3], 1));

	assert.false(includes([1, 2, 3], 4));

	assert.true(includes({ a: 1, b: 2 }, 1));

	assert.true(includes("abcd", "bc"));

	assert.false(includes(1, 2));
});

test.run();