import React from 'react';
import PlaceHolder from './TimelinePlaceHolder';

const FeedsPlaceholder = () => (
  <div className="reset-feeds">
    <PlaceHolder />;
    <PlaceHolder />
  </div>
);

export const LoadingNewFeeds = () => (
  <div className="loading-feeds">
    <PlaceHolder />
  </div>
);
export default FeedsPlaceholder;
