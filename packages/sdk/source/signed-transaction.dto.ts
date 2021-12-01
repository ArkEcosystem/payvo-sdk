/* istanbul ignore file */
/* eslint-disable import/order */

import { BigNumber } from "@payvo/sdk-helpers";
import { DateTime } from "@payvo/sdk-intl";

import { RawTransactionData, SignedTransactionData } from "./contracts.js";
import { NotImplemented } from "./exceptions.js";
import { inject, injectable } from "./ioc.js";
import { BindingType } from "./service-provider.contract.js";
import { BigNumberService } from "./services.js";
import { MultiPaymentRecipient } from "./confirmed-transaction.dto.contract.js";
import { SignedTransactionObject } from "./signed-transaction.dto.contract.js";

@injectable()
export class AbstractSignedTransactionData implements SignedTransactionData {
	@inject(BindingType.BigNumberService)
	protected readonly bigNumberService!: BigNumberService;

	protected identifier!: string;
	protected signedData!: RawTransactionData;
	protected broadcastData!: any;
	protected decimals!: number | undefined;

	readonly #types = {
		delegateRegistration: "isDelegateRegistration",
		delegateResignation: "isDelegateResignation",
		ipfs: "isIpfs",
		magistrate: "isMagistrate",
		multiPayment: "isMultiPayment",
		multiSignature: "isMultiSignatureRegistration",
		secondSignature: "isSecondSignature",
		transfer: "isTransfer",
		unlockToken: "isUnlockToken",
		unvote: "isUnvote",
		vote: "isVote",
		voteCombination: "isVoteCombination",
	};

	public configure(
		identifier: string,
		signedData: RawTransactionData,
		broadcastData?: any,
		decimals?: number | string,
	) {
		this.identifier = identifier;
		this.signedData = signedData;
		this.broadcastData = broadcastData ?? signedData;
		this.decimals = typeof decimals === "string" ? Number.parseInt(decimals) : decimals;

		return this;
	}

	public setAttributes(attributes: { identifier: string }): void {
		this.identifier = attributes.identifier;
	}

	public id(): string {
		return this.identifier;
	}

	public type(): string {
		for (const [type, method] of Object.entries(this.#types)) {
			if (this[method]()) {
				return type;
			}
		}

		return "transfer";
	}

	public data(): RawTransactionData {
		return this.signedData;
	}

	public sender(): string {
		throw new NotImplemented(this.constructor.name, this.sender.name);
	}

	public recipient(): string {
		throw new NotImplemented(this.constructor.name, this.recipient.name);
	}

	public amount(): BigNumber {
		throw new NotImplemented(this.constructor.name, this.amount.name);
	}

	public fee(): BigNumber {
		return BigNumber.ZERO;
	}

	public memo(): string | undefined {
		return undefined;
	}

	public timestamp(): DateTime {
		throw new NotImplemented(this.constructor.name, this.timestamp.name);
	}

	public isTransfer(): boolean {
		return true;
	}

	public isSecondSignature(): boolean {
		return false;
	}

	public isDelegateRegistration(): boolean {
		return false;
	}

	public isVoteCombination(): boolean {
		return false;
	}

	public isVote(): boolean {
		return false;
	}

	public isUnvote(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}

	public isIpfs(): boolean {
		return false;
	}

	public isMultiPayment(): boolean {
		return false;
	}

	public isDelegateResignation(): boolean {
		return false;
	}

	public isHtlcLock(): boolean {
		return false;
	}

	public isHtlcClaim(): boolean {
		return false;
	}

	public isHtlcRefund(): boolean {
		return false;
	}

	public isMagistrate(): boolean {
		return false;
	}

	public isUnlockToken(): boolean {
		return false;
	}

	public usesMultiSignature(): boolean {
		return false;
	}

	public get<T = string>(key: string): T {
		return this.signedData[key];
	}

	public toString(): string {
		if (typeof this.signedData === "string") {
			return this.signedData;
		}

		return JSON.stringify(this.signedData);
	}

	public toBroadcast(): any {
		return this.broadcastData;
	}

	public toObject(): SignedTransactionObject {
		return {
			amount: this.amount().toFixed(0),
			broadcast: this.toBroadcast(),
			data: this.data(),
			fee: this.fee().toFixed(0),
			id: this.id(),
			recipient: this.recipient(),
			sender: this.sender(),
			timestamp: this.timestamp().toISOString(),
		};
	}

	// @TODO: remove those after introducing proper signed tx DTOs (ARK/LSK specific)
	public username(): string {
		return this.signedData.asset.delegate.username;
	}

	public hash(): string {
		return this.signedData.asset.ipfs;
	}

	public recipients(): MultiPaymentRecipient[] {
		if (this.isMultiPayment()) {
			return this.signedData.asset.payments.map((payment: { recipientId: string; amount: BigNumber }) => ({
				address: payment.recipientId,
				amount: this.bigNumberService.make(payment.amount),
			}));
		}

		return [
			{
				address: this.recipient(),
				amount: this.amount(),
			},
		];
	}
}
