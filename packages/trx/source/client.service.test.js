import { describe, loader } from "@payvo/sdk-test";
import { Collections, IoC, Services } from "@payvo/sdk";
import { nock } from "@payvo/sdk-test";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";
import { WalletData } from "./wallet.dto";
import { ClientService } from "./client.service";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto";

let subject;

describe("ClientService", async ({ beforeAll, assert, it }) => {
	beforeAll(async () => {
		subject = await createService(ClientService, undefined, (container) => {
			container.constant(IoC.BindingType.Container, container);
			container.constant(IoC.BindingType.DataTransferObjects, {
				SignedTransactionData,
				ConfirmedTransactionData,
				WalletData,
			});
			container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
		});
	});

	it("#transaction", async () => {
		nock.fake("https://api.shasta.trongrid.io")
			.post("/wallet/gettransactionbyid")
			.reply(200, loader.json(`test/fixtures/client/transaction.json`));

		const result = await subject.transaction("0daa9f2507c4e79e39391ea165bb76ed018c4cd69d7da129edf9e95f0dae99e2");

		assert.instance(result, ConfirmedTransactionData);
	});

	it("#transactions", async () => {
		nock.fake("https://api.shasta.trongrid.io")
			.get("/v1/accounts/TUrM3F7b7WVZSZVjgrqsVBYXQL3GVgAqXq/transactions")
			.query(true)
			.reply(200, loader.json(`test/fixtures/client/transactions.json`));

		const result = await subject.transactions({
			identifiers: [{ type: "address", value: "TUrM3F7b7WVZSZVjgrqsVBYXQL3GVgAqXq" }],
		});

		assert.instance(result, Collections.ConfirmedTransactionDataCollection);
	});

	it("#wallet", async () => {
		nock.fake("https://api.shasta.trongrid.io")
			.get("/v1/accounts/TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ")
			.reply(200, loader.json(`test/fixtures/client/wallet.json`));

		const result = await subject.wallet({
			type: "address",
			value: "TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ",
		});

		assert.instance(result, WalletData);
	});

	it("broadcast should pass", async () => {
		nock.fake("https://api.shasta.trongrid.io")
			.post("/wallet/broadcasttransaction")
			.reply(200, loader.json(`test/fixtures/client/broadcast.json`));

		const result = await subject.broadcast([
			createService(SignedTransactionData).configure(
				loader.json(`test/fixtures/crypto/transferSigned.json`).txID,
				loader.json(`test/fixtures/crypto/transferSigned.json`),
				loader.json(`test/fixtures/crypto/transferSigned.json`),
			),
		]);

		assert.equal(result, {
			accepted: ["8768a0f9849e2189fe323d4bb9d7485e7a045273096275f1bcb51b1433f73fc3"],
			rejected: [],
			errors: {},
		});
	});

	it("broadcast should fail", async () => {
		nock.fake("https://api.shasta.trongrid.io")
			.post("/wallet/broadcasttransaction")
			.reply(200, loader.json(`test/fixtures/client/broadcast-failure.json`));

		const result = await subject.broadcast([
			createService(SignedTransactionData).configure(
				loader.json(`test/fixtures/crypto/transferSigned.json`).txID,
				loader.json(`test/fixtures/crypto/transferSigned.json`),
				loader.json(`test/fixtures/crypto/transferSigned.json`),
			),
		]);

		assert.equal(result, {
			accepted: [],
			rejected: ["8768a0f9849e2189fe323d4bb9d7485e7a045273096275f1bcb51b1433f73fc3"],
			errors: {
				"8768a0f9849e2189fe323d4bb9d7485e7a045273096275f1bcb51b1433f73fc3": "SIGERROR",
			},
		});
	});
});
