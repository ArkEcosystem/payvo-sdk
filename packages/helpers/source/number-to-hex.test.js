import { describe } from "@payvo/sdk-test";

import { numberToHex } from "./number-to-hex";

describe("numberToHex", async ({ assert, it }) => {
	it("should return the number as hex", () => {
		assert.is(numberToHex(1), "01");
	});
});
