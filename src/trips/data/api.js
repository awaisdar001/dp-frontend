import {camelCaseObject, DateFormats, getDateFromMilliSec, transformQueryString} from "../../utils";
import {getAuthenticatedHttpClient} from "../../data/api";


/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
export async function getTripItems(searchParams) {
  const {data} = await getAuthenticatedHttpClient().get(
    getTripsListURLFromState(searchParams),
  );
  return camelCaseObject(data);
}


const getTripsListURLFromState = ({searchDays, searchDates, searchPrices, searchKeyword, selectedDestinations}) => {
  const destinations = selectedDestinations.reduce((acc, d) => `${acc.slug ? acc.slug : acc},${d.slug}`);
  const dateFormat = DateFormats.YearMonthDate;
  const queryString = transformQueryString([
      ['name', searchKeyword],
      ['destination', destinations],
      ['duration_from', searchDays[0]],
      ['duration_to', searchDays[1]],
      ['price_from', searchPrices[0]],
      ['price_to', searchPrices[1]],
      ['date_from', getDateFromMilliSec(searchDates[0], dateFormat)],
      ['date_to', getDateFromMilliSec(searchDates[1], dateFormat)],
    ]
  )
  return `/api/trips/?${queryString}`;
};