import { Pagination } from 'react-bootstrap';

const TimelinePagination = ({ next, previous, nextPageElement }) => {
  return (
    <Pagination className="invisible">
      {previous && previous.url && (
        <li className="page-item">
          <a
            className="page-link"
            id="timeline-previous-link"
            href={previous.url}
          >
            <span aria-hidden="true">‹</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
      )}
      {next && next.url && (
        <li className="page-item">
          <a
            className="page-link"
            id="timeline-next-link"
            href={next.url}
            ref={nextPageElement}
          >
            <span aria-hidden="true">›</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      )}
    </Pagination>
  );
};

export default TimelinePagination;
