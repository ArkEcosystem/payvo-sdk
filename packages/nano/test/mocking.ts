import { Test } from "@payvo/sdk";
import { Request } from "@payvo/sdk-fetch";

import { manifest } from "../source/manifest";

export const createService = <T = any>(service: any, network: string = "nano.mainnet", predicate?: Function): T => {
	return Test.createService({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate,
		service,
	});
};
