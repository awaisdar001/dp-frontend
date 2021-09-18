import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

import { MomentTime } from '../../common';
import { useModel } from '../../generic/model-store';
import { getLoading, getPopularQuestions } from './data/selectors';

const PopQuestionPlaceholder = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, _key) => {
        return (
          <ul
            key={`pop-question-skeleton-${_key}`}
            className="pop-questions-list list-unstyled"
          >
            <li className="question-item">
              <Skeleton count={3} />
            </li>
          </ul>
        );
      })}
    </>
  );
};

const PopQuestion = ({ absUrl, name, city, publishedAt }) => {
  const questionCity = useModel('city', city);
  return (
    <li className="question-item">
      <div className="questions-div">
        <a href={absUrl}>
          <FontAwesomeIcon icon="bars" /> {name}
        </a>
        <small className="post-meta">
          <span>
            <a href={questionCity.absUrl}>{questionCity.name}</a>
          </span>
          <span>
            <MomentTime propDateTime={publishedAt} />
          </span>
        </small>
      </div>
    </li>
  );
};

const PopularQuestions = ({ data }) => {
  return (
    <ul className="pop-questions-list list-unstyled">
      {data.map((question, index) => {
        return <PopQuestion key={`pop-question-${index}`} {...question} />;
      })}
    </ul>
  );
};

export default function PopQuestions() {
  const popQuestions = useSelector(getPopularQuestions);
  const isLoading = useSelector(getLoading);

  return (
    <div id="pop-questions" className="margin-bottom-40">
      <div className="headline">
        <h2>Popular questions</h2>
      </div>
      {isLoading ? (
        <PopQuestionPlaceholder count={2} />
      ) : (
        popQuestions && <PopularQuestions data={popQuestions} />
      )}
    </div>
  );
};
