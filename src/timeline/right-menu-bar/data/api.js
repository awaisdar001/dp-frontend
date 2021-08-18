import { getAuthenticatedHttpClient } from '../../../data/api';
import { camelCaseObject, normalizeBySlug, normalizeUser } from '../../../utils';


/**
 * Fetches timeline items.
 * @returns {Promise<[{}]>}
 */
const url = '/api/feeds/popular-items';

export async function getPopularItems() {
  const { data } = await getAuthenticatedHttpClient().get(url);
  return normalizeTimelinePopularItems(data);
}

const normalizeTimelinePopularItems = (data) => {
  const blogUsers = data.blog.map((blog) => normalizeUser(blog, 'created_by'));
  const questionUsers = data.question.map((question) => normalizeUser(question, 'user'));
  const updateUsers = data.updates.map((update) =>
    normalizeUser(update, 'created_by'),
  );
  const blogPro = data.blog.map((blog) => normalizeBySlug(blog.pro));
  const updatePro = data.updates.map((update) => normalizeBySlug(update.pro));

  const normalizedData = {
    items: {
      blog: data.blog.map((blog) => ({
        ...blog,
        created_by: blog.created_by.username,
        pro: blog.pro.slug,
        category: blog.category.slug,
      })),
      picture: [...data.picture],
      question: data.question.map((question) => ({
        ...question,
        category: question.category.slug,
        city: question.city.slug,
        user: question.user.username,
      })),
      updates: data.updates.map((update) => ({
        ...update,
        created_by: update.created_by.username,
        pro: update.pro.slug,
      })),
      video: [...data.video],
    },
    category: [
      ...data.blog.map((blog) => normalizeBySlug(blog.category)),
      ...data.question.map((question) => normalizeBySlug(question.category)),
    ],
    pro: [...blogPro, ...updatePro],
    users: [...blogUsers, ...questionUsers, ...updateUsers],
    city: data.question.map((question) => normalizeBySlug(question.city)),
  };

  return camelCaseObject(normalizedData);
};
