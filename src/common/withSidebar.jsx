import React from 'react';

const withSidebar = (Component, title) => {
  return function withSidebar() {
    return (
      <aside className="sidebar">
        <div className="search-filter">
          <form action="/" method="GET">
            <div className="search-filter-title">
              <h4>{title}</h4>
            </div>
            <div className="filters-fields">
              <Component/>
            </div>
          </form>
        </div>
      </aside>
    );
  };
}

export default withSidebar;
