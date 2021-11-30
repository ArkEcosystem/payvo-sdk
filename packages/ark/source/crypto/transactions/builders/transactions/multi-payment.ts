import { MaximumPaymentCountExceededError, MinimumPaymentCountSubceededError } from "../../../errors";
import { ITransactionData } from "../../../interfaces";
import { configManager } from "../../../managers";
import { BigNumber } from "@payvo/sdk-helpers";
import { MultiPaymentTransaction } from "../../types";
import { TransactionBuilder } from "./transaction";

export class MultiPaymentBuilder extends TransactionBuilder<MultiPaymentBuilder> {
	public constructor() {
		super();

		this.data.type = MultiPaymentTransaction.type;
		this.data.typeGroup = MultiPaymentTransaction.typeGroup;
		this.data.fee = MultiPaymentTransaction.staticFee();
		this.data.vendorField = undefined;
		this.data.asset = {
			payments: [],
		};
		this.data.amount = BigNumber.make(0);
	}

	public addPayment(recipientId: string, amount: string): MultiPaymentBuilder {
		if (this.data.asset && this.data.asset.payments) {
			const limit: number = configManager.getMilestone().multiPaymentLimit || 256;
			if (this.data.asset.payments.length >= limit) {
				throw new MaximumPaymentCountExceededError(limit);
			}

			this.data.asset.payments.push({
				amount: BigNumber.make(amount),
				recipientId,
			});
		}

		return this;
	}

	public override getStruct(): ITransactionData {
		if (
			!this.data.asset ||
			!this.data.asset.payments ||
			!Array.isArray(this.data.asset.payments) ||
			this.data.asset.payments.length <= 1
		) {
			throw new MinimumPaymentCountSubceededError();
		}

		const struct: ITransactionData = super.getStruct();
		struct.senderPublicKey = this.data.senderPublicKey;
		struct.vendorField = this.data.vendorField;
		struct.amount = this.data.amount;
		struct.asset = this.data.asset;

		return struct;
	}

	protected instance(): MultiPaymentBuilder {
		return this;
	}
}
