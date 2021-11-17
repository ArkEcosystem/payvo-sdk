import { IContactAddress, IContactAddressData, IProfile } from "./contracts";
import { Avatar } from "./helpers/avatar";

export class ContactAddress implements IContactAddress {
	readonly #profile: IProfile;
	readonly #data: IContactAddressData;

	public constructor(data: IContactAddressData, profile: IProfile) {
		this.#data = data;
		this.#profile = profile;
	}

	/** {@inheritDoc IContactAddress.id} */
	public id(): string {
		return this.#data.id;
	}

	/** {@inheritDoc IContactAddress.coin} */
	public coin(): string {
		return this.#data.coin;
	}

	/** {@inheritDoc IContactAddress.network} */
	public network(): string {
		return this.#data.network;
	}

	/** {@inheritDoc IContactAddress.address} */
	public address(): string {
		return this.#data.address;
	}

	/** {@inheritDoc IContactAddress.avatar} */
	public avatar(): string {
		return Avatar.make(this.address());
	}

	/** {@inheritDoc IContactAddress.toObject} */
	public toObject(): IContactAddressData {
		return {
			id: this.id(),
			coin: this.coin(),
			network: this.network(),
			address: this.address(),
		};
	}

	/** {@inheritDoc IContactAddress.setAddress} */
	public setAddress(address: string): void {
		this.#data.address = address;

		this.#profile.status().markAsDirty();
	}
}