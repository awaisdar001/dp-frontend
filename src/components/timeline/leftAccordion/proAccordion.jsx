import { memo, useCallback, useEffect } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimelineProsInLocalStorage } from '../../../storage';
import { getProsItems } from '../../../store/accordion';
import { updateProCheckboxState } from '../../../store/accordion/index';
import { getLoading } from '../../../store/timeline';
import Checkbox from './checkbox';
import Header from './header';

const id = 'collapse-pro';

// Re-Rendring:
// 1. Change checkbox state => checked/unchecked (2)
// 2. Mark the all checkboxes readonly both Pro/FeedTypes (2)
// 3. Mark the all checkboxes available both Pro/FeedTypes (2)
const ProAccordion = () => {
  const dispatch = useDispatch();
  const proItems = useSelector(getProsItems);
  const loading = useSelector((state) => getLoading(state));

  useEffect(() => {
    updateTimelineProsInLocalStorage(proItems);
  }, [proItems]);

  const handleProCheckbox = useCallback(
    (e) => {
      const checked = e.target.checked;
      const slug = e.target.dataset.slug;
      return dispatch(updateProCheckboxState({ slug, checked }));
    },
    [dispatch]
  );

  const getProCheckboxes = () =>
    proItems.map((pro) => {
      const checkboxProps = {
        ...pro,
        onChange: handleProCheckbox,
        checked: pro.selected,
        disabled: loading,
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
                <div className="dp-checkbox">{getProCheckboxes()}</div>
              </Form.Group>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
export default memo(ProAccordion);
