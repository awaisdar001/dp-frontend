import React from 'react';

function DpCheckbox({ label, selected, ...props }) {
  const id = `id-${props.value}`
  const isSelected = !!selected;

  return (
    <div className="checkbox-item">
      <input id={id} type="checkbox" checked={isSelected} {...props} />
      <label htmlFor={id}>
        <span>{label} </span>
      </label>
    </div>
  );
}

export default React.memo(DpCheckbox);
