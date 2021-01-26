import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const Checkbox = ({ name, slug, ico, ...rest }) => {
  const id = `id-${slug}`;
  const faIcon = ico ? (
    <FontAwesomeIcon className="margin-right-5" icon={ico} />
  ) : null;
  return (
    <div className="checkbox-item" key={id}>
      <input id={id} data-slug={slug} type="checkbox" {...rest} />
      <label title={name} htmlFor={id} className="form-check-label">
        {faIcon} {name}
      </label>
    </div>
  );
};
export default memo(Checkbox);
