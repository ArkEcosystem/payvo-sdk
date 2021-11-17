import { CoinBundle } from "./coins/index.js";
import { AbstractServiceProvider, IServiceProvider } from "./ioc/index.js";

export const bundle = (data: CoinBundle): CoinBundle => {
	let serviceProvider: IServiceProvider;

	if (data.serviceProvider) {
		serviceProvider = data.serviceProvider;
	} else {
		serviceProvider = AbstractServiceProvider as unknown as IServiceProvider;
	}

	return {
		dataTransferObjects: data.dataTransferObjects,
		manifest: data.manifest,
		serviceProvider,
		services: data.services,
	};
};
