import { describeWithContext } from "@payvo/sdk-test";

import { PBKDF2 } from "./pbkdf2";

describeWithContext(
	"PBKDF2",
	{
		message: "Hello World",
		password: "password"
	},
	({ assert, it }) => {
		it("should encrypt the given value", async ({ message, password }) => {
			assert.type(PBKDF2.encrypt(message, password), "string");
		});

		it("should decrypt the given value", async ({ message, password }) => {
			assert.is(PBKDF2.decrypt(PBKDF2.encrypt(message, password), password), message);
		});
	},
);
