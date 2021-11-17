import { Contracts, DTO, Exceptions, IoC } from "@payvo/sdk";
import { DateTime } from "@payvo/sdk-intl";
import { BigNumber } from "@payvo/sdk-helpers";

@IoC.injectable()
export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData
{
	public override sender(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.sender.name);
	}

	public override recipient(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, this.recipient.name);
	}

	public override amount(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.amount.name);
	}

	public override fee(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fee.name);
	}

	public override timestamp(): DateTime {
		throw new Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}
}