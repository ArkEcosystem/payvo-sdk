import { Contracts, DTO } from "@payvo/sdk";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public override primaryKey(): string {
		return this.address();
	}

	public override address(): string {
		return this.data.account_name;
	}

	public override balance(): Contracts.WalletBalance {
		return {
			total: this.bigNumberService.make(this.data.net_weight),
			available: this.bigNumberService.make(this.data.net_weight),
			fees: this.bigNumberService.make(this.data.net_weight),
		};
	}
}
