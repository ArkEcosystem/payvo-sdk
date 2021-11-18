import { assert, test } from "@payvo/sdk-test";

import { isWeakMap } from "./is-weak-map";

test("should pass", () => {
	assert.true(isWeakMap(new WeakMap()));
});

test("should fail", () => {
	assert.false(isWeakMap(1));
});

test.run();