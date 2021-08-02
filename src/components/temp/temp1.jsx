import React, { useCallback, useEffect } from 'react';
import { Accordion, Card, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateTimelineProsInLocalStorage } from '../../storage';
import { updateProCheckboxState } from '../../store/accordion';
import Header from '../timeline/timeline-card/cardHeader';

export default function Temp1() {
  console.log('Rendering temp1');

  const dispatch = useDispatch();
  const state = useSelector((state) => state.entities.accordion.proItems);
  debugger;
  const handleProCheckbox = useCallback((e) => {
    debugger;
    const target = e.target;
    const checked = target.checked;
    const slug = target.dataset.slug;
    return dispatch(updateProCheckboxState({ slug, checked }));
  });

  useEffect(() => {
    updateTimelineProsInLocalStorage(state);
  }, [state]);
  const id = 'collapse-pro';

  return (
    <div>
      <h1>Temp 1</h1>
      <Accordion defaultActiveKey="0">
        <Card>
          <Header title="Provinces" />
          <Accordion.Collapse eventKey="0">
            <Card.Body id={id}>
              <Form name="pros">
                <Form.Group controlId={`formControl-${id}`}>
                  <Col md={12}>
                    {state.map((pro) => {
                      return (
                        <div key={`div-${pro.slug}`}>
                          <label
                            key={pro.slug + 'label'}
                            className="form-check-label"
                          >
                            {pro.name}
                          </label>
                          <input
                            key={pro.slug + 'in'}
                            name={pro.name}
                            type="checkbox"
                            data-slug={pro.slug}
                            checked={pro.selected}
                            onChange={handleProCheckbox}
                          />
                          <br />
                        </div>
                      );
                    })}
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
