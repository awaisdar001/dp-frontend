import moment from 'moment';

import { TripAvailability } from './utils';

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
