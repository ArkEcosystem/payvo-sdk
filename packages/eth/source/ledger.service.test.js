import { assert, describe, loader, test } from "@payvo/sdk-test";
import { IoC, Services } from "@payvo/sdk";
import { openTransportReplayer, RecordStore } from "@ledgerhq/hw-transport-mocker";

import { ledger } from "../test/fixtures/ledger";
import { createService } from "../test/mocking";
import { AddressService } from "./address.service";
import { ClientService } from "./client.service";
import { LedgerService } from "./ledger.service";
import { SignedTransactionData } from "./signed-transaction.dto";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto";
import { WalletData } from "./wallet.dto";

const createMockService = async (record) => {
	const transport = await createService(LedgerService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(IoC.BindingType.ClientService, ClientService);
		container.constant(IoC.BindingType.DataTransferObjects, {
			SignedTransactionData,
			ConfirmedTransactionData,
			WalletData,
		});
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
		container.constant(
			IoC.BindingType.LedgerTransportFactory,
			async () => await openTransportReplayer(RecordStore.fromString(record)),
		);
	});

	await transport.connect();

	return transport;
};

describe("disconnect", () => {
	test("should pass with a resolved transport closure", async () => {
		const trx = await createMockService("");

		assert.undefined(await trx.disconnect());
	});
});

describe("getVersion", () => {
	test("should pass with an app version", async () => {
		const trx = await createMockService(ledger.appVersion.record);

		assert.is(await trx.getVersion(), ledger.appVersion.result);
	});
});

describe("getPublicKey", () => {
	test("should pass with a compressed publicKey", async () => {
		const trx = await createMockService(ledger.publicKey.record);

		assert.is(await trx.getPublicKey(ledger.bip44.path), ledger.publicKey.result);
	});
});

describe("signTransaction", () => {
	test("should pass with a signature", async () => {
		const trx = await createMockService(ledger.transaction.record);

		const result = await trx.signTransaction(ledger.bip44.path, Buffer.from(ledger.transaction.payload, "hex"));

		assert.equal(JSON.parse(result), ledger.transaction.result);
	});
});

describe("signMessage", () => {
	test("should pass with a signature", async () => {
		const trx = await createMockService(ledger.message.record);

		const result = await trx.signMessage(ledger.bip44.path, Buffer.from(ledger.message.payload, "hex"));

		assert.equal(JSON.parse(result), ledger.message.result);
	});
});

test.run();
