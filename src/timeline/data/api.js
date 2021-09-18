import { getAuthenticatedHttpClient } from '../../data/api';
import DpApiService from '../../data/services/DpService';
import { camelCaseObject, normalizeBySlug, normalizeUser } from '../../utils';

/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
export async function getTimelineItems(options) {
  const url = DpApiService.getTimelineFeedsUrl(options);
  const { data } = await getAuthenticatedHttpClient().get(url);
  return normalizeTimelineItems(data);
}

const normalizeTimelineItems = (data) => {
  const normalizedData = {
    items: data.results.map((item) => ({
      ...item,
      display_user: item.display_user.username,
      instance: {
        ...item.instance,
        created_by: item.instance.created_by.username,
        pro: item.instance.pro.slug,
        city: item.instance.city && item.instance.city.slug,
      },
      state: item.type, // todo: delete type property of item
    })),
    states: data.results.map((item) => ({
      id: item.type,
      name: item.state.name,
    })),
    users: [
      ...data.results.map((item) => normalizeUser(item.instance, 'created_by')),
      ...data.results.map((item) => normalizeUser(item, 'display_user')),
    ],
    city: data.results.map((item) => item.instance.city && normalizeBySlug(item.instance.city)),
    pro: data.results.map((item) => normalizeBySlug(item.instance.pro)),
    metaData: {
      nextPage: data.next,
      previousPage: data.previous ? data.previous : {},
      total: data.total_items,
    },
  };
  return camelCaseObject(normalizedData);
};
