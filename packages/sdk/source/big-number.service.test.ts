import { describe } from "@payvo/sdk-test";
import { ConfigKey, ConfigRepository } from "./config";
import { Container } from "./container";
import { BindingType } from "./service-provider.contract";
import { BigNumberService } from "./big-number.service";

describe("BigNumberService", ({ assert, each }) => {
	each(
		"should create a bignum with a power of %s",
		async ({ dataset }) => {
			const container = new Container();

			const configRepository = new ConfigRepository({});
			configRepository.set(ConfigKey.Network, {
				currency: {
					decimals: dataset,
				},
			});

			container.constant(BindingType.ConfigRepository, configRepository);
			container.singleton(BindingType.BigNumberService, BigNumberService);

			assert.is(
				container
					.get<BigNumberService>(BindingType.BigNumberService)
					.make(`1${"0".repeat(dataset)}`)
					.toHuman(),
				1,
			);
		},
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	);
});
