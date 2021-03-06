import { Networks } from "@payvo/sdk";

import { featureFlags, importMethods, transactions } from "./shared.js";

const network: Networks.NetworkManifest = {
	coin: "Compendia",
	constants: {
		slip44: 543,
	},
	currency: {
		decimals: 8,
		symbol: "ß",
		ticker: "BIND",
	},
	explorer: {
		block: "block/{0}",
		transaction: "transaction/{0}",
		wallet: "wallets/{0}",
	},
	featureFlags: {
		...featureFlags,
		Transaction: [
			"delegateRegistration",
			"delegateResignation",
			"estimateExpiration",
			"multiPayment.musig",
			"multiPayment",
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
			host: "https://apis.compendia.org/api",
			type: "full",
		},
		{
			host: "https://bind-live-musig.payvo.com",
			type: "musig",
		},
		{
			host: "https://bindscan.io",
			type: "explorer",
		},
	],
	id: "bind.mainnet",
	importMethods,
	meta: {
		fastDelegateSync: true,
	},
	name: "Mainnet",
	transactions: {
		...transactions,
		fees: {
			ticker: "BIND",
			type: "static",
		},
		memo: false,
		multiPaymentRecipients: 128,
	},
	type: "live",
};

export default network;
