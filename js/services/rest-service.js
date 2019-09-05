const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

const performGet = url => {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open(METHOD_GET, url);
    xhr.send();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.response);
          res(response);
        } else {
          const errorMessage = 'Algo salió mal';
          rej(errorMessage);
        }
      }
    }
  });
};

const performPost = (url, data) => {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open(METHOD_POST, url);
    xhr.send(data);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          console.log({ postResponse: xhr.response});
          try {
            const response = JSON.parse(xhr.response);
            res(response);
          } catch (error) {
            rej(error.message);
          }
        } else {
          const errorMessage = 'Algo salió mal';
          rej(errorMessage);
        }
      }
    }
  });
};
