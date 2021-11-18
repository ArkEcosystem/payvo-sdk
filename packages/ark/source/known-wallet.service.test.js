import { assert, test } from "@payvo/sdk-test";
import { Coins, IoC } from "@payvo/sdk";
import nock from "nock";

import { createService } from "../test/mocking";
import { KnownWalletService } from "./known-wallet.service";

let subject;

test.before(() => nock.disableNetConnect());

test.before.each(async () => {
	subject = await createService(KnownWalletService);
});

test.after.each(() => nock.cleanAll());

test("should return a list of known wallets if the request succeeds", async () => {
	const wallets = [
		{
			type: "team",
			name: "ACF Hot Wallet",
			address: "AagJoLEnpXYkxYdYkmdDSNMLjjBkLJ6T67",
		},
		{
			type: "team",
			name: "ACF Hot Wallet (old)",
			address: "AWkBFnqvCF4jhqPSdE2HBPJiwaf67tgfGR",
		},
	];

	nock("https://raw.githubusercontent.com")
		.get("/ArkEcosystem/common/master/devnet/known-wallets-extended.json")
		.reply(200, wallets);

	assert.equal(await subject.all(), wallets);
});

test("should return an empty list if the request fails", async () => {
	nock("https://raw.githubusercontent.com")
		.get("/ArkEcosystem/common/master/devnet/known-wallets-extended.json")
		.reply(404);

	assert.equal(await subject.all(), []);
});

test("should return an empty list if the request response is not an array", async () => {
	nock("https://raw.githubusercontent.com")
		.get("/ArkEcosystem/common/master/devnet/known-wallets-extended.json")
		.reply(200, {});

	assert.equal(await subject.all(), []);
});

test("should return an empty list if the source is empty", async () => {
	subject = await createService(KnownWalletService, undefined, async (container) => {
		container.get(IoC.BindingType.ConfigRepository).forget(Coins.ConfigKey.KnownWallets);
	});

	assert.equal(await subject.all(), []);
});

test.run();
