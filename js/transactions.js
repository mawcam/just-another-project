const MOVEMENT_PAY_URL = 'https://sminnova.com/recurso_clase/api/contacto/pago/id';

if (!Authenticator.isUserLogged()) window.location = './login.html';
const { id } = Authenticator.getActiveUser();

showLoading();

const data = new FormData();
data.append('id_usuario', id)
performPost(MOVEMENT_PAY_URL, data).then(response => {
  if (response instanceof Array) {
    document.getElementById('tableBody').innerHTML = renderTable(response);
  }
}).catch(error => {
  addAlertToPage(`<strong>Error:</strong> ${error}`, 'danger');
}).then(() => {
  hideLoading();
});

function comp(a,b) {
  const cmp = b.fecha.localeCompare(a.fecha);
  return cmp === 0 ? b.id.localeCompare(a.id) : cmp;
}

function renderTable(list) {
  const sorted = list.sort(comp);
  return sorted.map(m => `
  <tr>
      <th scope="row">${m.id}</th>
      <td>${m.nombre_contacto}</td>
      <td>${m.telefono}</td>
      <td style="text-align: right">S/. ${parseInt(m.monto, 10).toFixed(2)}</td>
      <td>${m.fecha}</td>
  </tr>
  `).join('');
}
