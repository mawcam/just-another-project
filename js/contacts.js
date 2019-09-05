const CONTACTS_URL = 'https://sminnova.com/recurso_clase/api/contacto/listado';
const ADD_CONTACT_URL = 'https://sminnova.com/recurso_clase/api/contacto/agregar';

let contacts = [];

showLoading();

if (!activeUser.getActiveUser()) window.location = './login.html';

const data = new FormData();
data.append('id', activeUser.getActiveUser().id);
performPost(CONTACTS_URL, data).then(response => {
  if (response instanceof Array) {
    contacts = response.filter(e => e.nombres && e.apellidos);
  }
}).catch(async error => {
  await addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
}).then(() => {
  hideLoading();
  checkContactsCardState();
});

const btnAddContact = document.getElementById('btnAddContact');
btnAddContact.addEventListener('click', function() {
  const validator = new Validator('addContactForm');
  if (validator.validate()) {
    const data = new FormData(document.getElementById('addContactForm'));
    data.append('id_usuario', activeUser.getActiveUser().id);
    showLoading();
    performPost(ADD_CONTACT_URL, data).then(async response => {
      addContactToList(Object.fromEntries(data));
      await addAlertToPage(response, 'success');
      clearForm('addContactForm');
    }).catch(async error => {
      await addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
    }).then(() => hideLoading());
  }
});

document.getElementById('btnSignOut').addEventListener('click', function() {
  activeUser.signOut();
  window.location = './login.html';
});

function initializeSearchContacts() {
  const searchContact = document.getElementById('searchContact');
  searchContact.addEventListener('input', function() {
    const search = this.value;
    const results = contacts.filter(c => `${c.nombres} ${c.apellidos}`.toLowerCase().includes(search.toLowerCase()));
    renderContactList(results);
  });
}

function checkContactsCardState() {
  if (contacts.length > 0){
    document.getElementById('displayContacts').innerHTML = renderFilledState();
    initializeSearchContacts();
    renderContactList(contacts);
  } else {
    document.getElementById('displayContacts').innerHTML = renderEmptyState();
  }
}

function renderContactList(list) {
  const listUI = document.getElementById('contactsContainer');
  listUI.innerHTML = '';
  list.forEach(data => {
    listUI.innerHTML += `
    <li class="list-group-item">
      ${data.nombres} ${data.apellidos}
      <a
        href="javascript:showContactDetail('${data.nombres}','${data.apellidos}','${data.telefono}');"
        class="pull-right btnDetail"
        data-toggle="modal"
        data-target="#contactDetailModal"
      >
      Ver más
      </a>
    </li>
    `;
  });
}

function addContactToList(data) {
  contacts = [data, ...contacts];
  checkContactsCardState();
  renderContactList(contacts);
}

function showContactDetail(firstnames,lastnames,phone) {
  const content = document.getElementById('modalBody');
  content.innerHTML = `
    <h6>Nombres:</h6><p>${firstnames}</p>
    <h6>Apellidos:</h6><p>${lastnames}</p>
    <h6>Teléfono:</h6><p>${phone}</p>
  `;
  document.getElementById('contactDetailModal').modal('show');
}

function renderEmptyState() {
  return `
    <div id="emptyState" class="card-body text-center">
      <h2>Aún no tiene contactos</h2>
    </div>
  `;
}

function renderFilledState() {
  return `
    <div id="fillState" class="card-body">
        <h4 class="header-title">Contactos</h4>
        <div id="searchContainer" class="search-box mb-3" style="width: 100%;" onsubmit="return false;">
            <form style="width: 100%;">
                <input id="searchContact" type="text" placeholder="Buscar..." style="width: 100%;">
                <i class="ti-search"></i>
            </form>
        </div>
        <ul id="contactsContainer" class="list-group"></ul>
    </div>
  `;
}
