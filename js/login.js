const LOGIN_URL = 'https://sminnova.com/recurso_clase/api/usuario/login';

let xhr = new XMLHttpRequest();

let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', function() {
  const validator = new Validator('loginForm');
  if (validator.validate()) {
    const data = new FormData(document.getElementById('loginForm'));
    showLoading();
    performPost(LOGIN_URL, data).then(response => {
      console.log(response);
      addAlertToPage('Ha iniciado sesión', 'success', function() {
        //TODO: redirect to add contacts
        hideLoading();
      });
    }).catch(error => {
      addAlertToPage('<strong>Error:</strong> Credenciales incorrectas', 'danger', () => hideLoading());
    });
  }
});
