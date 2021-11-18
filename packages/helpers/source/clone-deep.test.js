import { assert, test } from "@payvo/sdk-test";

import { cloneDeep } from "./clone-deep";

test("should work with objects", () => {
	const object = { a: 1 };

	assert.equal(cloneDeep(object), object);
});

test("should work with class instances", () => {
	class Wallet {
		constructor(address) {}

		isDelegate() {
			return true;
		}
	}

	const original = new Wallet("address");

	assert.equal(original, original);
	assert.true(original.isDelegate());
	assert.is(original.address, "address");

	const clone = cloneDeep(original);

	assert.equal(clone, original);
	assert.true(clone.isDelegate());
	assert.is(clone.address, "address");
});

test.run();
