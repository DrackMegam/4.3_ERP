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

    $(form.serialNumber).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);
    $(form.description).change(defaultCheckElement);
    $(form.brand).change(defaultCheckElement);
    $(form.price).change(defaultCheckElement);
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

    $(form.serialNumber).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);
    $(form.description).change(defaultCheckElement);
    $(form.expirationDate).change(defaultCheckElement);
    $(form.price).change(defaultCheckElement);
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

    $(form.serialNumber).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);
    $(form.description).change(defaultCheckElement);
    $(form.price).change(defaultCheckElement);
}

export function validarDeleteProduct(handler) {
    let form = document.forms.formDeleteProduct;
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

        if(!valido){
            primerInvalido.focus();
        }else{
            handler(this.serialNumber.value);
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

    $(form.serialNumber).change(defaultCheckElement);
}

export function validarAddStore(handler) {
    let form = document.forms.formAddStore;
    $(form).attr('novalidate', true);
    $(form).submit(function(event) {
        let valido = true;
        let primerInvalido = null;

        // Validaciones de los campos
        if (!this.CIF.checkValidity() || !(this.CIF.value > 0)) {
            valido = false;
            showFeedBack($(this.CIF), false);
            primerInvalido = this.CIF;
        } else {
            showFeedBack($(this.CIF), true);
        }
        if (!this.name.checkValidity() || this.name.value.length == 0) {
            valido = false;
            showFeedBack($(this.name), false);
            primerInvalido = this.name;
        } else {
            showFeedBack($(this.name), true);
        }
        if (!this.address.checkValidity() || this.address.value.length == 0) {
            valido = false;
            showFeedBack($(this.address), false);
            primerInvalido = this.address;
        } else {
            showFeedBack($(this.address), true);
        }
        if (!this.coords1.checkValidity() || !(this.coords1.value > 0)) {
            valido = false;
            showFeedBack($(this.coords1), false);
            primerInvalido = this.coords1;
        } else {
            showFeedBack($(this.coords1), true);
        }
        if (!this.coords2.checkValidity() || !(this.coords2.value > 0)) {
            valido = false;
            showFeedBack($(this.coords2), false);
            primerInvalido = this.coords2;
        } else {
            showFeedBack($(this.coords2), true);
        }
        if (!this.phone.checkValidity() || !(this.phone.value > 0)) {
            valido = false;
            showFeedBack($(this.phone), false);
            primerInvalido = this.phone;
        } else {
            showFeedBack($(this.phone), true);
        }

        if(!valido){
            primerInvalido.focus();
        }else{
            handler(this.CIF.value,this.name.value,this.address.value,this.phone.value,this.coords1.value,this.coords2.value);
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

    $(form.CIF).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);
    $(form.address).change(defaultCheckElement);
    $(form.phone).change(defaultCheckElement);
    $(form.coords1).change(defaultCheckElement);
    $(form.coords2).change(defaultCheckElement);
}

export function validarAddCategory(handler) {
    let form = document.forms.formAddCategory;
    $(form).attr('novalidate', true);
    $(form).submit(function(event) {
        let valido = true;
        let primerInvalido = null;

        // Validaciones de los campos
        if (!this.title.checkValidity() || this.title.value.length == 0) {
            valido = false;
            showFeedBack($(this.title), false);
            primerInvalido = this.title;
        } else {
            showFeedBack($(this.title), true);
        }
        if (!this.description.checkValidity() || this.description.value.length == 0) {
            valido = false;
            showFeedBack($(this.description), false);
            primerInvalido = this.description;
        } else {
            showFeedBack($(this.description), true);
        }
       

        if(!valido){
            primerInvalido.focus();
        }else{
            handler(this.title.value,this.description.value);
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

    $(form.description).change(defaultCheckElement);
    $(form.name).change(defaultCheckElement);

}