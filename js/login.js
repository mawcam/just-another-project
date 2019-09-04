const LOGIN_URL = 'https://sminnova.com/recurso_clase/api/usuario/login';

if (activeUser.getActiveUser()) window.location.href = './contacts.html';

let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', function() {
  const validator = new Validator('loginForm');
  if (validator.validate()) {
    const data = new FormData(document.getElementById('loginForm'));
    showLoading();
    performPost(LOGIN_URL, data).then(async response => {
      if (response instanceof Array){
        if (response.length > 0) activeUser.storeUser(response[0]);
        window.location.href = './contacts.html';
      } else {
        await addAlertToPage(`<strong>Error:</strong> ${response}`, 'danger');
      }
    }).catch(async error => {
      await addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
    }).then(() => hideLoading());
  }
});
