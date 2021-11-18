import { test } from "uvu";
import * as assert from "uvu/assert";

import { Numeral } from "./numeral";

test("#format", () => {
	assert.is(Numeral.make("en").format(5000), "5,000");
});

test("#formatAsCurrency", () => {
	assert.is(Numeral.make("en").formatAsCurrency(5000, "EUR"), "€5,000.00");
});

test("#formatAsUnit", () => {
	assert.is(Numeral.make("en").formatAsUnit(5000, "kilobyte"), "5,000 kB");
});

test.run();
