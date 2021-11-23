import { describe } from "@payvo/sdk-test";
import { createService } from "../test/mocking";
import { ExtendedPublicKeyService } from "./extended-public-key.service";

let subject;

describe("ExtendedPublicKeyService", async ({ assert, beforeEach, it }) => {
	beforeEach(async () => {
		subject = await createService(ExtendedPublicKeyService);
	});

	it("should generate an output from a mnemonic", async () => {
		assert.is(
			await subject.fromMnemonic(
				"excess behave track soul table wear ocean cash stay nature item turtle palm soccer lunch horror start stumble month panic right must lock dress",
			),
			"xpub14mpsxvx74mxaw5p3jksdwvp9d7h0sup8qg43hhd8eg9xr09q540y64667k5nhh6fqk3hqtadah69r6jcg7gayvadayykt4sghtzhxpqca4vve",
		);
	});
});
