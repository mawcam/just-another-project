const CONTACTS_URL = 'https://sminnova.com/recurso_clase/api/contacto/listado';

performGet(CONTACTS_URL).then(response => {
  console.log({ response });
});
