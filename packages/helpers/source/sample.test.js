import { sample } from "./sample";

describe("#sample", () => {
    test("should return a random item", () => {
        assert.is(sample([1, 2, 3, 4, 5])), "number");
});
});
