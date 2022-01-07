import { describe } from "@payvo/sdk-test";
import { BigNumber } from "@payvo/sdk-helpers";

import Fixture from "../test/fixtures/client/transaction.json";
import { createService } from "../test/mocking";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.js";

describe("ConfirmedTransactionData", async ({ beforeEach, assert, it, nock, loader }) => {
	beforeEach(async (context) => {
		context.subject = await createService(ConfirmedTransactionData);
		context.subject.configure(Fixture);
	});

	it("should have an id", (context) => {
		assert.is(context.subject.id(), "0xf6ad7f16653a2070f36c5f9c243acb30109da76658b54712745136d8e8236eae");
	});

	it("should have a type", (context) => {
		assert.is(context.subject.type(), "transfer");
	});

	it("should have a timestamp", (context) => {
		assert.undefined(context.subject.timestamp());
	});

	it("should have confirmations", (context) => {
		assert.is(context.subject.confirmations(), BigNumber.ZERO);
	});

	it("should have a sender", (context) => {
		assert.is(context.subject.sender(), "0xac1a0f50604c430c25a9fa52078f7f7ec9523519");
	});

	it("should have a recipient", (context) => {
		assert.is(context.subject.recipient(), "0xb5663d3a23706eb4537ffea78f56948a53ac2ebe");
	});

	it("should have an amount", (context) => {
		assert.is(context.subject.amount().toString(), "10000000000000000000");
	});

	it("should have a fee", (context) => {
		assert.is(context.subject.fee().toString(), "28000");
	});

	it("should have a memo", (context) => {
		assert.undefined(context.subject.memo());
	});

	it("should have a method to serialize into object", (context) => {
		assert.object(context.subject.toObject());
	});

	it("should have a method to get raw data", (context) => {
		assert.is(context.subject.raw(), Fixture);
	});
});
