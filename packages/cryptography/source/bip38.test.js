import { assert, test } from "@payvo/sdk-test";

import { BIP38 } from "./bip38";
import { WIF } from "./wif";

const mnemonic = "TestingOneTwoThree";

test("#encrypt", async () => {
	const { compressed, privateKey } = WIF.decode("5KN7MzqK5wt2TP1fQCYyHBtDrXdJuXbUzm4A9rKAteGu3Qi5CVR");

	assert.is(
		BIP38.encrypt(privateKey, mnemonic, compressed),
		"6PRVWUbkzzsbcVac2qwfssoUJAN1Xhrg6bNk8J7Nzm5H7kxEbn2Nh2ZoGg",
	);
});

test("#decrypt", async () => {
	assert.equal(BIP38.decrypt("6PRVWUbkzzsbcVac2qwfssoUJAN1Xhrg6bNk8J7Nzm5H7kxEbn2Nh2ZoGg", mnemonic), {
		compressed: false,
		privateKey: "cbf4b9f70470856bb4f40f80b87edb90865997ffee6df315ab166d713af433a5",
	});
});

test("#verify", async () => {
	assert.is(BIP38.verify("6PRVWUbkzzsbcVac2qwfssoUJAN1Xhrg6bNk8J7Nzm5H7kxEbn2Nh2ZoGg"), true);
});

test.run();
