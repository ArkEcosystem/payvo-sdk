import { Contracts } from "@payvo/sdk";
import { DateTime } from "@payvo/intl";

import {
	DailyAverageOptions,
	HistoricalData,
	HistoricalPriceOptions,
	HistoricalTransformer,
	HistoricalVolumeOptions,
	MarketDataCollection,
	PriceTracker,
} from "../../../contracts";

/**
 * Implements a transformer for historical volume data.
 *
 * @export
 * @class HistoricalVolumeTransformer
 * @implements {HistoricalTransformer}
 */
export class HistoricalVolumeTransformer implements HistoricalTransformer {
	/**
	 * Creates an instance of HistoricalVolumeTransformer.
	 *
	 * @param {Contracts.KeyValuePair} data
	 * @memberof HistoricalVolumeTransformer
	 */
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	/**
	 * Transforms the given data into a normalised format.
	 *
	 * @param {Contracts.KeyValuePair} options
	 * @returns {HistoricalData}
	 * @memberof HistoricalVolumeTransformer
	 */
	public transform(options: Contracts.KeyValuePair): HistoricalData {
		const datasets = {};

		for (let i = 0; i < this.data.total_volumes.length; i += 24) {
			datasets[this.data.total_volumes[i][0]] = this.data.total_volumes[i][1];
		}

		const datasetValues: number[] = Object.values(datasets);

		return {
			labels: Object.keys(datasets).map((time) => DateTime.make(time).format(options.dateFormat)),
			datasets: datasetValues,
			min: Math.min(...datasetValues),
			max: Math.max(...datasetValues),
		};
	}
}
