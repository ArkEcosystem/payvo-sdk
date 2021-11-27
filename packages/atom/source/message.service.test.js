import { describe } from "@payvo/sdk-test";
import { IoC, Signatories } from "@payvo/sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { KeyPairService } from "./key-pair.service";
import { MessageService } from "./message.service";

describe("MessageService", async ({ beforeEach, assert, it }) => {
	beforeEach(async (context) => {
		context.subject = await createService(MessageService, undefined, (container) => {
			container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
		});
	});

	it("should sign and verify a message", async (context) => {
		const result = await context.subject.sign({
			message: "Hello World",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: identity.mnemonic,
					address: identity.address,
					publicKey: identity.publicKey,
					privateKey: identity.privateKey,
				}),
			),
		});

		assert.true(await context.subject.verify(result));
	});
});
