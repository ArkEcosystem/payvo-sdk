import { describe } from "@payvo/sdk-test";

import { randomBase64 } from "./random-base64";

describe("randomBase64", async ({ assert, it, nock, loader }) => {
	it("should return a random base64 string", () => {
		assert.length(randomBase64(8), 8);
		assert.length(randomBase64(16), 16);
		assert.length(randomBase64(32), 32);
	});
});
