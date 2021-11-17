import { set as base } from "dot-prop";
import { isObject } from "./is-object";
import { isString } from "./is-string";

export const set = <T>(object: T, path: string | string[], value: unknown): boolean => {
	if (!isObject(object) || !isString(path)) {
		return false;
	}

	base(object, path, value);

	return true;
};