import { describe } from "@payvo/sdk-test";
import { DateTime } from "@payvo/sdk-intl";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";
import { BigNumber } from "@payvo/sdk-helpers";

let subject;

describe("SignedTransactionData", async ({ assert, beforeEach, it }) => {
	beforeEach(async () => {
		subject = await createService(SignedTransactionData);

		subject.configure(
			"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
			{
				id: "3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
				amount: "125000000000",
				fee: "0",
				timestamp: "1970-01-01T00:00:00.000Z",
				sender: "0208e6835a8f020cfad439c059b89addc1ce21f8cab0af6e6957e22d3720bff8a4",
				recipient: "D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax",
			},
			"",
		);
	});

	it("should have a sender", () => {
		assert.is(subject.sender(), "0208e6835a8f020cfad439c059b89addc1ce21f8cab0af6e6957e22d3720bff8a4");
	});

	it("should have a recipient", () => {
		assert.is(subject.recipient(), "D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax");
	});

	it("should have an amount", () => {
		assert.is(subject.amount().toHuman(), 125);
	});

	it("should have a fee", () => {
		assert.equal(subject.fee(), BigNumber.ZERO);
	});

	it("should have a timestamp", () => {
		assert.equal(subject.timestamp(), DateTime.make(0));
	});
});
