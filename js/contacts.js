const CONTACTS_URL = 'https://sminnova.com/recurso_clase/api/contacto/listado';
const ADD_CONTACT_URL = 'https://sminnova.com/recurso_clase/api/contacto/agregar';

const user = getCurrentUser();

let contacts = [];

if (!user) window.location.href = './login.html';

/*
performPost(CONTACTS_URL, { id: user.id }).then(response => {
  //TODO: decirle al profe que no funciona el endpoint
  console.log({ response });
});
*/

checkContactsCardState();

const btnAddContact = document.getElementById('btnAddContact');
btnAddContact.addEventListener('click', function() {
  const validator = new Validator('addContactForm');
  if (validator.validate()) {
    const data = new FormData(document.getElementById('addContactForm'));
    data.append('id_usuario', user.id);
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
  removeCurrentUser();
  window.location.href = './login.html';
});

const searchContact = document.getElementById('searchContact');
searchContact.addEventListener('input', function(e) {
  const search = this.value;
  const results = contacts.filter(c => `${c.nombres} ${c.apellidos}`.toLowerCase().includes(search.toLowerCase()));
  renderContactList(results);
});

function checkContactsCardState() {
  if (contacts.length > 0){
    document.getElementById('fillState').style.display = 'block';
    document.getElementById('emptyState').style.display = 'none';
  } else {
    document.getElementById('fillState').style.display = 'none';
    document.getElementById('emptyState').style.display = 'block';
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
  contacts = contacts.concat(data);
  checkContactsCardState();
  renderContactList(contacts);
}

function showContactDetail(firstnames,lastnames,phone) {
  console.log("doing this");
  const content = document.getElementById('modalBody');
  content.innerHTML = `
    <h6>Nombres:</h6><p>${firstnames}</p>
    <h6>Apellidos:</h6><p>${lastnames}</p>
    <h6>Teléfono:</h6><p>${phone}</p>
  `;
  document.getElementById('contactDetailModal').modal('show');
}
