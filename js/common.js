const ALERT_DISMISS_TIME = 1500;
let loadingContainer = document.getElementById('loadingContainer');

const hideLoading = () => loadingContainer.style.display = 'none';

const showLoading = () => loadingContainer.style.display = 'flex';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const getCurrentUser = () => {
  let currentUser = localStorage.currentUser;
  return currentUser ? JSON.parse(currentUser) : null;
}

const removeCurrentUser = () => {
  localStorage.currentUser = null;
}

function Validator(formId) {
  this.fields = Array.from(document.querySelectorAll(`#${formId} input`));
  this.messages = [];
  this.validate = function () {
    this.fields.forEach(f => {
      if (!f.value) this.messages.push(`Debe ingresa el campo <strong>${f.name}</strong> para iniciar sesión`);
    });
    if (this.messages.length > 0) {
      addAlertToPage(this.messages.join('<br>'), 'danger');
      return false;
    }
    return true;
  }
}

const addAlertToPage = (message, color, callback, time = ALERT_DISMISS_TIME) => {
  const alert = `
    <div id="currentAlert" class="alert alert-${color} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span class="fa fa-times"></span>
      </button>
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
