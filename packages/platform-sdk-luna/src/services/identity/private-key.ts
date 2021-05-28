import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { deriveKey } from "./helpers";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		try {
			return { privateKey: deriveKey(mnemonic).privateKey.toString("hex") };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
