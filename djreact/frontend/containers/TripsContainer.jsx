import React from 'react';

import { connect } from 'react-redux';

import { fetchTrips } from '../actions/TripsListActions';
import { TripsListCard } from '../components/TripListCard/TripsListCard';
import Headline from '../components/Headline';

class TripsApp extends React.Component {
  componentDidMount = () => {
    let { tripReducer, fetchTripsList } = this.props;
    if (!tripReducer.isLoadingTrips && tripReducer.tripList === undefined) {
      fetchTripsList();
    }
  };

  renderLoading() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>Loading...</div>
        </div>
      </div>
    );
  }

  render() {
    let { tripReducer, fetchTripsList } = this.props;

    if (tripReducer.isLoadingTrips || tripReducer.tripList === undefined) {
      return this.renderLoading();
    } else {
      return (
        <div className='col-md-9 col-sm-8'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-12'>
                <Headline text={'Sample App!'} />
              </div>
              <div className='col-sm-12'>
                <button
                  id='btn-refresh'
                  className='btn btn-primary btn-sm'
                  onClick={() => fetchTripsList()}
                >
                  Refresh
                </button>
              </div>
              <div className='col-md-12'>
                <TripsListCard tripList={tripReducer.tripList} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    tripReducer: state.tripReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchTripsList: () => {
      dispatch(fetchTrips());
    }
  };
};
// Connects a React component to a Redux store.
// e.g.
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsApp);
