const REGISTER_URL = 'https://sminnova.com/recurso_clase/api/usuarios/agregar';

let xhr = new XMLHttpRequest();

let btnRegister = document.getElementById('btnRegister');

const redirectToLogin = () => {
  window.location.href = 'login.html';
  hideLoading();
}

btnRegister.addEventListener('click', function() {
  const validator = new Validator('registerForm');
  if (validator.validate()) {
    const data = new FormData(document.getElementById('registerForm'));
    showLoading();
    performPost(REGISTER_URL, data).then(async response => {
      console.log({ response });
      const { estado } = response;
      await addAlertToPage(estado.text , 'success', redirectToLogin);
    }).catch(async error => {
      await addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
    }).then(() => hideLoading());
  }
});
