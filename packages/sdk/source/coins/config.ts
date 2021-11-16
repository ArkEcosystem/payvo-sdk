import { get, has, set, unset, ValidatorSchema } from "@payvo/sdk-helpers";

export class ConfigRepository {
	readonly #config: Record<string, any>;

	public constructor(config: object) {
		const { error, value } = ValidatorSchema.object({
			httpClient: ValidatorSchema.object(),
			network: ValidatorSchema.string(),
			networks: ValidatorSchema.object().optional(),
			ledgerTransportFactory: ValidatorSchema.function().optional(),
		}).validate(config);

		if (error !== undefined) {
			throw new Error(`Failed to validate the configuration: ${(error as any).message}`);
		}

		this.#config = value;
	}

	public all(): Record<string, any> {
		return this.#config;
	}

	public get<T>(key: string, defaultValue?: T): T {
		const value: T | undefined = get(this.#config, key, defaultValue);

		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown configuration value.`);
		}

		return value;
	}

	public getLoose<T>(key: string, defaultValue?: T): T | undefined {
		return get(this.#config, key, defaultValue);
	}

	public set(key: string, value: unknown): void {
		set(this.#config, key, value);
	}

	public has(key: string): boolean {
		return has(this.#config, key);
	}

	public missing(key: string): boolean {
		return !this.has(key);
	}

	public forget(key: string): boolean {
		return unset(this.#config, key);
	}
}

export enum ConfigKey {
	Bech32 = "network.constants.bech32",
	CurrencyDecimals = "network.currency.decimals",
	CurrencyTicker = "network.currency.ticker",
	HttpClient = "httpClient",
	KnownWallets = "network.knownWallets",
	Network = "network",
	NetworkId = "network.id",
	NetworkType = "network.type",
	Slip44 = "network.constants.slip44",
}
