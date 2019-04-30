import fetch from 'isomorphic-fetch';

export function request(url, options, success, error400, error, failure) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  options['headers'] = headers;
  return fetch(url, options)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        // for anything in 200-299 we expect our API to return a JSON response
        res.json().then(json => {
          return success(json);
        });
      } else if (res.status === 400) {
        // even for 400 we expect a JSON response with form errors
        res.json().then(json => {
          return error400(json);
        });
      } else {
        // For all other errors we are not sure if the response is JSON,
        // so we just want to display a generic error modal
        return error(res);
      }
    })
    .catch(ex => {
      return failure(ex);
    });
}
