import React from "react";
import PlaceHolder from "./timelinePlaceHolder";

const ResetFeedsPlaceholder = () => {
  return (
    <div className="reset-feeds">
      <PlaceHolder />;
      <PlaceHolder />
    </div>
  );
};

export const LoadingNewFeeds = () => {
  return (
    <div className="loading-feeds">
      <PlaceHolder />
    </div>
  );
};
export default ResetFeedsPlaceholder;
