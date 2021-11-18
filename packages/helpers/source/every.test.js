import { every } from "./every";
import { isBoolean } from "./is-boolean";

describe("#every", () => {
	test("should work with a functions", () => {
		assert.is(every([true, false], isBoolean), true);
		assert.is(every([true, false, "yes"], isBoolean), false);
	});
});
