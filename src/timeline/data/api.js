import { getAuthenticatedHttpClient } from '../../data/api';
import { camelCaseObject, normalizeBySlug, normalizeUser } from '../../utils';
import DpApiService from '../../data/services/DpService';
/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
export async function getTimelineItems(
  selectedPros,
  selectedFeedTypes,
  pageNumber,
) {
  const url = DpApiService.getTimelineFeedsUrl(
    selectedPros,
    selectedFeedTypes,
    pageNumber,
  );
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
    city: data.results.map(
      (item) => item.instance.city && normalizeBySlug(item.instance.city),
    ),
    pro: data.results.map((item) => normalizeBySlug(item.instance.pro)),
    metaData: {
      nextPage: data.next,
      previousPage: data.previous ? data.previous : {},
      total: data.total_items,
    },
  };
  return camelCaseObject(normalizedData);
};
