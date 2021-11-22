import { assert, test } from "@payvo/sdk-test";

import { isNumber } from "./is-number";

test("should pass", () => {
	assert.true(isNumber(1));
});

test("should fail", () => {
	assert.false(isNumber("1"));
});

test.run();