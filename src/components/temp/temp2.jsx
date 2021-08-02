import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeedsCheckboxState } from '../../store/accordion';

export default function Temp1() {
  console.log('Rendering temp2');
  const dispatch = useDispatch();
  const state = useSelector((state) => state.entities.accordion.feedTypesItems);
  const handleProCheckbox = useCallback((e) => {
    const target = e.target;
    const checked = target.checked;
    const slug = target.dataset.slug;
    return dispatch(updateFeedsCheckboxState({ slug, checked }));
  });
  return (
    <div>
      <h1>Temp 2</h1>
      {state.map((pro) => {
        return (
          <div key={`div-${pro.slug}`}>
            <label key={pro.slug + 'label'} className="form-check-label">
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
    </div>
  );
}
