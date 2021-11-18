import { assert, test } from "@payvo/sdk-test";

import { CappedMap } from "./capped-map";

test("should set and get an entry", () => {
	const store = new CappedMap(100);
	store.set("foo", 1);
	store.set("bar", 2);

	assert.is(store.get("foo"), 1);
	assert.is(store.count(), 2);
});

test("should get an entry", () => {
	const store = new CappedMap(2);
	store.set("1", 1);
	store.set("2", 2);

	assert.is(store.get("1"), 1);
	assert.is(store.get("3"), "undefined");

    store.set("3", 3);

    assert.false(store.has("1"));
    assert.true(store.has("2"));
    assert.true(store.has("3"));
});

test("should set entries and remove ones that exceed the maximum size", () => {
    const store = new CappedMap(2);
    store.set("foo", 1);
    store.set("bar", 2);

    assert.is(store.get("foo"), 1);
    assert.is(store.get("bar"), 2);

    store.set("baz", 3);
    store.set("faz", 4);

    assert.false(store.has("foo"));
    assert.false(store.has("bar"));
    assert.true(store.has("baz"));
    assert.true(store.has("faz"));
    assert.is(store.count(), 2);
});

test("should update an entry", () => {
    const store = new CappedMap(100);
    store.set("foo", 1);

    assert.is(store.get("foo"), 1);

    store.set("foo", 2);

    assert.is(store.get("foo"), 2);
    assert.is(store.count(), 1);
});

test("should return if an entry exists", () => {
    const store = new CappedMap(100);
    store.set("1", 1);

    assert.true(store.has("1"));
});

test("should remove the specified entrys", () => {
    const store = new CappedMap(100);
    store.set("1", 1);
    store.set("2", 2);

    assert.true(store.delete("1"));
    assert.false(store.has("1"));
    assert.true(store.has("2"));
    assert.false(store.delete("1"));
    assert.is(store.count(), 1);
});

test("should remove the specified entrys", () => {
    const store = new CappedMap(2);
    store.set("1", 1);
    store.set("2", 2);

    assert.is(store.count(), 2);
    assert.true(store.delete("1"));
    assert.false(store.has("1"));
    assert.true(store.has("2"));

    store.delete("2");

    assert.is(store.count(), 0);
});

test("should remove all entrys", () => {
    const store = new CappedMap(3);
    store.set("1", 1);
    store.set("2", 2);
    store.set("3", 3);

    assert.is(store.count(), 3);

    store.clear();

    assert.is(store.count(), 0);
});

test("should return the first value", () => {
    const store = new CappedMap(2);
    store.set("1", 1);
    store.set("2", 2);

    assert.is(store.first(), 1);
});

test("should return the last value", () => {
    const store = new CappedMap(2);
    store.set("1", 1);
    store.set("2", 2);

    assert.is(store.last(), 2);
});

test("should return the keys", () => {
    const store = new CappedMap(3);
    store.set("1", 1);
    store.set("2", 2);
    store.set("3", 3);

    assert.is(store.keys(), ["1", "2", "3"]);
});

test("should return the values", () => {
    const store = new CappedMap(3);
    store.set("1", 1);
    store.set("2", 2);
    store.set("3", 3);

    assert.is(store.values(), [1, 2, 3]);
});

test("should return the entry count", () => {
    const store = new CappedMap(100);
    store.set("1", 1);
    store.set("2", 2);

    assert.is(store.count(), 2);

    store.delete("1");

    assert.is(store.count(), 1);

    store.set("3", 3);

    assert.is(store.count(), 2);
});

test("should resize the map", () => {
    const store = new CappedMap(3);
    store.set("1", 1);
    store.set("2", 2);
    store.set("3", 3);

    assert.is(store.count(), 3);

    store.resize(4);
    store.set("1", 1);
    store.set("2", 2);
    store.set("3", 3);
    store.set("4", 4);
    store.set("5", 5);

    assert.is(store.count(), 4);
    assert.false(store.has("1"));
    assert.true(store.has("2"));
    assert.true(store.has("3"));
    assert.true(store.has("4"));
    assert.true(store.has("5"));

    assert.is(store.count(), 4);

    store.resize(2);

    assert.is(store.count(), 2);
    assert.false(store.has("1"));
    assert.false(store.has("2"));
    assert.false(store.has("3"));
    assert.true(store.has("4"));
    assert.true(store.has("5"));
});
});
