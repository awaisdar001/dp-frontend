import {buildQueryString as qs} from '../../utils';

const baseURL = process.env.REACT_APP_BASE_URL;

class DpApiService {
  static getTimelineFeedsUrl({selectedFeedTypes: feedTypes, selectedProvinces: pros, pageNumber, pageUrl}) {

    if (pageUrl) {
      return pageUrl;
    }
    let queryString = [qs(pros, 'pro'), qs(feedTypes, 'type')].join('&');
    if (pageNumber) {
      queryString = `${queryString}&page=${pageNumber}`;
    }
    return `${baseURL}/api/feeds/?${queryString}`;
  };
}

export default DpApiService;
