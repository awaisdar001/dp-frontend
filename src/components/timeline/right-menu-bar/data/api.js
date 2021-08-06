import { getAuthenticatedHttpClient } from '../../../../data/api';
import { camelCaseObject } from '../../../../utils';

/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
const url = '/api/feeds/popular-items';

export async function getPopularItems() {
  const { data } = await getAuthenticatedHttpClient().get(url);
  return camelCaseObject(data);
}
