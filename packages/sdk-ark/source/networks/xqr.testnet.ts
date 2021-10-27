import { Networks } from "@payvo/sdk";

import { explorer, featureFlags, importMethods, transactions } from "./shared";

const network: Networks.NetworkManifest = {
	id: "xqr.testnet",
	type: "live",
	name: "Testnet",
	coin: "Qredit",
	currency: {
		ticker: "DXQR",
		symbol: "DQ",
		decimals: 8,
	},
	constants: {
		slip44: 111,
	},
	hosts: [
		{
			type: "full",
			host: "https://testnet.qredit.cloud/api",
		},
		{
			type: "explorer",
			host: "https://explorer.sh/qredit-testnet",
		},
	],
	governance: {
		delegateCount: 51,
		votesPerWallet: 1,
		votesPerTransaction: 1,
	},
	transactions: {
		...transactions,
		fees: {
			type: "dynamic",
			ticker: "dXQR",
		},
		multiPaymentRecipients: 128,
	},
	importMethods,
	featureFlags: {
		...featureFlags,
		Transaction: [
			"delegateRegistration",
			"delegateResignation",
			"estimateExpiration",
			"multiPayment",
			"multiSignature",
			"secondSignature",
			"transfer",
			"vote",
		],
	},
	explorer,
	meta: {
		fastDelegateSync: true,
	},
};

export default network;
