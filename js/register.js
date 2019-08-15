const REGISTER_URL = 'https://sminnova.com/recurso_clase/api/usuarios/agregar';

let xhr = new XMLHttpRequest();

let btnRegister = document.getElementById('btnRegister');

const redirectToLogin = () => {
  window.location.href = 'login.html';
  hideLoading();
}

btnRegister.addEventListener('click', function() {
  const data = new FormData(document.getElementById('registerForm'));
  showLoading();
  performPost(REGISTER_URL, data).then(response => {
    console.log({ response });
    const { estado } = response;
    addAlertToPage(estado.text , 'success', redirectToLogin);
  }).catch(error => {
    console.log({ error });
    addAlertToPage(error , 'danger', redirectToLogin);
  });
});
