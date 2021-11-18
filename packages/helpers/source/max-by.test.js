import { maxBy } from "./max-by";

	test("should work with a function", () => {
		assert.equal(
			maxBy([{ n: 2 }, { n: 3 }, { n: 1 }, { n: 5 }, { n: 4 }], (o) => o.n),
			{ n: 5 },
		);
	});
