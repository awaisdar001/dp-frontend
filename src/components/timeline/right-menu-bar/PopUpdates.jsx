import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { MomentTime } from '../../common';
import { useStore, useSelector } from 'react-redux';
import { getPopularUpdates } from '../../../store/popular-feeds';
import { getLoading } from '../../../store/popular-feeds/index';

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
const PopUpdate = ({
  abs_url: absURL,
  created_by: createdBy,
  name,
  pro,
  created_at: createdAt,
}) => {
  return (
    <li>
      <h3>
        <a href={absURL}>{name}</a>
      </h3>
      <small>
        <a href={pro.abs_url}>{pro.name}</a>
      </small>

      <small>
        <a href={absURL}>
          <MomentTime propDateTime={createdAt} />
        </a>
      </small>

      <small>
        <a href={createdBy.profile_url}>{createdBy.full_name}</a>
      </small>
    </li>
  );
};
const PopularUpdates = ({ data }) => {
  return data.map((update, index) => {
    return <PopUpdate key={`fav-updates-${index}`} {...update} />;
  });
};

export default () => {
  const store = useStore();
  const popUpdates = getPopularUpdates(store.getState());
  const loading = useSelector((state) => getLoading(state));

  return (
    <div id="pop-updates" className=" margin-bottom-40">
      <div className="headline">
        <h2>Popular updates</h2>
      </div>

      {loading && <PopUpdatesPlaceholder count={2} />}
      <ul className="list-unstyled dp-updates">
        {!loading && popUpdates && <PopularUpdates data={popUpdates} />}
      </ul>
    </div>
  );
};
