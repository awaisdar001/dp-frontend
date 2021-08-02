import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useStore, useSelector } from 'react-redux';
import { getPopularQuestions, getLoading } from '../../../store/popular-feeds';
import { MomentTime } from '../../common';

const PopQuestionPlaceholder = (props) => {
  const { count } = props;
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
const PopQuestion = (question) => {
  return (
    <li className="question-item">
      <div className="questions-div">
        <a href={question.abs_url}>
          <FontAwesomeIcon icon="bars" /> {question.name}
        </a>
        <small className="post-meta">
          <span>
            <a href={question.city.url}>{question.city.name}</a>
          </span>

          <span>
            <MomentTime propDateTime={question.published_at} />
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

export default () => {
  const store = useStore();
  const popQuestions = getPopularQuestions(store.getState());
  const loading = useSelector((state) => getLoading(state));

  return (
    <div id="pop-questions" className="margin-bottom-40">
      <div className="headline">
        <h2>Popular questions</h2>
      </div>
      {loading && <PopQuestionPlaceholder count={2} />}
      {!loading && popQuestions && <PopularQuestions data={popQuestions} />}
    </div>
  );
};
