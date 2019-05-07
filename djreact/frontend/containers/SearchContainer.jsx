import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  fetchSearchParams,
  updateActivityChecked,
  updateLocationChecked,
  updateSearchDate,
  updateSearchDays,
  updateSearchPrice
} from '../actions/TripSearchActions';
import SearchActivities from '../components/SearchActivities';

import SearchLocations from '../components/SearchLocations';
import OneWaySlider from '../components/Sliders/OneWaySlider';
import PriceSlider from '../components/Sliders/PriceSlider';
import DateSlider from '../components/Sliders/DateSlider';

import { format } from 'date-fns';
import { formatDigit } from '../utils';

class SearchHeader extends React.Component {
  render() {
    const oneDay = 1000 * 60 * 60 * 24;
    const {
      searchReducer,
      updateLocationChecked,
      updateActivityChecked,
      updateSearchDays,
      updateSearchDate,
      updateSearchPrice
    } = this.props;
    const {
      days: searchDays,
      date: searchDate,
      price: searchPrice
    } = searchReducer.search;
    const { activities, locations } = searchReducer;

    return (
      <Fragment>
        <div className='col-md-3 col-sm-4'>
          <div className='filter-by-block md-margin-bottom-60'>
            <h1>Filter by</h1>
            <div className='panel-group' id='accordion'>
              <div className='panel panel-default'>
                <div className='panel-heading'>
                  <h2 className='panel-title'>
                    <a
                      data-toggle='collapse'
                      data-parent='#accordion'
                      href='#collapse-location'
                    >
                      Location
                      <i className='fa fa-angle-down' />
                    </a>
                  </h2>
                </div>
                <div
                  id='collapse-location'
                  className='panel-collapse collapse in '
                >
                  <div className='panel-body'>
                    <ul
                      id='location-listing'
                      className='list-unstyled checkbox-list'
                    >
                      <SearchLocations
                        searchLocationsList={locations}
                        onChangeCallBack={updateLocationChecked}
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='panel-group' id='accordion-v2'>
              <div className='panel panel-default'>
                <div className='panel-heading'>
                  <h2 className='panel-title'>
                    <a
                      data-toggle='collapse'
                      data-parent='#accordion-v2'
                      href='#collapseTwo'
                    >
                      Activities
                      <i className='fa fa-angle-down' />
                    </a>
                  </h2>
                </div>
                <div id='collapseTwo' className='panel-collapse collapse in'>
                  <div className='panel-body'>
                    <ul
                      id='type-listing'
                      className='list-unstyled checkbox-list'
                    >
                      <SearchActivities
                        searchActivitiesList={activities}
                        onChangeCallBack={updateActivityChecked}
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-9 col-sm-8'>
          <div className='search-block-v2'>
            <div className='container'>
              <div className='col-md-2 col-sm-2'>
                <div className='slider-label'>
                  Duration:
                  <span className='slider-label' id='trip-date'>
                    <b>{' ' + searchDays.total + ' '}</b>
                  </span>
                  Days
                </div>
                <OneWaySlider
                  domain={searchDays.domain}
                  initial={[searchDays.total]}
                  onChange={updateSearchDays}
                />
              </div>

              <div className='col-md-2 col-sm-2 col-md-offset-1'>
                <div className='slider-label'>
                  <span className='slider-label' id='trip-duration'>
                    {format(searchDate.min, 'Do MMM')} {' — '}{' '}
                    {format(searchDate.max, 'Do MMM')}
                  </span>
                </div>
                <DateSlider
                  domain={searchDate.domain}
                  initial_min={searchDate.min}
                  initial_max={searchDate.max}
                  step={oneDay}
                  onChange={updateSearchDate}
                />
              </div>
              <div className='col-md-2 col-sm-2 col-md-offset-1'>
                <div className='slider-label'>
                  <span className='slider-label' id='trip-price'>
                    <b>
                      {' Rs. ' +
                        formatDigit(searchPrice.min) +
                        ' — ' +
                        formatDigit(searchPrice.max)}
                    </b>
                  </span>
                </div>
                <PriceSlider
                  domain={searchPrice.domain}
                  initial_min={searchPrice.min}
                  initial_max={searchPrice.max}
                  step={searchPrice.step}
                  onChange={updateSearchPrice}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchReducer: state.searchReducer
  };
};
const mapDispatchToProps = dispatch => {
  // bindActionCreators({ filterTalentPoolDataBySkills }, dispatch);
  return {
    fetchSearchParams: () => {
      dispatch(fetchSearchParams());
    },
    updateActivityChecked: (event, name) => {
      dispatch(updateActivityChecked(event, name));
    },
    updateLocationChecked: (event, name) => {
      dispatch(updateLocationChecked(event, name));
    },
    updateSearchDays: values => {
      dispatch(updateSearchDays(values[0]));
    },
    updateSearchDate: values => {
      dispatch(updateSearchDate(values));
    },
    updateSearchPrice: values => {
      dispatch(updateSearchPrice(values));
    }
  };
};
// Connects a React component to a Redux store.
// e.g.
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader);
