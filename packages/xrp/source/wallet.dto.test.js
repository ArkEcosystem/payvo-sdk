import { assert, test } from "@payvo/sdk-test";
import { BigNumber } from "@payvo/sdk-helpers";

import fixture from "../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet.dto";
import { createService } from "../test/mocking";

test("should succeed", async () => {
	const result = createService(WalletData).fill(fixture.result.account_data);

	assert.instance(result, WalletData);
	assert.is(result.address(), "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
	assert.undefined(result.publicKey());
	assert.equal(result.balance().available, BigNumber.make("92291324300"));
});

test.run();
