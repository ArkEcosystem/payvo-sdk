import { sha256 } from "@noble/hashes/lib/sha256.js";

import { Base58 } from "./base58.js";

const normalise = (value: string | Buffer): Buffer => (value instanceof Buffer ? value : Buffer.from(value));

const normaliseSHA256 = (value: string | Buffer) => sha256(sha256(normalise(value)));

const decodeRaw = (buffer: Buffer): Buffer | undefined => {
	const payload = buffer.slice(0, -4);
	const checksum = buffer.slice(-4);
	const newChecksum = normaliseSHA256(payload);

	if (
		(checksum[0] ^ newChecksum[0]) |
		(checksum[1] ^ newChecksum[1]) |
		(checksum[2] ^ newChecksum[2]) |
		(checksum[3] ^ newChecksum[3])
	) {
		return;
	}

	return payload;
};

export class Base58Check {
	public static encode(payload: string | Buffer): string {
		payload = normalise(payload);

		return Base58.encode(Buffer.concat([payload, normaliseSHA256(payload)], payload.length + 4));
	}

	public static decode(value: string): Buffer {
		const payload = decodeRaw(Buffer.from(Base58.decode(value)));

		if (!payload) {
			throw new Error("Invalid checksum");
		}

		return payload;
	}
}
