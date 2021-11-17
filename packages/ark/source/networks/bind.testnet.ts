import { Networks } from "@payvo/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Compendia",
	constants: {
		slip44: 1,
	},
	currency: {
		decimals: 8,
		symbol: "Tß",
		ticker: "TBIND",
	},
	explorer,
	featureFlags: {
		...featureFlags,
		Transaction: [
			"delegateRegistration",
			"delegateResignation",
			"estimateExpiration",
			"multiPayment.musig",
			"multiPayment",
			"multiSignature.musig",
			"multiSignature",
			"secondSignature",
			"transfer.musig",
			"transfer",
			"vote.musig",
			"vote",
		],
	},
	governance: {
		delegateCount: 47,
		method: "split",
		votesPerTransaction: 1,
		votesPerWallet: 1,
	},
	hosts: [
		{
			host: "https://apis-testnet.compendia.org/api",
			type: "full",
		},
		{
			host: "https://bind-test-musig.payvo.com",
			type: "musig",
		},
		{
			host: "https://testnet.bindscan.io",
			type: "explorer",
		},
	],
	id: "bind.testnet",
	importMethods,
	meta: {
		fastDelegateSync: true,
	},
	name: "Testnet",
	transactions: {
		...transactions,
		fees: {
			ticker: "TBIND",
			type: "static",
		},
	},
	type: "test",
};

export default network;
