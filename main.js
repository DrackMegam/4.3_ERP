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
            // Constructor vacío.
            constructor() {
                if (!new.target) throw new MyError("ERROR EN EL SINGLETON.");
            }

            // Atributos privados.
            #name = "Casa chula";

            // Getters y Setters
            get name() {
                return this.#name;
            }
        }
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




function testAlpha() {
    console.log("Comprobando el objeto singleton...");
    let instancia1 = StoreHouse.getInstance();
    let instancia2 = StoreHouse.getInstance();
    console.log("¿Instancias iguales?: " + (instancia1 === instancia2));
    console.log("");
    console.log(StoreHouse.getInstance().getName());
}


function testAll() {
    testAlpha();
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