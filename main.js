"use strict";

// Función para comprobar que no ha explotado nada aún.
function msg(message) {
    document.getElementById("msg").innerHTML += message;
}

// git add .
// git tag 0.1 -m "..."
// git commit -m "..."
// git push origin master
// git push origin 0.1


function MyError(n) {
    this.msg = "||> ERROR - " + n;
}
// Heredo los atributos de la clase Error.
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;

/* ++++++++++++++++++++++++++++++++++++++++ Definición de objeto Singleton ++++++++++++++++++++++++++++++++++++++++ */

let StoreHouse = (function() {
    let instantiated; // Inicializo Singleton
    function init() {
        // Defino la clase de StoreHouse.
        class StoreHouse {
            // Atributos privados.
            #name = "Casa chula";
            #products = [];
            #categories = [];
            #shops = [];
            #stock = [];
            // Categoría creada por defecto. Por si algún producto o tienda no tiene otro lugar.
            #defaultCategory = [];
            #defaultShop = [];


            // Constructor vacío.
            constructor() {
                if (!new.target) throw new MyError("ERROR EN EL SINGLETON.");
            }

            

            // Getters y Setters
            get name() {
                return this.#name;
            }
            set name(newName){
                // Controlo la excepción del nombre.
                if(newName.length<=0) throw new MyError("El nombre no puede estar vacío.");
                this.#name = newName;
            }
            get categories(){
                // ... Iterador
            }
            get shops(){
                // ... Iterador
            }

            addCategory(){
                // ...
            }
            removeCategory(){
                // Elimina categoría y sus productos pasan a default.
            }
            addProduct(){
                // Añade un producto asociado a una categoría.
            }
            removeProduct(){
                // Elimina un producto y TODAS sus relacciones con otros objetos.
            }
            addProductInShop(){
                // Añade Product en Shop, con un nº de uds.
            }
            addQuantityProductInShop(){
                // Suma nº a un producto de una tienda, ya existente dicho producto.
            }
            getCategoryProducts(){
                // Dada una categoría, devuelve sus productos en modo iterador.
            }
            addShop(){
                // ...
            }
            removeShop(){
                // Elimina Shop y sus cosas a default.
            }
            getShopProducts(){
                // Iterador de todos los productos de una tienda.
            }


        }


        let sh = new StoreHouse(); //Devolvemos el objeto ShoppingCart para que sea una instancia única.
		Object.freeze(sh);
		return sh;
    }
    return {
        // Devolver el objeto
        getInstance: function() {
            // Si no existe, la inicia, si existe, la devuelve.
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    }
})();


/* ++++++++++++++++++++++++++++++++++++++++ Definición de objetos ++++++++++++++++++++++++++++++++++++++++ */
class Category {
    #title;
    #description;
    constructor(title, description){
        this.#title = title;
        this.#description = description;
    }

    // Getters y setters
    get title(){
        return this.#title;
    }

    set title(newTitle){
        if(newTitle.length<=0) throw new MyError("El título de la categoría no puede estar vacío.");
        this.#title = newTitle;
    }

    get description(){
        return this.#description;
    }

    set description(newDescription){
        if(newDescription.length<=0) throw new MyError("La descripción de la categoría no puede estar vacía.");
        this.#description = newDescription;
    }

    // Funciones del objeto.
    toString() {
        return this.#title + " - " + this.#description;
    }

}

class Coords {
    #latitude;
    #longitude;
    constructor(latitude, longitude){
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    // Getters y setters
    get latitude(){
        return this.#latitude;
    }

    set latitude(newlatitude){
        this.#latitude = newlatitude;
    }

    get longitude(){
        return this.#longitude;
    }

    set longitude(newlongitude){
        this.#longitude = newlongitude;
    }

    // Funciones del objeto.
    toString() {
        return this.#latitude + " - " + this.#longitude;
    }

}

class Store {
    #CIF;
    #name;
    #address;
    #phone;
    #coords;
    constructor(CIF, name,address,phone,coords){
        this.#CIF = CIF;
        this.#name = name;
        this.#address = address;
        this.#phone = phone;
        this.#coords = coords;
    }

    // Getters y setters
    get CIF(){
        return this.#CIF;
    }

    set CIF(newCIF){
        this.#CIF = newCIF;
    }

    get name(){
        return this.#name;
    }

    set name(newname){
        this.#name = newname;
    }

    get address(){
        return this.#address;
    }

    set address(newAddress){
        this.#address = newAddress;
    }
    get phone(){
        return this.#phone;
    }

    set phone(newPhone){
        this.#phone = newPhone;
    }

    get coords(){
        return this.#coords;
    }

    set coords(newCoords){
        this.#coords = newCoords;
    }

    // Funciones del objeto.
    toString() {
        return this.#CIF + " - " + this.#name+ " - " + this.#address + " - " + this.#phone + " - " + this.#coords ;
    }

}

function testStoreHouseAlpha() {
    console.log("Comprobando el objeto singleton...");
    let sh = StoreHouse.getInstance();
    let instancia2 = StoreHouse.getInstance();
    console.log("¿Instancias iguales?: " + (sh === instancia2));
    console.log("");
    console.log("Nombre del almacén: "+sh.name);
    sh.name = "StoreHouse chulo";
    console.log("Nuevo nombre: "+sh.name);
}

function testCategoryAlpha(){
    console.log("Comprobando el objeto Category...");
    let ctg = new Category("Cucharas","Redondas y perfectas para sopa.");
    console.log(ctg.toString());
    console.log("Cambiando elementos del objeto...");
    ctg.title = "Tenecuchachillo";
    ctg.description = "Omnipotente.";
    console.log(ctg.toString());
}


function testAll() {
    // testAlpha();
    // testCategoryAlpha();
}

window.onload = testAll;



/*
    TODO
        - StoreHouse
            - Objeto de estilo Singleton
            - POR QUE POLLAS ME FORMATÉA EL #
            - Category
                - Almacena objetos Product
                    - Subclases heredados de Product
            - Coords
            - Store
*/