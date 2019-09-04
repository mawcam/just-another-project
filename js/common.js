const ALERT_DISMISS_TIME = 1500;
const activeUser = new User();
let loadingContainer = document.getElementById('loadingContainer');

const hideLoading = () => loadingContainer.style.display = 'none';

const showLoading = () => loadingContainer.style.display = 'flex';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

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
