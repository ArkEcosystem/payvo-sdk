import { assert, test } from "@payvo/sdk-test";

import { indexOf } from "./index-of";

test("should return the expected index", () => {
	assert.is(indexOf([1, 2, 1, 2], 2), 1);
	assert.is(indexOf([1, 2, 1, 2], 2, 3), 3);
	assert.is(indexOf([1, 2, 1, 2], 2, 2), 3);
	assert.is(indexOf([1, 2, 1, 2], 3), -1);
	assert.is(indexOf([], 0, -1), -1);
});

test.run();
