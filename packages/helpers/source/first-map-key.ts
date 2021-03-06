import { firstMapEntry } from "./first-map-entry.js";

export const firstMapKey = <K, V>(map: Map<K, V>): K => firstMapEntry(map)[0];
