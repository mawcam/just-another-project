const LOGIN_URL = 'https://sminnova.com/recurso_clase/api/usuario/login';

if (Authenticator.isUserLogged()) window.location = './contacts.html';

let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', function() {
  const validator = new Validator('loginForm');
  if (validator.validate()) {
    const data = new FormData(document.getElementById('loginForm'));
    showLoading();
    performPost(LOGIN_URL, data).then(response => {
      if (response instanceof Array){
        if (response.length > 0) Authenticator.signIn(response[0]);
        window.location = './contacts.html';
      } else {
        addAlertToPage(`<strong>Error:</strong> ${response}`, 'danger');
      }
    }).catch(error => {
      addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
    }).then(() => hideLoading());
  }
});
