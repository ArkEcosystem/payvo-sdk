import { Base58 } from "@payvo/sdk-cryptography";
import ByteBuffer from "bytebuffer";

import { TransactionType, TransactionTypeGroup } from "./../../enums";
import { ISerializeOptions } from "./../../interfaces";
import { configManager } from "./../../managers";
import { BigNumber } from "@payvo/sdk-helpers";
import * as schemas from "./schemas";
import { Transaction } from "./transaction";

export abstract class IpfsTransaction extends Transaction {
	public static override typeGroup: number = TransactionTypeGroup.Core;
	public static override type: number = TransactionType.Ipfs;
	public static override key = "ipfs";

	protected static override defaultStaticFee: BigNumber = BigNumber.make("500000000");

	public static override getSchema(): schemas.TransactionSchema {
		return schemas.ipfs;
	}

	public override verify(): boolean {
		return configManager.getMilestone().aip11 && super.verify();
	}

	public serialize(options?: ISerializeOptions): ByteBuffer | undefined {
		const { data } = this;

		if (data.asset) {
			const ipfsBuffer: Buffer = Buffer.from(Base58.decode(data.asset.ipfs!));
			const buffer: ByteBuffer = new ByteBuffer(ipfsBuffer.length, true);

			buffer.append(ipfsBuffer, "hex");

			return buffer;
		}

		return undefined;
	}

	public deserialize(buf: ByteBuffer): void {
		const { data } = this;

		const hashFunction: number = buf.readUint8();
		const ipfsHashLength: number = buf.readUint8();
		const ipfsHash: Buffer = buf.readBytes(ipfsHashLength).toBuffer();

		const buffer: Buffer = Buffer.alloc(ipfsHashLength + 2);
		buffer.writeUInt8(hashFunction, 0);
		buffer.writeUInt8(ipfsHashLength, 1);
		buffer.fill(ipfsHash, 2);

		data.asset = {
			ipfs: Base58.encode(buffer),
		};
	}
}
