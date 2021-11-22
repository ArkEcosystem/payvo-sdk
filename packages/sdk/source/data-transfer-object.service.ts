/* istanbul ignore file */
/* eslint-disable import/no-namespace */

import { get } from "@payvo/sdk-helpers";

import { ConfigKey, ConfigRepository } from "./coins.js";
import { ConfirmedTransactionDataCollection } from "./collections.js";
import { WalletData } from "./contracts.js";
import { ConfirmedTransactionData } from "./confirmed-transaction.dto.contract.js";
import * as DataTransferObjects from "./dto.js";
import { SignedTransactionData } from "./signed-transaction.dto.contract.js";
import { Container, inject, injectable } from "./ioc.js";
import { BindingType } from "./service-provider.contract.js";
import { MetaPagination } from "./client.contract.js";
import { DataTransferObjectService } from "./data-transfer-object.contract.js";

@injectable()
export class AbstractDataTransferObjectService implements DataTransferObjectService {
	// @TODO: rework so that the container is not needed, this is a weird setup
	@inject(BindingType.Container)
	protected readonly container!: Container;

	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	@inject(BindingType.DataTransferObjects)
	protected readonly dataTransferObjects!: Record<string, any>;

	public signedTransaction(identifier: string, signedData: string, broadcastData?: any): SignedTransactionData {
		return this.container
			.resolve<SignedTransactionData>(this.dataTransferObjects.SignedTransactionData)
			.configure(
				identifier,
				signedData,
				broadcastData,
				this.configRepository.get<number>(ConfigKey.CurrencyDecimals),
			);
	}

	public transaction(transaction: unknown): ConfirmedTransactionData {
		return this.#resolveTransactionClass("ConfirmedTransactionData", transaction);
	}

	public transactions(transactions: unknown[], meta: MetaPagination): ConfirmedTransactionDataCollection {
		return new ConfirmedTransactionDataCollection(
			transactions.map((transaction) => this.transaction(transaction)),
			meta,
		);
	}

	public wallet(wallet: unknown): WalletData {
		return this.container.resolve<WalletData>(this.dataTransferObjects.WalletData).fill(wallet);
	}

	#resolveTransactionClass(klass: string, transaction: unknown): ConfirmedTransactionData {
		return this.container
			.resolve<ConfirmedTransactionData>(
				(get(this.dataTransferObjects, klass) || get(DataTransferObjects, klass))!,
			)
			.configure(transaction)
			.withDecimals(this.configRepository.get(ConfigKey.CurrencyDecimals));
	}
}