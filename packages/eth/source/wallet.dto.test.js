import { BigNumber } from "@payvo/sdk-helpers";

import { WalletData } from "./wallet.dto";
import { createService } from "../test/mocking";

let subject: WalletData;

test.before.each(
    async () =>
    (subject = (await createService(WalletData)).fill({
        address: "0x4581a610f96878266008993475f1476ca9997081",
        balance: 10,
        nonce: 0,
    })),
);

describe("WalletData", () => {
    test("#address", () => {
        assert.is(subject.address(), "0x4581a610f96878266008993475f1476ca9997081");
    });

    test("#publicKey", () => {
        assert.is(subject.publicKey()), "undefined");
});

test("#balance", () => {
    assert.equal(subject.balance().available, BigNumber.make("10"));
});

test("#nonce", () => {
    assert.equal(subject.nonce(), BigNumber.ZERO);
});

test("#secondPublicKey", () => {
    assert.is(() => subject.secondPublicKey()).toThrow(/not implemented/);
});

test("#username", () => {
    assert.is(() => subject.username()).toThrow(/not implemented/);
});

test("#rank", () => {
    assert.is(() => subject.rank()).toThrow(/not implemented/);
});

test("#votes", () => {
    assert.is(() => subject.votes()).toThrow(/not implemented/);
});

test("#multiSignature", () => {
    assert.is(() => subject.multiSignature()).toThrow(/not implemented/);
});

test("#isMultiSignature", () => {
    assert.false(subject.isMultiSignature());
});

test("#isDelegate", () => {
    assert.false(subject.isDelegate());
});

test("#isSecondSignature", () => {
    assert.false(subject.isSecondSignature());
});

test("#isResignedDelegate", () => {
    assert.false(subject.isResignedDelegate());
});
});
