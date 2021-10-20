import _ from 'lodash';
import moment from 'moment';

import {
  buildQsFromArray,
  camelCaseObject,
  DateUtils,
  getRatingFeedback,
  normalizeBySlug,
  normalizeLocation,
  normalizeUser,
  snakeCaseObject,
  toBr,
  transformQueryString,
  TripAvailability,
} from './utils';

describe('Test DateUtils', () => {
  const today = moment().startOf('day');
  describe('getDateFromTimestamp', () => {
    test('should return date', () => {
      const dateFromTimestamp = DateUtils.getDateFromTimestamp(today.valueOf(), false);

      expect(dateFromTimestamp.isSame(today)).toBeTruthy();
    });

    test('should return formatted date by default', () => {
      const formattedDate = DateUtils.getDateFromTimestamp(today.valueOf());

      expect(formattedDate).toEqual(today.format('YYYY-MM-DD'));
    });

    test('should return specified formatted date', () => {
      const formatInTest = 'MM-YYYY-DD';
      const formattedDate = DateUtils.getDateFromTimestamp(today.valueOf(), formatInTest);

      expect(formattedDate).toEqual(today.format(formatInTest));
    });
  });

  describe('formatToYearMonthDay', () => {
    test('should should return formatted date', () => {
      const formattedDate = DateUtils.formatToYearMonthDay(today);

      expect(formattedDate).toEqual(today.format('YYYY-MM-DD'));
    });
  });

  describe('formatToDayMonth', () => {
    test('should should return formatted date', () => {
      const formattedDate = DateUtils.formatToDayMonth(today);

      expect(formattedDate).toEqual(today.format('DD MMM'));
    });
  });

  describe('change casing of object', () => {
    const snakeCaseData = {
      trip_name: 'foo_bar',
      trip_availability: { option_for: 'Daily', date_to: DateUtils.formatToYearMonthDay(today) },
      trip_city: 'gilgit_baltistan',
      meta_data: { lat: 0, lng: 0 },
    };

    const camleCaseData = {
      tripName: 'foo_bar',
      tripAvailability: { optionFor: 'Daily', dateTo: DateUtils.formatToYearMonthDay(today) },
      tripCity: 'gilgit_baltistan',
      metaData: { lat: 0, lng: 0 },
    };

    test('should return camle case object', () => {
      expect(camelCaseObject(snakeCaseData)).toEqual(camleCaseData);
    });

    test('should return snake case object', () => {
      expect(snakeCaseObject(camleCaseData)).toEqual(snakeCaseData);
    });
  });

  describe('Util methods', () => {
    test('should convert new lines to Brs', () => {
      const dataWithReturns = 'foo\r\nbar.\n\rfoo and bar. \r\nfoo then bar and break.\n';
      const expectedData =
        'foo<br />bar.<br /><br />foo and bar. <br />foo then bar and break.<br />';

      expect(toBr(dataWithReturns)).toEqual(expectedData);
    });

    test('should transform querystring', () => {
      const qs = transformQueryString([
        ['name', 'morocco'],
        ['destination', 'morocco,marrakesh'],
        ['duration_from', '3'],
      ]);
      expect(qs).toEqual('name=morocco&destination=morocco,marrakesh&duration_from=3');
    });

    test('should return expected querystring', () => {
      const qsData = [
        { name: 'london' },
        { name: 'monterial' },
        { name: 'boston' },
        { name: 'new york' },
      ];
      const qs = buildQsFromArray(qsData, 'city');

      expect(qs).toEqual('city=london&city=monterial&city=boston&city=new%20york');
    });

    test('should return expected querystring with custom key name', () => {
      const qsData = [
        { foo: 'london' },
        { foo: 'monterial' },
        { foo: 'boston' },
        { foo: 'new york' },
      ];
      const qs = buildQsFromArray(qsData, 'city', 'foo');

      expect(qs).toEqual('city=london&city=monterial&city=boston&city=new%20york');
    });

    test('should add an id attribte from slug', () => {
      const normalizedData = normalizeBySlug({ name: 'foo bar', slug: 'foo-bar' });

      expect(normalizedData).toHaveProperty('id');
      expect(normalizedData.id).toEqual('foo-bar');
    });

    test('should override id if exists', () => {
      const normalizedData = normalizeBySlug({ id: 'random-id', name: 'foo bar', slug: 'foo-bar' });

      expect(normalizedData).toHaveProperty('id');
      expect(normalizedData.id).toEqual('foo-bar');
    });

    test('should not fail if data is undefined.', () => {
      const normalizedData = normalizeBySlug();

      expect(normalizedData).toBeUndefined();
    });

    test('should not fail if data does not have slug key.', () => {
      const normalizedData = normalizeBySlug({ name: 'foo bar' });

      expect(normalizedData).toBeUndefined();
    });

    test('normalizeUser should return expected data', () => {
      const user = { created_by: { username: 'foobar', full_name: 'Foo Bar' } };
      const normalizedUser = normalizeUser(user, 'created_by');

      expect(normalizedUser).toMatchObject({ ...user.created_by, id: 'foobar' });
    });

    test('normalizeUser should return undefined', () => {
      let normalizedUser = normalizeUser({}, 'created_by');
      const noUsername = { created_by: { uId: 'foobar', full_name: 'Foo Bar' } };
      expect(normalizedUser).toBeUndefined();

      normalizedUser = normalizeUser({ updated_by: { username: 'foobar' } }, 'created_by');
      expect(normalizedUser).toBeUndefined();

      normalizedUser = normalizeUser(undefined, 'created_by');
      expect(normalizedUser).toBeUndefined();

      normalizedUser = normalizeUser(noUsername, 'created_by');
      expect(normalizedUser).toBeUndefined();
    });

    test('normalizeLocation should return expected data', () => {
      const location = { name: 'boston', slug: 'boston', coordinates: '00,11' };
      let normalizedLocation = normalizeLocation(location);

      expect(normalizedLocation).toMatchObject({
        ...location,
        id: location.slug,
        lat: 0,
        lng: 11,
      });
    });

    test('normalizeLocation should return expected float type data', () => {
      const location = { name: 'boston', slug: 'boston', coordinates: '-73.210210,64.093826' };
      let normalizedLocation = normalizeLocation(location);

      expect(normalizedLocation).toMatchObject({
        ...location,
        id: location.slug,
        lat: -73.21021,
        lng: 64.093826,
      });
    });

    test('normalizeLocation should return 0 when invalid coordinates', () => {
      const location = { name: 'boston', slug: 'boston', coordinates: 'aa,bb' };
      let normalizedLocation = normalizeLocation(location);

      expect(normalizedLocation).toMatchObject({
        ...location,
        id: location.slug,
        lat: 0,
        lng: 0,
      });
    });

    test('normalizeLocation should return 0 when coordinates are not available', () => {
      const location = { name: 'boston', slug: 'boston' };
      let normalizedLocation = normalizeLocation(location);

      expect(normalizedLocation).toMatchObject({
        ...location,
        id: location.slug,
        lat: 0,
        lng: 0,
      });
    });

    test.each([
      [0, 'N/A'],
      [1, 'Below Average'],
      [2, 'Average'],
      [3, 'Good'],
      [4, 'Excellent'],
      [5, 'Outstanding'],
      [6, 'Outstanding'],
    ])('.getRatingFeedback(%i) as %j', (a, expected) => {
      const data = getRatingFeedback(a);

      expect(data).toEqual(expected);
    });

    test.each(_.chunk(_.range(0, 1, 0.1), 1))('.getRatingFeedback(%f) returns "N/A"', (rating) => {
      expect(getRatingFeedback(rating)).toEqual('N/A');
    });

    test.each(_.chunk(_.range(1.1, 2, 0.1), 1))(
      '.getRatingFeedback(%f) returns "Below Average"',
      (rating) => {
        expect(getRatingFeedback(rating)).toEqual('Below Average');
      },
    );

    test.each(_.chunk(_.range(2.1, 3, 0.1), 1))(
      '.getRatingFeedback(%f) returns "Average"',
      (rating) => {
        expect(getRatingFeedback(rating)).toEqual('Average');
      },
    );

    test.each(_.chunk(_.range(3.1, 4, 0.1), 1))(
      '.getRatingFeedback(%f) returns "Good"',
      (rating) => {
        expect(getRatingFeedback(rating)).toEqual('Good');
      },
    );

    test.each(_.chunk(_.range(4.1, 5, 0.1), 1))(
      '.getRatingFeedback(%f) returns "Excellent"',
      (rating) => {
        expect(getRatingFeedback(rating)).toEqual('Excellent');
      },
    );

    test.each(_.chunk(_.range(5.1, 10, 0.1), 1))(
      '.getRatingFeedback(%f) returns "Outstanding" above 5',
      (rating) => {
        expect(getRatingFeedback(rating)).toEqual('Outstanding');
      },
    );
  });
});

describe('TripAvailability', () => {
  const today = moment().startOf('day');
  const tomorrow = today.clone().add(1, 'days');

  describe('Daily Schedule Type', () => {
    const dailyTripAvailability = {
      type: TripAvailability.TYPE.Daily,
      options: {
        dateFrom: today.clone().subtract(10, 'days'),
        dateTo: today.clone().add(1, 'days'),
      },
    };
    let tripDates = new TripAvailability(dailyTripAvailability).getDates();
    test('expect two available dates', () => {
      expect(tripDates).toHaveLength(2);
    });

    test('dates to be today and tomorrow', () => {
      expect(tripDates[0].isSame(today)).toBeTruthy();
      expect(tripDates[1].isSame(tomorrow)).toBeTruthy();
    });
    test('default formatting', () => {
      const tripDates = new TripAvailability(dailyTripAvailability).getFormattedDates();
      expect(tripDates[0]).toEqual(today.format('YYYY-MM-DD'));
    });
    test('reverse formatting', () => {
      const tripDates = new TripAvailability(dailyTripAvailability).getFormattedDates();
      expect(moment(tripDates[0]).isSame(today)).toBeTruthy();
      expect(moment(tripDates[1]).isSame(tomorrow)).toBeTruthy();
    });

    test('no limit in creating schedules', () => {
      const tripDays = 60;
      const tripAvailability = {
        ...dailyTripAvailability,
        options: {
          dateFrom: tomorrow,
          dateTo: tomorrow.clone().add(tripDays, 'days'),
        },
      };
      const tripDates = new TripAvailability(tripAvailability).getFormattedDates();

      expect(tripDates).toHaveLength(tripDays + 1);
    });

    test('expect weekends are not missed', () => {
      const tripDays = 60;
      const tripAvailability = {
        ...dailyTripAvailability,
        options: {
          dateFrom: tomorrow,
          dateTo: tomorrow.clone().add(tripDays, 'days'),
        },
      };
      const tripDates = new TripAvailability(tripAvailability).getDates();
      const startDate = today.clone();

      tripDates.filter((date) => {
        startDate.add(1, 'day');
        return expect(date.isSame(startDate)).toBeTruthy();
      });
    });
  });

  describe('Weekly Schedule Type', () => {
    const weeklyOneDayTripAvailability = {
      type: TripAvailability.TYPE.Weekly,
      dateTo: today.clone().add(1, 'month'),
      options: {
        dayOfWeek: [1], // Every monday.
      },
    };
    const weeklyMultiDayTripAvailability = {
      ...weeklyOneDayTripAvailability,
      options: {
        dayOfWeek: [1, 2, 3],
      },
    };

    test('expect weekly dates should not be same', () => {
      const tripDates = new TripAvailability(weeklyOneDayTripAvailability).getDates();
      tripDates.map((date, index) => {
        // dont' compare the 1st instance, it will always be unique.
        if (index === 0) return false;
        // Compare the date with its previous node.
        return expect(date.isSame(tripDates[index - 1])).toBeFalsy();
      });
    });

    test('expect weekdays are same', () => {
      const schedule = weeklyOneDayTripAvailability;
      const tripDates = new TripAvailability(schedule).getDates();

      tripDates.map((date) => expect(schedule.options.dayOfWeek).toContain(date.isoWeekday()));
    });

    test('multi week day schedule', () => {
      const schedule = weeklyMultiDayTripAvailability;
      const tripDates = new TripAvailability(schedule).getDates();

      tripDates.map((date) => expect(schedule.options.dayOfWeek).toContain(date.isoWeekday()));
    });
  });

  describe('FixDate Schedule Type', () => {
    const fixDateTripAvailability = {
      type: TripAvailability.TYPE.FixDate,
      options: {
        dates: [
          today.valueOf(),
          tomorrow.valueOf(),
          today.clone().add(2, 'days').valueOf(),
          today.clone().add(3, 'days').valueOf(),
          today.clone().add(4, 'days').valueOf(),
        ],
      },
    };

    test('expect we get all dates as schedules', () => {
      const tripDates = new TripAvailability(fixDateTripAvailability).getDates();

      expect(tripDates).toHaveLength(fixDateTripAvailability.options.dates.length);
    });

    test('expect the dates are correct', () => {
      const initialDates = fixDateTripAvailability.options.dates;
      const tripDates = new TripAvailability(fixDateTripAvailability).getDates();

      tripDates.map((date, index) => {
        return expect(date.isSame(initialDates[index], 'date')).toBeTruthy();
      });
    });

    test('expect the custom date format', () => {
      const tripDates = new TripAvailability(fixDateTripAvailability).getFormattedDates('DD');

      expect(tripDates[0]).toEqual(today.format('DD'));
      expect(tripDates[1]).toEqual(tomorrow.format('DD'));
    });
  });

  describe('Unknown Schedule Type', function () {
    test('expect an empty list', () => {
      const tripDates = new TripAvailability({ type: 'foo' }).getFormattedDates('DD');

      expect(tripDates).toEqual([]);
    });
  });
});
