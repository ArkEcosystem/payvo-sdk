import { IoC, Services, Signatories } from "@payvo/sdk";
import { waitReady } from "@polkadot/wasm-crypto";

import { identity } from "../test/fixtures/identity";
import { createServiceAsync } from "../test/mocking";
import { BindingType } from "./constants";
import { createApiPromise, createKeyring } from "./factories";
import { AddressService } from "./address.service";
import { KeyPairService } from "./key-pair.service";
import { PublicKeyService } from "./public-key.service";
import { TransactionService } from "./transaction.service";
import { SignedTransactionData } from "./signed-transaction.dto";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto";
import { WalletData } from "./wallet.dto";

let subject: TransactionService;

test.before(async () => {
	await waitReady();

	subject = await createServiceAsync(TransactionService, undefined, async (container: IoC.Container) => {
		const apiPromise = await createApiPromise(container.get(IoC.BindingType.ConfigRepository));
		const keyring = createKeyring(container.get(IoC.BindingType.ConfigRepository));

		container.constant(BindingType.ApiPromise, apiPromise);
		container.constant(BindingType.Keyring, keyring);

		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.constant(IoC.BindingType.DataTransferObjects, {
			SignedTransactionData,
			ConfirmedTransactionData,
			WalletData,
		});
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
		container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
	});
});

describe("TransactionService", () => {
	describe("#transfer", () => {
		it.skip("should verify", async () => {
			const result = await subject.transfer({
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: identity.mnemonic,
						address: identity.address,
						publicKey: identity.publicKey,
						privateKey: identity.privateKey,
					}),
				),
				data: {
					amount: 12345,
					to: identity.address,
				},
			});

			assert.is(result instanceof SignedTransactionData);
			assert.is(result.amount().toString(), "123450000000000");
		});
	});
});
