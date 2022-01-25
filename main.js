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



