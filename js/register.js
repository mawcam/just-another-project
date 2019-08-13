const REGISTER_URL = 'https://sminnova.com/recurso_clase/api/usuarios/agregar';

let xhr = new XMLHttpRequest();

let btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener('click', function() {
  const data = new FormData(document.getElementById('registerForm'));
  showLoading();
  performPost(REGISTER_URL, data).then(response => {
    console.log({ response });
    window.location.href = 'login.html';
  }).catch(error => {
    console.log({ error });
    window.location.href = 'login.html';
  }).then(() => {
    hideLoading();
  });
});
