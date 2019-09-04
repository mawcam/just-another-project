class Validator {
    constructor(formId) {
    this.fields = Array.from(document.querySelectorAll(`#${formId} input`));
    this.messages = [];
    }

    validate() {
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