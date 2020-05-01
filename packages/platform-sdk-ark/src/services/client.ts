import { Connection } from "@arkecosystem/client";
import { Contracts } from "@arkecosystem/platform-sdk";

import { DelegateData, TransactionData, WalletData } from "../dto";

export class ClientService implements Contracts.ClientService {
	private readonly connection: Connection;

	private constructor(peer: string) {
		this.connection = new Connection(peer);
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<ClientService> {
		return new ClientService(opts.peer);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async transaction(id: string): Promise<Contracts.TransactionData> {
		const { body } = await this.connection.api("transactions").get(id);

		return new TransactionData(body.data);
	}

	public async transactions(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const { body } = await this.connection.api("transactions").search(query);

		return { meta: body.meta, data: body.data.map((transaction) => new TransactionData(transaction)) };
	}

	public async wallet(id: string): Promise<Contracts.WalletData> {
		const { body } = await this.connection.api("wallets").get(id);

		return new WalletData(body.data);
	}

	public async wallets(
		query: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		const { body } = await this.connection.api("wallets").search(query);

		return { meta: body.meta, data: body.data.map((wallet) => new WalletData(wallet)) };
	}

	public async delegate(id: string): Promise<Contracts.DelegateData> {
		const { body } = await this.connection.api("delegates").get(id);

		return new DelegateData(body.data);
	}

	public async delegates(
		query?: Contracts.KeyValuePair,
	): Promise<Contracts.CollectionResponse<Contracts.DelegateData>> {
		const { body } = await this.connection.api("delegates").all(query);

		return { meta: body.meta, data: body.data.map((wallet) => new DelegateData(wallet)) };
	}

	public async votes(id: string): Promise<Contracts.CollectionResponse<Contracts.TransactionData>> {
		const { body } = await this.connection.api("wallets").votes(id);

		return { meta: body.meta, data: body.data.map((transaction) => new TransactionData(transaction)) };
	}

	public async voters(id: string): Promise<Contracts.CollectionResponse<Contracts.WalletData>> {
		const { body } = await this.connection.api("delegates").voters(id);

		return { meta: body.meta, data: body.data.map((wallet) => new WalletData(wallet)) };
	}

	public async configuration(): Promise<Contracts.KeyValuePair> {
		const { body } = await this.connection.api("node").configuration();

		return body.data;
	}

	// todo: normalise the response
	public async cryptoConfiguration(): Promise<Contracts.KeyValuePair> {
		const { body } = await this.connection.api("node").crypto();

		return body.data;
	}

	// todo: normalise the response
	public async feesByNode(days: number): Promise<Contracts.KeyValuePair> {
		const { body } = await this.connection.api("node").fees(days);

		return body.data;
	}

	// todo: normalise the response
	public async feesByType(): Promise<Contracts.KeyValuePair> {
		const { body } = await this.connection.api("transactions").fees();

		return body.data;
	}

	public async syncing(): Promise<boolean> {
		const { body } = await this.connection.api("node").syncing();

		return body.data.syncing;
	}

	// todo: normalise the response
	public async broadcast(transactions: object[]): Promise<void> {
		await this.connection.api("transactions").create({ transactions });
	}
}
