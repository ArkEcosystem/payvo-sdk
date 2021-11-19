import { createService } from "../test/mocking";
import { ExtendedPublicKeyService } from "./extended-public-key.service";

let subject: ExtendedPublicKeyService;

test.before.each(async () => {
    subject = await createService(ExtendedPublicKeyService);
});

describe("ExtendedPublicKeyService", () => {
    test("#fromMnemonic", async () => {
        await assert.is(
            subject.fromMnemonic(
                "excess behave track soul table wear ocean cash stay nature item turtle palm soccer lunch horror start stumble month panic right must lock dress",
            ),
        ).resolves,
            "xpub14mpsxvx74mxaw5p3jksdwvp9d7h0sup8qg43hhd8eg9xr09q540y64667k5nhh6fqk3hqtadah69r6jcg7gayvadayykt4sghtzhxpqca4vve",
        );
});
});