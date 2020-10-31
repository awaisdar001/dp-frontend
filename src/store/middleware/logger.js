const logger = (logType) => (store) => (next) => (action) => {
  if (logType === 'console') {
  }
  return next(action);
};
export default logger;
