import "reflect-metadata";
import { mock } from "jest-mock-extended";

import { Coins } from "@payvo/sdk";
import nock from "nock";

import { bootContainer } from "../test/mocking";
import NodeFeesFixture from "../test/fixtures/client/node-fees.json";
import { Profile } from "./profile";
import { ICoinService, IDataRepository } from "./contracts";
import { CoinService } from "./coin.service";

let subject: ICoinService;

test.before(() => {
	bootContainer();

	nock.disableNetConnect();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/fees")
		.query(true)
		.reply(200, NodeFeesFixture)
		.get("/api/transactions/fees")
		.query(true)
		.reply(200, require("../test/fixtures/client/transaction-fees.json"))
		.persist();
});

test.before.each(async () => {
	const profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	subject = new CoinService(profile.data());
});

describe("CoinService", () => {
	test("#push", () => {
		subject.set("ARK", "ark.devnet");
		const coin = subject.get("ARK", "ark.devnet");
		assert.is(coin.network().id(), "ark.devnet");
	});

	test("#has", async () => {
		subject.set("ARK", "ark.devnet");

		assert.is(subject.has("ARK", "ark.devnet"), true);
		assert.is(subject.has("UNKNOWN", "ark.devnet"), false);
	});

	test("#get", async () => {
		subject.set("ARK", "ark.devnet");

		assert.is(subject.get("ARK", "ark.devnet").network().id(), "ark.devnet");
		assert.is(() => subject.get("ARK", "unknown")).toThrow(/does not exist/);
	});

	test("#values", async () => {
		subject.set("ARK", "ark.devnet");

		const values = subject.values();
		assert.is(values, [{ ark: { devnet: expect.anything() } }]);
		//@ts-ignore
		assert.is(values[0].ark.devnet instanceof Coins.Coin);
	});

	test("#all", async () => {
		subject.set("ARK", "ark.devnet");

		assert.is(Object.keys(subject.all()), ["ARK"]);
	});

	test("#entries", async () => {
		subject.set("ARK", "ark.devnet");

		assert.is(subject.entries(), [["ARK", ["ark.devnet"]]]);

		const mockUndefinedNetwork = jest
			.spyOn(subject, "all")
			// @ts-ignore
			.mockReturnValue({ ARK: { ark: undefined } });

		assert.is(subject.entries(), [["ARK", ["ark"]]]);

		mockUndefinedNetwork.mockRestore();
	});

	test("#flush", async () => {
		const dataRepository: IDataRepository = mock<IDataRepository>();
		subject = new CoinService(dataRepository);

		subject.flush();

		assert.is(dataRepository.flush).toHaveBeenCalled();
	});
});