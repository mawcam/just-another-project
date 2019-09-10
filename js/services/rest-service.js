const request = requestObj => (
  new Promise((res, rej) => {
    fetch(requestObj.url, {
      method: requestObj.method,
      headers: new Headers({
        //"Content-Type": "application/json",
        ...requestObj.headers,
      }),
      body: requestObj.data || {},
    }).then(response => response.json())
      .then(data => res(data))
      .catch(error => rej(error));
  })
);

const performGet = (url, headers) => request({
  method: 'GET',
  headers: headers || {},
  url,
});

const performPost = (url, data, headers) => request({
  method: 'POST',
  data,
  headers: headers || {},
  url,
});
