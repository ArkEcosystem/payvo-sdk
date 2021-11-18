import "reflect-metadata";
import nock from "nock";
import { bootContainer } from "../test/mocking.js";
import { PluginRepository } from "./plugin.repository";
import { ContactRepository } from "./contact.repository";
import { DataRepository } from "./data.repository";
import { ExchangeTransactionRepository } from "./exchange-transaction.repository";
import { SettingRepository } from "./setting.repository";
import { WalletRepository } from "./wallet.repository";
import { CountAggregate } from "./count.aggregate";
import { RegistrationAggregate } from "./registration.aggregate";
import { TransactionAggregate } from "./transaction.aggregate";
import { WalletAggregate } from "./wallet.aggregate";
import { Authenticator } from "./authenticator.js";
import { Profile } from "./profile.js";
import { IProfile, IReadWriteWallet, ProfileData, ProfileSetting } from "./contracts.js";
import { WalletFactory } from "./wallet.factory";
import { mock, MockProxy } from "jest-mock-extended";
import { ProfileNotificationService } from "./notification.service.js";

let subject: IProfile;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))
		.persist();
});

test.before.each(() => {
	subject = new Profile({ id: "uuid", name: "name", data: "" });

	subject.settings().set(ProfileSetting.Name, "John Doe");
});

it("should have an id", () => {
	assert.is(subject.id(), "uuid");
});

it("should have a name", () => {
	assert.is(subject.name(), "John Doe");
});

it("should have a default theme", () => {
	assert.is(subject.appearance().get("theme"), "light");
});

it("should have a custom theme", () => {
	subject.settings().set(ProfileSetting.Theme, "dark");

	assert.is(subject.appearance().get("theme"), "dark");
});

it("should have a default avatar", () => {
	assert
		.is(subject.avatar())
		.toMatchInlineSnapshot(
			`"<svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"picasso\\" width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\"><style>.picasso circle{mix-blend-mode:soft-light;}</style><rect fill=\\"rgb(233, 30, 99)\\" width=\\"100\\" height=\\"100\\"/><circle r=\\"45\\" cx=\\"80\\" cy=\\"30\\" fill=\\"rgb(76, 175, 80)\\"/><circle r=\\"55\\" cx=\\"0\\" cy=\\"60\\" fill=\\"rgb(255, 152, 0)\\"/><circle r=\\"40\\" cx=\\"50\\" cy=\\"50\\" fill=\\"rgb(3, 169, 244)\\"/></svg>"`,
		);
});

it("should have a custom avatar", () => {
	subject.settings().set(ProfileSetting.Avatar, "custom-avatar");

	assert.is(subject.avatar(), "custom-avatar");
});

it("should have a custom avatar in data", () => {
	subject.getAttributes().set("data.avatar", "something");
	subject.getAttributes().set("avatar", "custom-avatar");

	assert.is(subject.avatar(), "custom-avatar");
});

it("should have a balance", () => {
	assert.is(subject.balance(), 0);
});

it("should have a converted balance", () => {
	assert.is(subject.convertedBalance(), 0);
});

it("should have a contacts repository", () => {
	assert.is(subject.contacts() instanceof ContactRepository);
});

it("should have a data repository", () => {
	assert.is(subject.data() instanceof DataRepository);
});

it("should have a exchange transactions repository", () => {
	assert.is(subject.exchangeTransactions() instanceof ExchangeTransactionRepository);
});

it("should have a notifications repository", () => {
	assert.is(subject.notifications() instanceof ProfileNotificationService);
});

it("should have a plugins repository", () => {
	assert.is(subject.plugins() instanceof PluginRepository);
});

it("should have a settings repository", () => {
	assert.is(subject.settings() instanceof SettingRepository);
});

it("should have a wallets repository", () => {
	assert.is(subject.wallets() instanceof WalletRepository);
});

it("should flush all data", () => {
	assert.is(subject.settings().keys()).toHaveLength(1);

	subject.flush();

	assert.is(subject.settings().keys()).toHaveLength(17);
});

it("should fail to flush all data if the name is missing", () => {
	subject.settings().forget(ProfileSetting.Name);

	assert.is(subject.settings().keys()).toHaveLength(0);

	assert.is(() => subject.flush()).toThrowError("The name of the profile could not be found. This looks like a bug.");
});

it("should flush settings", () => {
	assert.is(subject.settings().keys()).toHaveLength(1);

	subject.flushSettings();

	assert.is(subject.settings().keys()).toHaveLength(17);
});

it("should fail to flush settings if the name is missing", () => {
	subject.settings().forget(ProfileSetting.Name);

	assert.is(subject.settings().keys()).toHaveLength(0);

	assert
		.is(() => subject.flushSettings())
		.toThrowError("The name of the profile could not be found. This looks like a bug.");
});

it("should have a a wallet factory", () => {
	assert.is(subject.walletFactory() instanceof WalletFactory);
});

it("should have a count aggregate", () => {
	assert.is(subject.countAggregate() instanceof CountAggregate);
});

it("should have a registration aggregate", () => {
	assert.is(subject.registrationAggregate() instanceof RegistrationAggregate);
});

it("should have a transaction aggregate", () => {
	assert.is(subject.transactionAggregate() instanceof TransactionAggregate);
});

it("should have a wallet aggregate", () => {
	assert.is(subject.walletAggregate() instanceof WalletAggregate);
});

it("should have an authenticator", () => {
	assert.is(subject.auth() instanceof Authenticator);
});

it("should determine if the password uses a password", () => {
	assert.is(subject.usesPassword(), false);

	subject.auth().setPassword("password");

	assert.is(subject.usesPassword(), true);
});

test("#hasBeenPartiallyRestored", async () => {
	const wallet: MockProxy<IReadWriteWallet> = mock<IReadWriteWallet>();
	wallet.id.mockReturnValue("some-id");
	wallet.hasBeenPartiallyRestored.mockReturnValue(true);
	subject.wallets().push(wallet);
	assert.is(subject.hasBeenPartiallyRestored(), true);
});

it("should mark the introductory tutorial as completed", () => {
	assert.is(subject.hasCompletedIntroductoryTutorial(), false);

	subject.markIntroductoryTutorialAsComplete();

	assert.is(subject.hasCompletedIntroductoryTutorial(), true);
});

it("should determine if the introductory tutorial has been completed", () => {
	assert.is(subject.hasCompletedIntroductoryTutorial(), false);

	subject.data().set(ProfileData.HasCompletedIntroductoryTutorial, true);

	assert.is(subject.hasCompletedIntroductoryTutorial(), true);
});

it("should mark the manual installation disclaimer as accepted", () => {
	assert.is(subject.hasAcceptedManualInstallationDisclaimer(), false);

	subject.markManualInstallationDisclaimerAsAccepted();

	assert.is(subject.hasAcceptedManualInstallationDisclaimer(), true);
});

it("should determine if the manual installation disclaimer has been accepted", () => {
	assert.is(subject.hasAcceptedManualInstallationDisclaimer(), false);

	subject.data().set(ProfileData.HasAcceptedManualInstallationDisclaimer, true);

	assert.is(subject.hasAcceptedManualInstallationDisclaimer(), true);
});

// it("should fail to encrypt a profile if the password is invalid", () => {
// 	subject.auth().setPassword("password");

// 	assert.is(() => subject.save("invalid-password")).toThrow("The password did not match our records.");
// });

// it("should encrypt a profile with the in-memory password if none was provided", () => {
// 	subject.auth().setPassword("password");

// 	assert.is(() => subject.save()).not.toThrow("The password did not match our records.");
// });

// it("should fail to save if encoding or encrypting fails", () => {
// 	// @ts-ignore
// 	const encodingMock = jest.spyOn(JSON, "stringify").mockReturnValue(undefined);

// 	assert.is(() => subject.save()).toThrow("Failed to encode or encrypt the profile");
// 	encodingMock.mockRestore();
// });
