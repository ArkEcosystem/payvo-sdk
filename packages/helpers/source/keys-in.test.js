import { assert, test } from "@payvo/sdk-test";

import { keysIn } from "./keys-in";

test("should work with an object", () => {
	function Foo() {
		// @ts-ignore
		this.a = 1;
		// @ts-ignore
		this.b = 2;
	}

	Foo.prototype.c = 3;

	assert.includeAllMembers(keysIn(new Foo()), ["a", "b", "c"]);
});

test.run();