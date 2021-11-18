import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { KeyPairService } from "./key-pair.service";

let subject;

test.before.each(async () => {
	subject = await createService(KeyPairService);
});

describe("Keys", () => {
	test("should generate an output from a mnemonic", async () => {
		const result = await subject.fromMnemonic(identity.mnemonic);

		assert.equal(result, {
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});

	test("should fail from an invalid mnemonic", async () => {
		await assert.rejects(() => subject.fromMnemonic(identity.mnemonic.slice(0, 10)));
	});

	test("should generate an output from a privateKey", async () => {
		const result = await subject.fromPrivateKey(identity.privateKey);

		assert.equal(result, {
			privateKey: identity.privateKey,
			publicKey: identity.publicKey,
		});
	});
});
