import { assert, test } from "@payvo/sdk-test";
import { DateTime } from "@payvo/sdk-intl";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";
import { Exceptions } from "@payvo/sdk";

let subject;

test.before.each(async () => {
	subject = await createService(SignedTransactionData);

	subject.configure(
		"3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572",
		{
			timestamp: "1970-01-01T00:00:00.000Z",
		},
		"",
	);
});

test("#timestamp", () => {
	assert.true(DateTime.make(0).isSame(subject.timestamp()));
});

test.run();