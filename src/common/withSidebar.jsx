import React from 'react';

const withSidebar = (Component, title) => {
  return (props) => {
    return (
      <aside className="sidebar">
        <div className="search-filter">
          <form action="/" method="GET">
            <div className="search-filter-title">
              <h4>{title}</h4>
            </div>
            <div className="filters-fields">
              <Component {...props}/>
            </div>
          </form>
        </div>
      </aside>
    );
  };
}

export default withSidebar;


export const withSidebar2 = fn => {
  let counter = 0;
  return (...args) => {
    console.log(`Counter is ${++counter}`)
    return fn(...args)
  }
}