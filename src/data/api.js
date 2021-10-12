import axios from "axios";


export const getAuthenticatedHttpClient = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
  instance.defaults.headers.common['Authorization'] = `Basic YWRtaW46YXJiaXNvZnQx`;  // todo
  instance.defaults.headers.common['Content-Type'] = 'application/json'
  return instance;
}
