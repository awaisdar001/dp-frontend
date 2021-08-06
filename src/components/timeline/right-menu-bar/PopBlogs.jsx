import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {useSelector} from 'react-redux';
import {getLoading, getPopularBlogs} from "./data/selectors";

const FavBlog = ({absURL, banner, name}) => {
  return (
    <dl className="dl-horizontal">
      <dt>
        <a href={absURL}>
          <img src={`${process.env.REACT_APP_BASE_URL}${banner}`} alt={name}/>
        </a>
      </dt>
      <dd>
        <p><a href={absURL}>{name}</a></p>
      </dd>
    </dl>
  );
};

const PopBlogPlaceholder = ({count}) => {
  return (
    <>
      {Array.from({length: count}, (_, _key) => {
        return (
          <dl className="dl-horizontal" key={`pop-blog-skeleton-${_key}`}>
            <dt>
              <Skeleton count={1} duration={2} height={60} width={60}/>
            </dt>

            <dd>
              <Skeleton count={3} duration={2}/>
            </dd>
          </dl>
        );
      })}
    </>
  );
};
const PopularBlogs = ({data}) => {
  return data.map((blog, index) => {
    return <FavBlog key={`fav-blog-${index}`} {...blog} />;
  });
};
export default () => {
  const popBlogs = useSelector(getPopularBlogs);
  const loading = useSelector(getLoading);

  return (
    <div id="pop-blogs" className="posts margin-bottom-40">
      <div className="headline">
        <h2>Popular blogs</h2>
      </div>
      {loading ? <PopBlogPlaceholder count={2}/> : popBlogs && <PopularBlogs data={popBlogs}/>}
    </div>
  );
};
