/* eslint-disable import/prefer-default-export */
import { getAuthenticatedHttpClient } from '../../../data/api';
import {buildQueryString as qs, camelCaseObject} from "../../../utils";

const feedsUrl = '/api/feeds';


const getFeedsURL = (selectedPros, selectedFeedTypes, pageNumber) => {
  let queryString = [qs(selectedPros, 'pro'), qs(selectedFeedTypes, 'type')].join('&');
  if (pageNumber){
    queryString = `${queryString}&page=${pageNumber}`
    console.log('NewURL:queryString', queryString)
  }
  return feedsUrl + '?' + queryString;
};

/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
export async function getTimelineItems(selectedPros, selectedFeedTypes, pageNumber) {
  const { data } = await getAuthenticatedHttpClient().get(getFeedsURL(selectedPros, selectedFeedTypes, pageNumber));
  return camelCaseObject(data)
}
// export async function getCourseApps(courseId) {
//   const { data } = await getAuthenticatedHttpClient()
//     .get(`${courseAppsApiUrl}/${courseId}`);
//   return camelCaseObject(data);
// }

/**
 * Updates the status of a course app.
 * @param {string} courseId Course ID for the course to operate on
 * @param {string} appId ID for the application to operate on
 * @param {boolean} state The new state
 */

