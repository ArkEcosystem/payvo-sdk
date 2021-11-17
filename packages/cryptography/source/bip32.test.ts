import "jest-extended";

import { BIP32 } from "./bip32.js";

const mnemonic = "praise you muffin lion enable neck grocery crumble super myself license ghost";

const data: { name: string; expected: string; network?: any }[] = [
	{
		expected:
			"xprv9s21ZrQH143K4DRBUU8Dp25M61mtjm9T3LsdLLFCXL2U6AiKEqs7dtCJWGFcDJ9DtHpdwwmoqLgzPrW7unpwUyL49FZvut9xUzpNB6wbEnz",
		name: "default network",
	},
	{
		expected:
			"xprv9s21ZrQH143K4DRBUU8Dp25M61mtjm9T3LsdLLFCXL2U6AiKEqs7dtCJWGFcDJ9DtHpdwwmoqLgzPrW7unpwUyL49FZvut9xUzpNB6wbEnz",
		name: "btc.livenet",
		network: {
			bip32: {
				private: 76_066_276,
				public: 76_067_358,
			},
			wif: 128,
		},
	},
	{
		expected:
			"tprv8ZgxMBicQKsPf2ei92yiyfhLQ9C6yHBTNtnkCkff1JWwsmTQEDCs9dZkRSRGDfXYFjMQx3PZzhGnri3s31AtJ2beftnEaEt1Q6Zncq79d7f",
		name: "btc.testnet",
		network: {
			bip32: {
				private: 70_615_956,
				public: 70_617_039,
			},
			wif: 239,
		},
	},
];

describe.each(data)(`#fromMnemonic`, (item) => {
	test(`with network ${item.name}`, () => {
		expect(BIP32.fromMnemonic(mnemonic, item.network).toBase58()).toBe(item.expected);
	});
});

test("#fromSeed", async () => {
	expect(BIP32.fromSeed("000102030405060708090a0b0c0d0e0f")).toMatchInlineSnapshot(`
		BIP32 {
		  "__D": Object {
		    "data": Array [
		      232,
		      243,
		      46,
		      114,
		      61,
		      236,
		      244,
		      5,
		      26,
		      239,
		      172,
		      142,
		      44,
		      147,
		      201,
		      197,
		      178,
		      20,
		      49,
		      56,
		      23,
		      205,
		      176,
		      26,
		      20,
		      148,
		      185,
		      23,
		      200,
		      67,
		      107,
		      53,
		    ],
		    "type": "Buffer",
		  },
		  "__DEPTH": 0,
		  "__INDEX": 0,
		  "__PARENT_FINGERPRINT": 0,
		  "__Q": undefined,
		  "chainCode": Object {
		    "data": Array [
		      135,
		      61,
		      255,
		      129,
		      192,
		      47,
		      82,
		      86,
		      35,
		      253,
		      31,
		      229,
		      22,
		      126,
		      172,
		      58,
		      85,
		      160,
		      73,
		      222,
		      61,
		      49,
		      75,
		      180,
		      46,
		      226,
		      39,
		      255,
		      237,
		      55,
		      213,
		      8,
		    ],
		    "type": "Buffer",
		  },
		  "lowR": false,
		  "network": Object {
		    "bech32": "bc",
		    "bip32": Object {
		      "private": 76066276,
		      "public": 76067358,
		    },
		    "messagePrefix": "Bitcoin Signed Message:
		",
		    "pubKeyHash": 0,
		    "scriptHash": 5,
		    "wif": 128,
		  },
		}
	`);
});

test("#fromBase58", async () => {
	expect(
		BIP32.fromBase58(
			"xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi",
		),
	).toMatchInlineSnapshot(`
		BIP32 {
		  "__D": Object {
		    "data": Array [
		      232,
		      243,
		      46,
		      114,
		      61,
		      236,
		      244,
		      5,
		      26,
		      239,
		      172,
		      142,
		      44,
		      147,
		      201,
		      197,
		      178,
		      20,
		      49,
		      56,
		      23,
		      205,
		      176,
		      26,
		      20,
		      148,
		      185,
		      23,
		      200,
		      67,
		      107,
		      53,
		    ],
		    "type": "Buffer",
		  },
		  "__DEPTH": 0,
		  "__INDEX": 0,
		  "__PARENT_FINGERPRINT": 0,
		  "__Q": undefined,
		  "chainCode": Object {
		    "data": Array [
		      135,
		      61,
		      255,
		      129,
		      192,
		      47,
		      82,
		      86,
		      35,
		      253,
		      31,
		      229,
		      22,
		      126,
		      172,
		      58,
		      85,
		      160,
		      73,
		      222,
		      61,
		      49,
		      75,
		      180,
		      46,
		      226,
		      39,
		      255,
		      237,
		      55,
		      213,
		      8,
		    ],
		    "type": "Buffer",
		  },
		  "lowR": false,
		  "network": Object {
		    "bech32": "bc",
		    "bip32": Object {
		      "private": 76066276,
		      "public": 76067358,
		    },
		    "messagePrefix": "Bitcoin Signed Message:
		",
		    "pubKeyHash": 0,
		    "scriptHash": 5,
		    "wif": 128,
		  },
		}
	`);
});

test("#fromPublicKey", async () => {
	expect(
		BIP32.fromPublicKey(
			"0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2",
			"873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508",
		),
	).toMatchInlineSnapshot(`
		BIP32 {
		  "__D": undefined,
		  "__DEPTH": 0,
		  "__INDEX": 0,
		  "__PARENT_FINGERPRINT": 0,
		  "__Q": Object {
		    "data": Array [
		      3,
		      57,
		      163,
		      96,
		      19,
		      48,
		      21,
		      151,
		      218,
		      239,
		      65,
		      251,
		      229,
		      147,
		      160,
		      44,
		      197,
		      19,
		      208,
		      181,
		      85,
		      39,
		      236,
		      45,
		      241,
		      5,
		      14,
		      46,
		      143,
		      244,
		      156,
		      133,
		      194,
		    ],
		    "type": "Buffer",
		  },
		  "chainCode": Object {
		    "data": Array [
		      135,
		      61,
		      255,
		      129,
		      192,
		      47,
		      82,
		      86,
		      35,
		      253,
		      31,
		      229,
		      22,
		      126,
		      172,
		      58,
		      85,
		      160,
		      73,
		      222,
		      61,
		      49,
		      75,
		      180,
		      46,
		      226,
		      39,
		      255,
		      237,
		      55,
		      213,
		      8,
		    ],
		    "type": "Buffer",
		  },
		  "lowR": false,
		  "network": Object {
		    "bech32": "bc",
		    "bip32": Object {
		      "private": 76066276,
		      "public": 76067358,
		    },
		    "messagePrefix": "Bitcoin Signed Message:
		",
		    "pubKeyHash": 0,
		    "scriptHash": 5,
		    "wif": 128,
		  },
		}
	`);
});

test("#fromPrivateKey", async () => {
	expect(
		BIP32.fromPrivateKey(
			"e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35",
			"873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508",
		),
	).toMatchInlineSnapshot(`
		BIP32 {
		  "__D": Object {
		    "data": Array [
		      232,
		      243,
		      46,
		      114,
		      61,
		      236,
		      244,
		      5,
		      26,
		      239,
		      172,
		      142,
		      44,
		      147,
		      201,
		      197,
		      178,
		      20,
		      49,
		      56,
		      23,
		      205,
		      176,
		      26,
		      20,
		      148,
		      185,
		      23,
		      200,
		      67,
		      107,
		      53,
		    ],
		    "type": "Buffer",
		  },
		  "__DEPTH": 0,
		  "__INDEX": 0,
		  "__PARENT_FINGERPRINT": 0,
		  "__Q": undefined,
		  "chainCode": Object {
		    "data": Array [
		      135,
		      61,
		      255,
		      129,
		      192,
		      47,
		      82,
		      86,
		      35,
		      253,
		      31,
		      229,
		      22,
		      126,
		      172,
		      58,
		      85,
		      160,
		      73,
		      222,
		      61,
		      49,
		      75,
		      180,
		      46,
		      226,
		      39,
		      255,
		      237,
		      55,
		      213,
		      8,
		    ],
		    "type": "Buffer",
		  },
		  "lowR": false,
		  "network": Object {
		    "bech32": "bc",
		    "bip32": Object {
		      "private": 76066276,
		      "public": 76067358,
		    },
		    "messagePrefix": "Bitcoin Signed Message:
		",
		    "pubKeyHash": 0,
		    "scriptHash": 5,
		    "wif": 128,
		  },
		}
	`);
});
