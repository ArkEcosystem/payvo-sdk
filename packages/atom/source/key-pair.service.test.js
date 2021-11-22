import { assert, test } from "@payvo/sdk-test";
import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { KeyPairService } from "./key-pair.service";

let subject;

test.before.each(async () => {
	subject = await createService(KeyPairService);
});

test("should generate an output from a mnemonic", async () => {
	const result = await subject.fromMnemonic(identity.mnemonic);

	assert.equal(result, {
		path: "m/44'/118'/0'/0/0",
		privateKey: "22c88ff4e97fb3831564b094129933cea8303c4b5ed8d9a872c34746e72db748",
		publicKey: "030231b08f7297f25ce80c593fec839d1fe30d1f340d12d8dcefdb2b17055bd998",
	});
});

test.run();