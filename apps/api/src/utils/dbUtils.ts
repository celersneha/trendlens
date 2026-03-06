export async function getOrScrapeAndStore<T>(
  model: any,
  scrapeFn: () => Promise<T[]>,
): Promise<T[]> {
  const existing = await model.findMany();
  if (existing.length > 0) {
    return existing;
  }
  const scraped = await scrapeFn();
  if (scraped.length > 0) {
    await model.createMany({ data: scraped });
    return await model.findMany();
  }
  return [];
}
