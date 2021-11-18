import { stringify } from "./stringify";

describe("#stringify", () => {
    test("should return the given value as JSON", () => {
        assert.is(stringify({ b: 1, a: 0 }), '{"b":1,"a":0}');
    });

    test("should return undefined if there are circular references", () => {
        const o: any = { b: 1, a: 0 };
        o.o = o;

        assert.is(stringify(o)), "undefined");
});
});
