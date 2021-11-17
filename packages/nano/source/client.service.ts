import { Collections, Contracts, IoC, Services } from "@payvo/sdk";

import { WalletData } from "./wallet.dto.js";
import { NanoClient } from "./rpc.js";

@IoC.injectable()
export class ClientService extends Services.AbstractClientService {
	#client!: NanoClient;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#client = new NanoClient(this.configRepository, this.httpClient);
	}

	public override async transactions(
		query: Services.ClientTransactionsInput,
	): Promise<Collections.ConfirmedTransactionDataCollection> {
		const account = query.identifiers![0];
		const count = (query.limit || 15).toString();
		const options = { head: query.cursor || undefined };
		const { history, previous } = await this.#client.accountHistory(account.value, count, options);

		return this.dataTransferObjectService.transactions(
			Object.values(history).map((transaction: any) => {
				transaction._origin = account.value;

				return transaction;
			}),
			{
				prev: undefined,
				self: undefined,
				next: previous,
				last: undefined,
			},
		);
	}

	public override async wallet(id: Services.WalletIdentifier): Promise<Contracts.WalletData> {
		const { balance, pending } = await this.#client.accountInfo(id.value, { pending: true });

		return this.dataTransferObjectService.wallet({ id: id.value, balance, pending });
	}

	public override async broadcast(
		transactions: Contracts.SignedTransactionData[],
	): Promise<Services.BroadcastResponse> {
		const result: Services.BroadcastResponse = {
			accepted: [],
			rejected: [],
			errors: {},
		};

		for (const transaction of transactions) {
			try {
				await this.#client.process("send", transaction.toBroadcast());

				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());

				result.errors[transaction.id()] = (error as any).message;
			}
		}

		return result;
	}
}
