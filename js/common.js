const ALERT_DISMISS_TIME = 1500;
let loadingContainer = document.getElementById('loadingContainer');

const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const hideLoading = () => loadingContainer.style.display = 'none';

const showLoading = () => loadingContainer.style.display = 'flex';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const addAlertToPage = (message, color, callback, time = ALERT_DISMISS_TIME) => {
  const alert = `
    <div id="currentAlert" class="alert alert-${color} alert-dismissible fade show" role="alert">
      ${message}
    </div>
  `;
  document.getElementById('alertContainer').innerHTML = alert;
  timeout(time).then(() => {
    document.getElementById('currentAlert').classList.remove('show');
    document.getElementById('currentAlert').classList.add('hide');
    if (callback) callback();
  });
};

const clearForm = formId => {
  const fields = Array.from(document.querySelectorAll(`#${formId} input`));
  fields.forEach(f => f.value = '');
};

const onlyNumbers = value => value.replace(/[^(\d|.)]/g, '').replace(/(\..*)\./g, '$1');

const signOutElement = document.getElementById('btnSignOut');
if (signOutElement) {
  signOutElement.addEventListener('click', function() {
    Authenticator.signOut();
    window.location = './login.html';
  });
}
