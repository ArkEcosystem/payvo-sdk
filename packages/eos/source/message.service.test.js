import { describe } from "@payvo/sdk-test";
import { Signatories } from "@payvo/sdk";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { MessageService } from "./message.service";

let subject;

describe("MessageService", async ({ beforeEach, it, assert }) => {
	beforeEach(async () => {
		subject = await createService(MessageService);
	});

	it("should sign and verify a message", async () => {
		const result = await subject.sign({
			message: "Hello World",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: "5KTe9HSKoAF6CR2U5vy7fZYVTVg9C2YyRHtoa5hq9cUmRkCiZ18",
					address: identity.address,
					publicKey: identity.publicKey,
					privateKey: identity.privateKey,
				}),
			),
		});

		assert.true(await subject.verify(result));
	});
});
