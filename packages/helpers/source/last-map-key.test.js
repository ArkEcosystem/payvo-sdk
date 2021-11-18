import { lastMapKey } from "./last-map-key";

describe("#lastMapKey", () => {
    test("should return the last key", () => {
        assert.is(
            lastMapKey(
                new Map([
                    ["Hello", "World"],
                    ["Another", "Planet"],
                ]),
            ),
		, "Another");
    });
});
