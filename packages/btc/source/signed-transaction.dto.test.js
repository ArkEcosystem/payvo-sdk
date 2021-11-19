import { assert, describe, test } from "@payvo/sdk-test";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";

let subject;

test.before.each(async () => {
	subject = await createService(SignedTransactionData);

	subject.configure(
		"912ff5cac9d386fad9ad59a7661ed713990a8db12a801b34a3e8de0f27057371",
		{
			sender: "mv9pNZs3d65sjL68JueZDphWe3vHNmmSn6",
			recipient: "tb1q705a7ak4ejlmfc5uq3afg2q45v4yw7kyv8jgsn",
			amount: 100_000,
			fee: 12_430,
			timestamp: "1970-01-01T00:00:00.000Z",
		},
		"",
	);
});

describe("SignedTransactionData", () => {
	test("#sender", () => {
		assert.is(subject.sender(), "mv9pNZs3d65sjL68JueZDphWe3vHNmmSn6");
	});

	test("#recipient", () => {
		assert.is(subject.recipient(), "tb1q705a7ak4ejlmfc5uq3afg2q45v4yw7kyv8jgsn");
	});

	test("#amount", () => {
		assert.is(subject.amount().toNumber(), 100_000);
	});

	test("#fee", () => {
		assert.is(subject.fee().toNumber(), 12_430);
	});

	test("#timestamp", () => {
		assert.is(subject.timestamp().toISOString(), "1970-01-01T00:00:00.000Z");
	});
});

test.run();
