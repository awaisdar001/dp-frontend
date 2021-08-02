import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { getPopularBlogs } from '../../../store/popular-feeds';
import { useSelector, useStore } from 'react-redux';
import { getLoading } from '../../../store/popular-feeds/index';

const FavBlog = ({ abs_url: absURL, banner, name }) => {
  return (
    <dl className="dl-horizontal">
      <dt>
        <a href={absURL}>
          <img src={`http://destinationpak.com/${banner}`} alt={name} />
        </a>
      </dt>
      <dd>
        <p>
          <a href={absURL}>{name}</a>
        </p>
      </dd>
    </dl>
  );
};

const PopBlogPlaceholder = (props) => {
  const { count } = props;
  return (
    <>
      {Array.from({ length: count }, (_, _key) => {
        return (
          <dl className="dl-horizontal" key={`pop-blog-skeleton-${_key}`}>
            <dt>
              <Skeleton count={1} duration={2} height={60} width={60} />
            </dt>

            <dd>
              <Skeleton count={3} duration={2} />
            </dd>
          </dl>
        );
      })}
    </>
  );
};
const PopularBlogs = ({ data }) => {
  return data.map((blog, index) => {
    return <FavBlog key={`fav-blog-${index}`} {...blog} />;
  });
};
export default () => {
  const store = useStore();
  const popBlogs = getPopularBlogs(store.getState());
  const loading = useSelector((state) => getLoading(state));

  return (
    <div id="pop-blogs" className="posts margin-bottom-40">
      <div className="headline">
        <h2>Popular blogs</h2>
      </div>
      {loading && <PopBlogPlaceholder count={2} />}
      {!loading && popBlogs && <PopularBlogs data={popBlogs} />}
    </div>
  );
};
