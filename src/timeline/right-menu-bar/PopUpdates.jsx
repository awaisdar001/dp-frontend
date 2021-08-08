import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { MomentTime } from '../../components/common';
import { useSelector } from 'react-redux';
import { getLoading, getPopularUpdates } from './data/selectors';

const PopUpdatesPlaceholder = (props) => {
  const { count } = props;
  return (
    <ul className="list-unstyled dp-updates">
      {Array.from({ length: count }, (_, _key) => {
        return (
          <li key={`pop-updates-skeleton-${_key}`}>
            <Skeleton count={3} />
          </li>
        );
      })}
    </ul>
  );
};
const PopUpdate = ({ absUrl, createdBy, name, pro, createdAt, ...rest }) => {
  return (
    <li>
      <h3>
        <a href={absUrl}>{name}</a>
      </h3>
      <small>
        <a href={pro.absUrl}>{pro.name}</a>
      </small>

      <small>
        <a href={absUrl}>
          <MomentTime propDateTime={createdAt} />
        </a>
      </small>

      <small>
        <a href={createdBy.profileUrl}>{createdBy.fullName}</a>
      </small>
    </li>
  );
};
const PopularUpdates = ({ data }) => {
  return (
    <ul className="list-unstyled dp-updates">
      {data.map((update, index) => (
        <PopUpdate key={`fav-updates-${index}`} {...update} />
      ))}
    </ul>
  );
};

export default () => {
  const popUpdates = useSelector(getPopularUpdates);
  const isLoading = useSelector(getLoading);

  return (
    <div id="pop-updates" className=" margin-bottom-40">
      <div className="headline">
        <h2>Popular updates</h2>
      </div>
      {isLoading ? (
        <PopUpdatesPlaceholder count={2} />
      ) : (
        popUpdates && <PopularUpdates data={popUpdates} />
      )}
    </div>
  );
};
