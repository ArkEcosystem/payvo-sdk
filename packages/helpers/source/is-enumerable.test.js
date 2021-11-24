import { describe } from "@payvo/sdk-test";

import { isEnumerable } from "./is-enumerable";

const object1 = {};
const array1 = [];

object1.property1 = 42;

array1[0] = 42;

describe("isEnumerable", async ({ assert, it }) => {
	it("should work with objects and arrays", () => {
		assert.true(isEnumerable(object1, "property1"));
		assert.true(isEnumerable(array1, 0));
		assert.false(isEnumerable(array1, "length"));
	});
});
