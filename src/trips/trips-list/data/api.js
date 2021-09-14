import {getAuthenticatedHttpClient} from "../../../data/api";
import {camelCaseObject} from "../../../utils";

/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
export function getTripHeadingItems() {
  return camelCaseObject({});
}

/**
 * Fetches trips list destinations
 * @returns {Promise<[{}]>}
 */
export async function getTripDestinations() {
  const {data} = await getAuthenticatedHttpClient().get(
    '/api/destinations/'
  );
  return normalizeDestinations(data);
}

function normalizeDestinations(destinations) {
  const selectedDestinations = destinations.map((destination) => {
    destination.selected = true
    return destination;
  });
  const destinationIds = destinations.map((destination) => destination.slug);
  return camelCaseObject(selectedDestinations);
}