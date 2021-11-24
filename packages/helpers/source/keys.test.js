import { describe } from "@payvo/sdk-test";

import { keys } from "./keys";

describe("keys", async ({ assert, it }) => {
	it("should work with an object", () => {
		function Foo() {
			this.a = 1;

			this.b = 2;
		}

		Foo.prototype.c = 3;

		assert.equal(keys(new Foo()), ["a", "b"]);
	});

	it("should work with a string", () => {
		assert.equal(keys("hi"), ["0", "1"]);
	});

	it("should work with an array", () => {
		assert.equal(keys([1, 2, 3, 4]), ["0", "1", "2", "3"]);
	});
});
