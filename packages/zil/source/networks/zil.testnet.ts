import { Networks } from "@payvo/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	coin: "Zilliqa",
	constants: {
		slip44: 313,
	},
	currency: {
		decimals: 12,
		symbol: "ZIL",
		ticker: "ZIL",
	},
	explorer,
	featureFlags,
	hosts: [
		{
			host: "https://dev-api.zilliqa.com",
			type: "full",
		},
		{
			host: "https://viewblock.io/zilliqa",
			query: { network: "testnet" },
			type: "explorer",
		},
	],
	id: "zil.testnet",
	importMethods,
	name: "Testnet",
	transactions,
	type: "test",
};

export default network;