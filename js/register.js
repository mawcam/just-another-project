const REGISTER_URL = 'https://sminnova.com/recurso_clase/api/usuarios/agregar';
const METHOD_POST = 'POST';

let xhr = new XMLHttpRequest();

let btnRegister = document.getElementById('btnRegister');

btnRegister.addEventListener('click', function() {
  const data = new FormData(document.getElementById('registerForm'));
  xhr.open(METHOD_POST, REGISTER_URL);
  xhr.send(data);
  xhr.onreadystatechange  = function(){
		if(xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200){
        
			}
		}
	}
});
