export const getTimelineFeeds = (state) => state.timeline.feedItems;
export const getNextPage = (state) => state.timeline.metaData.nextPage;
export const getPreviousPage = (state) => state.timeline.metaData.previousPage;
export const getLoadingStatus = (state) => state.timeline.loadingStatus;
