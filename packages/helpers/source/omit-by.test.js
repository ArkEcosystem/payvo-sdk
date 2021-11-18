import { assert, test } from "@payvo/sdk-test";

import { isNumber } from "./is-number";
import { omitBy } from "./omit-by";

test("should work with a function", () => {
	assert.equal(omitBy({ a: 1, b: "2", c: 3 }, isNumber), { b: "2" });
});

test.run();
