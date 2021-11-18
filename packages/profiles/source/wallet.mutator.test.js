import "reflect-metadata";

import nock from "nock";
import { UUID } from "@payvo/sdk-cryptography";

import { identity } from "../test/fixtures/identity";
import { bootContainer } from "../test/mocking";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { IProfile, IProfileRepository, IReadWriteWallet, WalletData } from "./contracts";
import { Wallet } from "./wallet";
import { WalletImportMethod } from "./wallet.enum";

let profile: IProfile;
let subject: IReadWriteWallet;

test.before(() => bootContainer());

test.before.each(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))

		// default wallet
		.get("/api/wallets/D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.get("/api/wallets/030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd")
		.reply(200, require("../test/fixtures/client/wallet.json"))

		// second wallet
		.get("/api/wallets/022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))

		// Musig wallet
		.get("/api/wallets/DML7XEfePpj5qDFb1SbCWxLRhzdTDop7V1")
		.reply(200, require("../test/fixtures/client/wallet-musig.json"))
		.get("/api/wallets/02cec9caeb855e54b71e4d60c00889e78107f6136d1f664e5646ebcb2f62dae2c6")
		.reply(200, require("../test/fixtures/client/wallet-musig.json"))

		.get("/api/delegates")
		.reply(200, require("../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../test/fixtures/client/delegates-2.json"))
		.get("/api/transactions/3e0b2e5ed00b34975abd6dee0ca5bd5560b5bd619b26cf6d8f70030408ec5be3")
		.query(true)
		.reply(200, () => {
			const response = require("../test/fixtures/client/transactions.json");
			return { data: response.data[0] };
		})
		.get("/api/transactions/bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed")
		.query(true)
		.reply(200, () => {
			const response = require("../test/fixtures/client/transactions.json");
			return { data: response.data[1] };
		})
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../test/fixtures/client/transactions.json"))
		// CryptoCompare
		.get("/data/histoday")
		.query(true)
		.reply(200, require("../test/fixtures/markets/cryptocompare/historical.json"))
		.persist();

	const profileRepository = container.get < IProfileRepository > Identifiers.ProfileRepository;
	profileRepository.flush();
	profile = profileRepository.create("John Doe");

	subject = new Wallet(UUID.random(), {}, profile);

	await subject.mutator().coin("ARK", "ark.devnet");
	// await subject.mutator().identity(identity.mnemonic);
});

test.before(() => nock.disableNetConnect());

describe("#setCoin", () => {
	test("should mark the wallet as partially restored if the coin construction fails", async () => {
		subject = new Wallet(UUID.random(), {}, profile);

		assert.is(subject.hasBeenPartiallyRestored(), false);

		await subject.mutator().coin("FAKE", "fake.network");

		assert.is(subject.hasBeenPartiallyRestored(), true);
	});

	test("should use the default peer if no custom one is available", async () => {
		await subject.mutator().coin("ARK", "ark.devnet");

		assert.is(() => subject.coin().config().get("peer")).toThrow("unknown");
	});
});

describe("#identity", () => {
	it.each(["bip39", "bip44", "bip49", "bip84"])("should mutate the address with a path (%s)", async (type: any) => {
		subject.data().set(WalletData.ImportMethod, WalletImportMethod.Address);

		jest.spyOn(subject.coin().address(), "fromMnemonic").mockImplementation(async () => ({
			address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW",
			path: "path",
			type,
		}));

		assert.is(subject.data().has(WalletData.DerivationType), false);
		assert.is(subject.data().has(WalletData.DerivationPath), false);

		await subject.mutator().identity(identity.mnemonic);

		assert.is(subject.data().has(WalletData.DerivationType), true);
		assert.is(subject.data().has(WalletData.DerivationPath), true);
	});

	it.each(["bip39", "bip44", "bip49", "bip84"])(
		"should mutate the address with a path for extended public key coin (%s)",
		async (type: any) => {
			await subject.mutator().coin("BTC", "btc.testnet");

			subject.data().set(WalletData.ImportMethod, WalletImportMethod.PublicKey);
			subject.data().set(WalletData.ImportMethod, WalletImportMethod.PublicKey);

			jest.spyOn(subject.coin().address(), "fromMnemonic").mockImplementation(async () => ({
				address: "2NDqSnogr4eQeLrPWM5GmgBvNuMbwdyh1Bi",
				path: "path",
				type,
			}));
			jest.spyOn(subject.coin().extendedPublicKey(), "fromMnemonic").mockImplementation(
				async () =>
					"tpubDDtBpveGs7uW1X715ZzEHtH1KinDUTW71E3u1ourxCameEdmWrQMLdFGAAYmgTWbLxWw8Dcb6PAV37eNCZDSUu3s2uc2ZTvXRodnUcTLJ8u",
			);

			assert.is(subject.data().has(WalletData.DerivationType), false);
			assert.is(subject.data().has(WalletData.DerivationPath), false);

			await subject.mutator().identity(identity.mnemonic);

			assert.is(subject.data().has(WalletData.DerivationType), true);
			assert.is(subject.data().has(WalletData.DerivationPath), true);
		},
	);
});

describe("#address", () => {
	test("should mutate the address with a path", async () => {
		subject.data().set(WalletData.ImportMethod, WalletImportMethod.Address);

		assert.is(subject.data().has(WalletData.DerivationType), false);
		assert.is(subject.data().has(WalletData.DerivationPath), false);

		await subject.mutator().address({
			address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW",
			path: "path",
			type: "bip39",
		});

		assert.is(subject.data().has(WalletData.DerivationType), true);
		assert.is(subject.data().has(WalletData.DerivationPath), true);
	});
});

describe("#removeEncryption", () => {
	test("should remove the encryption password of a wallet imported by mnemonic", async () => {
		subject.data().set(WalletData.ImportMethod, WalletImportMethod.BIP39.MNEMONIC_WITH_ENCRYPTION);

		subject.signingKey().set(identity.mnemonic, "password");

		const address = (await subject.coin().address().fromMnemonic(identity.mnemonic)).address;

		jest.spyOn(subject, "address").mockReturnValueOnce(address);
		jest.spyOn(subject, "isSecondSignature").mockReturnValueOnce(false);

		assert.is(subject.signingKey().exists(), true);

		await subject.mutator().removeEncryption("password");

		assert.is(subject.signingKey().exists(), false);

		assert.is(subject.data().get(WalletData.ImportMethod), WalletImportMethod.BIP39.MNEMONIC);
	});

	test("should remove the encryption password of a wallet imported by mnemonic with second signature", async () => {
		subject.data().set(WalletData.ImportMethod, WalletImportMethod.BIP39.MNEMONIC_WITH_ENCRYPTION);

		subject.signingKey().set(identity.mnemonic, "password");
		subject.confirmKey().set(identity.secondMnemonic, "password");

		const address = (await subject.coin().address().fromMnemonic(identity.mnemonic)).address;

		jest.spyOn(subject, "address").mockReturnValueOnce(address);
		jest.spyOn(subject, "isSecondSignature").mockReturnValueOnce(true);

		assert.is(subject.signingKey().exists(), true);
		assert.is(subject.confirmKey().exists(), true);

		await subject.mutator().removeEncryption("password");

		assert.is(subject.signingKey().exists(), false);
		assert.is(subject.confirmKey().exists(), false);

		assert.is(subject.data().get(WalletData.ImportMethod), WalletImportMethod.BIP39.MNEMONIC);
	});

	test("should remove the encryption password of a wallet imported by secret", async () => {
		subject.data().set(WalletData.ImportMethod, WalletImportMethod.SECRET_WITH_ENCRYPTION);

		subject.signingKey().set("secret", "password");

		const address = (await subject.coin().address().fromSecret("secret")).address;

		jest.spyOn(subject, "address").mockReturnValueOnce(address);
		jest.spyOn(subject, "isSecondSignature").mockReturnValueOnce(false);

		assert.is(subject.signingKey().exists(), true);

		await subject.mutator().removeEncryption("password");

		assert.is(subject.signingKey().exists(), false);

		assert.is(subject.data().get(WalletData.ImportMethod), WalletImportMethod.SECRET);
	});

	test("should remove the encryption password of a wallet imported by secret with second signature", async () => {
		subject.data().set(WalletData.ImportMethod, WalletImportMethod.SECRET_WITH_ENCRYPTION);

		subject.signingKey().set("secret", "password");
		subject.confirmKey().set("second-secret", "password");

		const address = (await subject.coin().address().fromSecret("secret")).address;

		jest.spyOn(subject, "address").mockReturnValueOnce(address);
		jest.spyOn(subject, "isSecondSignature").mockReturnValueOnce(true);

		assert.is(subject.signingKey().exists(), true);
		assert.is(subject.confirmKey().exists(), true);

		await subject.mutator().removeEncryption("password");

		assert.is(subject.signingKey().exists(), false);
		assert.is(subject.confirmKey().exists(), false);

		assert.is(subject.data().get(WalletData.ImportMethod), WalletImportMethod.SECRET);
	});

	test("should throw if the wallet has an unsupported import method", async () => {
		subject.data().set(WalletData.ImportMethod, WalletImportMethod.Address);

		await assert
			.is(() => subject.mutator().removeEncryption("wrong-password"))
			.rejects.toThrow(`Import method [${WalletImportMethod.Address}] is not supported.`);
	});

	test("should throw if the provided password does not match the wallet", async () => {
		subject.signingKey().set(identity.mnemonic, "password");

		subject.data().set(WalletData.ImportMethod, WalletImportMethod.BIP39.MNEMONIC_WITH_ENCRYPTION);

		await assert
			.is(() => subject.mutator().removeEncryption("wrong-password"))
			.rejects.toThrow("The provided password does not match the wallet.");
	});
});