import wpmDistributionModel from "../models/wpmDistribution.model.js";

export class WpmDistributionService {
  public async getFrequenciesByUserId(
    userId: string,
  ): Promise<{ ranges: number[]; counts: number[] }> {
    const record = await wpmDistributionModel.findOne({ userId }).lean();
    const ranges = record.frequency.map((r) => r.rangeStart);
    const counts = record.frequency.map((r) => r.count);
    return { ranges, counts };
  }
}
