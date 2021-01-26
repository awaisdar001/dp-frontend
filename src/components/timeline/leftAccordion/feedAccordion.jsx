import { memo, useEffect } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimelineFeedTypesInLocalStorage } from '../../../storage';
import {
  getFeedItems,
  updateFeedsCheckboxState,
} from '../../../store/accordion';
import { getLoading } from '../../../store/timeline';
import Checkbox from './checkbox';
import Header from './header';

const id = 'collapse-feed-types';

const FeedAccordion = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => getLoading(state));
  const feedItems = useSelector(getFeedItems);

  useEffect(() => {
    updateTimelineFeedTypesInLocalStorage(feedItems);
  }, [feedItems]);

  const handleFeedCheckbox = (e) => {
    const target = e.target;
    const targetState = target.checked;
    const payload = { slug: target.dataset.slug, checked: targetState };
    return dispatch(updateFeedsCheckboxState(payload));
  };

  const getFeedTypeCheckboxs = () =>
    feedItems.map((feed) => {
      const checkboxProps = {
        ...feed,
        onChange: handleFeedCheckbox,
        checked: feed.selected,
        disabled: loading,
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
                <div className="dp-checkbox">{getFeedTypeCheckboxs()}</div>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default memo(FeedAccordion);
