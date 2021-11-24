import { describe } from "@payvo/sdk-test";

import { tail } from "./tail";

describe("tail", async ({ assert, it }) => {
	it("should return the array without the first item", () => {
		assert.equal(tail([1, 2, 3, 4, 5]), [2, 3, 4, 5]);
	});
});
