import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { PublicKeyService } from "./public-key.service";

let subject;

test.before.each(async () => {
	subject = await createService(PublicKeyService);
});

describe("PublicKey", () => {
	test("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		assert.equal(result, { publicKey: identity.publicKey });
	});

	test("should generate an output from a wif", async () => {
		const result = await subject.fromWIF(identity.wif);

		assert.equal(result, { publicKey: identity.publicKey });
	});
});