import React, { useEffect } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimelineProsInStorage } from '../../storage';
import { getLoadingStatus } from '../data/selectors';
import { getProItems } from './data/selectors';
import { updateProvinces } from './data/slice';
import Checkbox from './Checkbox';
import Header from './Header';

const id = 'collapse-pro';

// Re-Rendring:
// 1. Change checkbox state => checked/unchecked (2)
// 2. Mark the all checkboxes readonly both Pro/FeedTypes (2)
// 3. Mark the all checkboxes available both Pro/FeedTypes (2)
const Province = () => {
  const dispatch = useDispatch();
  const proItems = useSelector(getProItems);
  const isLoading = useSelector(getLoadingStatus);

  useEffect(() => {
    updateTimelineProsInStorage(proItems);
  }, [proItems]);

  const handleProCheckbox = ({ target }, slug) => {
    const proItemIndex = proItems.findIndex(pro => pro.slug === slug);
    proItems[proItemIndex].selected = payload.checked;
    dispatch(updateProvinces({ proItems }));
  }

  const ProvinceCheckBoxes = () =>
    proItems.map((pro) => {
      const checkboxProps = {
        ...pro,
        onChange: (event) => handleProCheckbox(event, pro.slug),
        checked: pro.selected,
        disabled: isLoading,
        key: `id-${pro.slug}`,
      };
      return <Checkbox {...checkboxProps} />;
    });

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Header title="Provinces" />
        <Accordion.Collapse eventKey="0">
          <Card.Body id={id}>
            <Form name="pros">
              <Form.Group controlId={`formControl-${id}`}>
                <div className="dp-checkbox">
                  <ProvinceCheckBoxes />
                </div>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
export default React.memo(Province);
