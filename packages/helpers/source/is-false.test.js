import { assert, test } from "@payvo/sdk-test";

import { isFalse } from "./is-false";

test("should pass", () => {
	assert.true(isFalse(false));
});

test("should fail", () => {
	assert.false(isFalse(true));
});

test.run();
