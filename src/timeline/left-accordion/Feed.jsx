import React, { useEffect } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { updateTimelineFeedTypesInStorage } from '../../storage';
import { getFeedTypeItems } from './data/selectors';
import { getLoadingStatus } from '../data/selectors';
import { feedTypeSelectionChanged } from './data/slice';
import Checkbox from './Checkbox';
import Header from './Header';

const id = 'collapse-feed-types';

const Feed = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingStatus);
  const feedItems = useSelector(getFeedTypeItems);

  useEffect(() => {
    updateTimelineFeedTypesInStorage(feedItems);
  }, [feedItems]);

  const handleFeedCheckbox = ({ target }, slug) => {
    const index = feedItems.findIndex((feed) => feed.slug === slug);
    dispatch(feedTypeSelectionChanged({ index, selected: target.checked }));
  };

  const FeedTypeCheckBoxes = () =>
    feedItems.map((feed) => {
      const checkboxProps = {
        ...feed,
        onChange: (event) => handleFeedCheckbox(event, feed.slug),
        checked: feed.selected,
        disabled: isLoading,
        key: `id-${feed.slug}`,
      };
      return <Checkbox {...checkboxProps} />;
    });

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Header title="Feeds" />
        <Accordion.Collapse eventKey="0">
          <Card.Body id={id}>
            <Form name="feeds">
              <Form.Group controlId={`formControl-${id}`}>
                <div className="dp-checkbox">
                  <FeedTypeCheckBoxes />
                </div>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default React.memo(Feed);
