import { assert, describe, test } from "@payvo/sdk-test";
import { BigNumber } from "@payvo/sdk-helpers";

import Fixture from "../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet.dto";
import { createService } from "../test/mocking";

let subject;

test.before.each(async () => (subject = (await createService(WalletData)).fill(Fixture.data[0])));

test("#address", () => {
	assert.is(subject.address(), "lskk8upba9sj8zsktr8hb2vcgk3quvgmx8h27h4gr");
});

test("#publicKey", () => {
	assert.is(subject.publicKey(), "414934d5c70dec65c4c01ddef4cb131913cc53b18e0c1c375857a5e7db52484b");
});

test("#balance", () => {
	assert.instance(subject.balance().total, BigNumber);
	assert.is(subject.balance().total.toHuman(), 1509.94716);

	assert.instance(subject.balance().available, BigNumber);
	assert.is(subject.balance().available.toHuman(), 1489.94716);

	assert.instance(subject.balance().fees, BigNumber);
	assert.is(subject.balance().fees.toHuman(), 1489.94716);

	assert.instance(subject.balance().locked, BigNumber);
	assert.is(subject.balance().locked?.toHuman(), 20);

	assert.instance(subject.balance().lockedVotes, BigNumber);
	assert.is(subject.balance().lockedVotes?.toHuman(), 10);

	assert.instance(subject.balance().lockedUnvotes, BigNumber);
	assert.is(subject.balance().lockedUnvotes?.toHuman(), 10);
});

test("#isDelegate", () => {
	assert.true(subject.isDelegate());
});

test("should throw error if wallet has not registered multi-signature", () => {
	assert.throws(() => subject.multiSignature(), "This wallet does not have a multi-signature registered.");
});

test("should return number of votes received", () => {
	assert.is(subject.votes().toHuman(), 0);
});

test("should default to 0 for votes", async () => {
	const votes = (await createService(WalletData)).fill({}).votes().toHuman();

	assert.is(votes, 0);
});

test.run();