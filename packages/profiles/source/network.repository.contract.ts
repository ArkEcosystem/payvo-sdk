import { Networks } from "@payvo/sdk";

export type Network = Networks.NetworkManifest;
export type NetworkMap = Record<string, Network>;

export interface INetworkRepository {
	all(): NetworkMap;

	get(network: string): Network;

	push(host: Network): Network;

	fill(entries: object): void;

	forget(network: string): void;
}
