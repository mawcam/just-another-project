const LOGIN_URL = 'https://sminnova.com/recurso_clase/api/usuario/login';

let xhr = new XMLHttpRequest();

let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', function() {
  const validator = new Validator('loginForm');
  if (validator.validate()) {
    const data = new FormData(document.getElementById('loginForm'));
    showLoading();
    performPost(LOGIN_URL, data).then(async response => {
      if (response instanceof Array){
        await addAlertToPage('Ha iniciado sesión', 'success', function() {
          //TODO: redirect to add contacts
        });
      } else {
        await addAlertToPage(`<strong>Error:</strong> ${response}`, 'danger');
      }
    }).catch(async error => {
      await addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
    }).then(() => hideLoading());
  }
});
