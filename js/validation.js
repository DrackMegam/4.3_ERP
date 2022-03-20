export function expV() {
    alert("Exportacion bien");
}

export function showFeedBack(input, valid, message) {
    let claseValida = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass("d-block");
    div.removeClass("d-none").addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(claseValida);
    if (message) {
        div.empty();
        div.append(message);
    }
}

export function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack($(this), false);
    } else {
        showFeedBack($(this), false);
    }
}

export function validarNewTechnology(handler) {
    let form = document.forms.formTechnology;
    $(form).attr('novalidate', true);
    $(form).submit(function(event) {
        let valido = true;
        let primerInvalido = null;

        // Validaciones de los campos
        if (!this.serialNumber.checkValidity() || !(this.serialNumber.value.length > 0)) {
            valido = false;
            showFeedBack($(this.serialNumber), false);
            primerInvalido = this.serialNumber;
        } else {
            showFeedBack($(this.serialNumber), true);
        }
        if (!this.name.checkValidity() || this.name.value.length == 0) {
            valido = false;
            showFeedBack($(this.name), false);
            primerInvalido = this.name;
        } else {
            showFeedBack($(this.name), true);
        }
        if (!this.description.checkValidity() || this.description.value.length == 0) {
            valido = false;
            showFeedBack($(this.description), false);
            primerInvalido = this.description;
        } else {
            showFeedBack($(this.description), true);
        }
        if (!this.price.checkValidity() || !(this.price.value.length > 0)) {
            valido = false;
            showFeedBack($(this.price), false);
            primerInvalido = this.price;
        } else {
            showFeedBack($(this.price), true);
        }
        if (!this.brand.checkValidity() || this.brand.value.length == 0) {
            valido = false;
            showFeedBack($(this.brand), false);
            primerInvalido = this.brand;
        } else {
            showFeedBack($(this.brand), true);
        }



        if(!valido){
            primerInvalido.focus();
        }else{
            // Esto llama al método "createTechnology";
            handler(this.serialNumber.value,this.name.value,this.description.value,this.price.value,this.tax.value,"...",this.brand.value,this.category.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset',(function(event){
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }))

    $(form.name).change(defaultCheckElement);
}

export function validarNewFood(handler) {
    let form = document.forms.formFood;
    $(form).attr('novalidate', true);
    $(form).submit(function(event) {
        let valido = true;
        let primerInvalido = null;

        // Validaciones de los campos
        if (!this.serialNumber.checkValidity() || !(this.serialNumber.value.length > 0)) {
            valido = false;
            showFeedBack($(this.serialNumber), false);
            primerInvalido = this.serialNumber;
        } else {
            showFeedBack($(this.serialNumber), true);
        }
        if (!this.name.checkValidity() || this.name.value.length == 0) {
            valido = false;
            showFeedBack($(this.name), false);
            primerInvalido = this.name;
        } else {
            showFeedBack($(this.name), true);
        }
        if (!this.description.checkValidity() || this.description.value.length == 0) {
            valido = false;
            showFeedBack($(this.description), false);
            primerInvalido = this.description;
        } else {
            showFeedBack($(this.description), true);
        }
        if (!this.price.checkValidity() || !(this.price.value.length > 0)) {
            valido = false;
            showFeedBack($(this.price), false);
            primerInvalido = this.price;
        } else {
            showFeedBack($(this.price), true);
        }
        if (!this.expirationDate.checkValidity() || this.expirationDate.value.length == 0) {
            valido = false;
            showFeedBack($(this.expirationDate), false);
            primerInvalido = this.expirationDate;
        } else {
            showFeedBack($(this.expirationDate), true);
        }



        if(!valido){
            primerInvalido.focus();
        }else{
            handler(this.serialNumber.value,this.name.value,this.description.value,this.price.value,this.tax.value,"...",this.expirationDate.value,this.category.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset',(function(event){
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }))

    $(form.name).change(defaultCheckElement);
}

export function validarNewClothing(handler) {
    let form = document.forms.formClothing;
    $(form).attr('novalidate', true);
    $(form).submit(function(event) {
        let valido = true;
        let primerInvalido = null;

        // Validaciones de los campos
        if (!this.serialNumber.checkValidity() || !(this.serialNumber.value.length > 0)) {
            valido = false;
            showFeedBack($(this.serialNumber), false);
            primerInvalido = this.serialNumber;
        } else {
            showFeedBack($(this.serialNumber), true);
        }
        if (!this.name.checkValidity() || this.name.value.length == 0) {
            valido = false;
            showFeedBack($(this.name), false);
            primerInvalido = this.name;
        } else {
            showFeedBack($(this.name), true);
        }
        if (!this.description.checkValidity() || this.description.value.length == 0) {
            valido = false;
            showFeedBack($(this.description), false);
            primerInvalido = this.description;
        } else {
            showFeedBack($(this.description), true);
        }
        if (!this.price.checkValidity() || !(this.price.value.length > 0)) {
            valido = false;
            showFeedBack($(this.price), false);
            primerInvalido = this.price;
        } else {
            showFeedBack($(this.price), true);
        }

        // Aquellas cosas que "obligo" a elegir no hace falta que las compruebe por motivos obvios.



        if(!valido){
            primerInvalido.focus();
        }else{
            handler(this.serialNumber.value,this.name.value,this.description.value,this.price.value,this.tax.value,"...",this.size.value,this.category.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset',(function(event){
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }))

    $(form.name).change(defaultCheckElement);
}