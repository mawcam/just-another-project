const CONTACTS_URL = 'https://sminnova.com/recurso_clase/api/contacto/listado';

if (!Authenticator.isUserLogged()) window.location = './login.html';
const { id } = Authenticator.getActiveUser();

let selectedContact = {};

showLoading();

const data = new FormData();
data.append('id', id);
performPost(CONTACTS_URL, data).then(response => {
  if (response instanceof Array) {
    const contacts = response.filter(e => e.nombres && e.apellidos);
    initializeSearchContacts(contacts);
    renderContactList(contacts);
  }
}).catch(error => {
  addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
}).then(() => {
  hideLoading();
});

function renderRow(obj) {
  return `<a href="JavaScript:void(0);" class="list-group-item list-group-item-action" contact-id="${obj.id}">${obj.nombres} ${obj.apellidos}</a>`;
}

function initializeSearchContacts(contacts) {
  const searchContact = document.getElementById('searchContact');
  searchContact.addEventListener('input', function() {
    const search = this.value;
    const results = contacts.filter(c => `${c.nombres} ${c.apellidos}`.toLowerCase().includes(search.toLowerCase()));
    renderContactList(results, search);
  });
}

function renderContactList(list, query = '') {
  const content = list.reduce((acc, val) => `${acc}${renderRow(val)}`, '');
  const listUI = document.getElementById('contactsList');
  listUI.innerHTML = '';
  if (list.length === 0) listUI = `No hay resultados para "${query}".`;
  else {
    listUI.innerHTML = content;
    const liElements = Array.from(document.getElementsByClassName('list-group-item-action'));
    liElements.forEach(li => li.addEventListener('click', function(e) {
      const contactId = li.getAttribute('contact-id');
      const contact = list.find(c => c.id === contactId);
      selectedContact = { ...contact };
      liElements.forEach(li => li.classList.remove('active'));
      li.classList.add('active');
    }));
  }
}

const btnSelect = document.getElementById('btnSelect');
btnSelect.addEventListener('click', function() {
  const { nombres, apellidos } = selectedContact;
  document.getElementById('contact').value = `${nombres} ${apellidos}`;
});

const btnPay = document.getElementById('btnPay');
btnPay.addEventListener('click', function() {
  const { nombres, apellidos } = selectedContact;
  const data = new FormData(document.getElementById('paymentForm'));
  data.append('id', id);
  data.append('contacto_id', selectedContact.id);
  showLoading();
  timeout(2000).then(() => {
    hideLoading();
    addAlertToPage(`Transferencia realizada a <b>${nombres} ${apellidos}</b> con éxito.`, 'success');
  });
});
