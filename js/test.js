'use strict';
import StoreHouse from './main.js';

function testAlpha() {
    console.log("Comprobando el objeto singleton...");
    let sh = StoreHouse.getInstance();
    let instancia2 = StoreHouse.getInstance();
    console.log("¿Instancias iguales?: " + (sh === instancia2));
    console.log("");
    console.log("Nombre del almacén: "+sh.name);
    sh.name = "StoreHouse chulo";
    console.log("Nuevo nombre: "+sh.name);
}


function testAll() {
    testAlpha();
}

window.onload = testAll;

