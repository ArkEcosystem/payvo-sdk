import { assert, test } from "@payvo/sdk-test";

import { flatten } from "./flatten";

test("should return a flattened array", () => {
	assert.equal(flatten([1, [2, 3], [4, [5, [6, 7]]]]), [1, 2, 3, 4, 5, 6, 7]);
	assert.equal(flatten([1, [2, 3], 4, [5, [6, [7], 8], 9], 10]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test.run();