import { IoC, Services, Signatories, Test } from "@payvo/sdk";
import nock from "nock";

import { identity } from "../test/fixtures/identity";
import { createService, requireModule } from "../test/mocking";
import { AddressService } from "./address.service";
import { ClientService } from "./client.service";
import { KeyPairService } from "./key-pair.service";
import { PrivateKeyService } from "./private-key.service";
import { PublicKeyService } from "./public-key.service";
import { TransactionService } from "./transaction.service";
import { SignedTransactionData } from "./signed-transaction.dto";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto";
import { WalletData } from "./wallet.dto";

let subject: TransactionService;

test.before(async () => {
	subject = await createService(TransactionService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(IoC.BindingType.ClientService, ClientService);
		container.constant(IoC.BindingType.DataTransferObjects, {
			SignedTransactionData,
			ConfirmedTransactionData,
			WalletData,
		});
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
		container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
		container.singleton(IoC.BindingType.PrivateKeyService, PrivateKeyService);
	});
});

test.before(async () => {
	nock.disableNetConnect();
});

describe("TransactionService", () => {
	test("#transfer", async () => {
		nock("https://api.shasta.trongrid.io")
			.post("/wallet/createtransaction")
			.reply(200, requireModule(`../test/fixtures/crypto/transfer.json`))
			.post("/wallet/broadcasttransaction")
			.reply(200, { result: true, txid: "920048e37005eb84299fe99ae666dcfe220a5befa587eec9c36c9e75dc37f821" });

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
				to: "TEre3kN6JdPzqCNpiZT8JWM4kt8iGrg1Rm",
				amount: 1,
			},
		});

		assert.is(result, "object");
		assert.is(result.amount().toNumber(), 1_000_000);
	});
});
