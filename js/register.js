const REGISTER_URL = 'https://sminnova.com/recurso_clase/api/usuarios/agregar';

let btnRegister = document.getElementById('btnRegister');
btnRegister.addEventListener('click', function() {
  const validator = new Validator('registerForm');
  if (validator.validate()) {
    const data = new FormData(document.getElementById('registerForm'));
    showLoading();
    performPost(REGISTER_URL, data).then(response => {
      addAlertToPage(response , 'success', () => window.location = 'login.html');
    }).catch(error => {
      addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
    }).then(() => hideLoading());
  }
});
