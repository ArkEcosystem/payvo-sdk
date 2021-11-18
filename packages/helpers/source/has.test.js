import { has } from "./has";

describe("#has", () => {
	test("should return false if the target is not an object", () => {
		assert.is(has([], "a.b.c"), false);
	});

	test("should return false if the path is not a string", () => {
		// @ts-ignore
		assert.is(has({}, 123), false);
	});

	test("should not do anything if the object is not an object", () => {
		assert.is(has([], "a.b.c"), false);
	});

	test("should work like lodash", () => {
		const object = { a: { b: 2 } };

		assert.is(has(object, "a"), true);
		assert.is(has(object, "a.b"), true);
		assert.is(has(object, "c"), false);
		assert.is(has({ a: undefined }, "a"), true);
	});

	test("should exit early if it encounters a non-object value", () => {
		const object = { a: { b: 2 } };

		assert.is(has(object, "a.b.c"), false);
	});
});
