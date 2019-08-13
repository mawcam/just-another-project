const LOGIN_URL = 'https://sminnova.com/recurso_clase/api/usuario/login';

let xhr = new XMLHttpRequest();

let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', function() {
  const data = new FormData(document.getElementById('loginForm'));
  performPost(LOGIN_URL, data).then(response => console.log(response)).catch(error => console.log(error));
});
