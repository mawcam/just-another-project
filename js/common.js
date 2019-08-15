let loadingContainer = document.getElementById('loadingContainer');

const hideLoading = () => loadingContainer.style.display = 'none';

const showLoading = () => loadingContainer.style.display = 'flex';

function Validator(formId) {
  this.fields = Array.from(document.querySelectorAll(`#${formId} input`));
  this.messages = [];
  this.validate = function () {
    this.fields.forEach(f => {
      if (!f.value) this.messages.push(`Debe ingresa el campo ${f.name} para iniciar sesión`);
    });
    if (this.messages.length > 0) {
      console.log({ messages: this.messages });
      return false;
    }
    return true;
  }
}
