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
            #name = "Almacén chulo";
            #products = []; // Productos almacenados
            #categories = [];   // Categorías registradas junto los productos
            #shops = [];    // Tiendas a las que suministra/guarda productos.
            #stock = [];    // Stock de productos.
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

            addCategory(newCategory){
                if(!(newCategory instanceof Category)) throw new MyError("Este objeto no es una cateogría.");
                return (this.#categories.push(newCategory));

            }
            removeCategory(){
                /*
                    En esta solución propuesta, las categorías son objetos independientes.
                    Son los productos los que tienen asignado una categoría, no las categorías
                    quienes guardan productos.
                */
                if(!(newCategory instanceof Category)) throw new MyError("Este objeto no es una cateogría.");
                
            }
            showCategories(){
                let string = "";
                this.#categories.forEach(category => {
                    string= string + " - " + category.title;
                });
                return string;
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

class Product {
    #serialNumber;
    #name;
    #description;
    #price;
    #tax;
    #images;
    #category;  // A qué categoría pertenece.
    #shops; // En qué tiendas se encuentran.
    constructor(serialNumber, name,description,price,tax,images){
        this.#serialNumber = serialNumber;
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#tax = tax;
        this.#images = images;
    }

    // Getters y setters
    get serialNumber(){
        return this.#serialNumber;
    }

    set serialNumber(newserialNumber){
        this.#serialNumber = newserialNumber;
    }

    get name(){
        return this.#name;
    }

    set name(newname){
        this.#name = newname;
    }

    get description(){
        return this.#description;
    }

    set description(newdescription){
        this.#description = newdescription;
    }
    get price(){
        return this.#price;
    }

    set price(newprice){
        this.#price = newprice;
    }

    get tax(){
        return this.#tax;
    }

    set tax(newtax){
        this.#tax = newtax;
    }

    get images(){
        return this.#images;
    }

    set images(newImages){
        this.#images = newImages;
    }

    get category(){
        return this.#category;
    }

    set category(newcategory){
        this.#category = newcategory;
    }

    get shops(){
        return this.#shops;
    }

    set shops(newshops){
        this.#shops = newshops;
    }

    // Funciones del objeto.
    toString() {
        return this.#serialNumber + " - " + this.#name+ " - " + this.#description + " - " + this.#price + " - " + this.#tax + " - " + this.#images;
    }

}

/* ++++++++++++++++++++++++++++++++++++++++ Subproductos ++++++++++++++++++++++++++++++++++++++++ */

class Technology extends Product {
    #brand;
    constructor(serialNumber, name,description,price,tax,images,brand){
        super(serialNumber, name,description,price,tax,images);
        this.#brand = brand;
    }

    get brand(){
        return this.#brand;
    }

    set brand(newbrand){
        this.#brand = newbrand;
    }

    // Funciones del objeto.
    toString() {
        // Los atributos heredados sin "#", pues los pillo del "get" heredado de Product.
        return this.serialNumber + " - " + this.name+ " - " + this.description + " - " + this.price + " - " + this.tax + " - " + this.images + " - " + this.#brand;
    }

}

class Food extends Product {
    #expirationDate;
    constructor(serialNumber, name,description,price,tax,images,expirationDate){
        super(serialNumber, name,description,price,tax,images);
        this.#expirationDate = expirationDate;
    }

    get expirationDate(){
        return this.#expirationDate;
    }

    set expirationDate(newexpirationDate){
        this.#expirationDate = newexpirationDate;
    }

    // Funciones del objeto.
    toString() {
        // Los atributos heredados sin "#", pues los pillo del "get" heredado de Product.
        return this.serialNumber + " - " + this.name+ " - " + this.description + " - " + this.price + " - " + this.tax + " - " + this.images + " - " + this.#expirationDate;
    }

}

class Clothing extends Product {
    #size;
    constructor(serialNumber, name,description,price,tax,images,size){
        super(serialNumber, name,description,price,tax,images);
        this.#size = size;
    }

    get size(){
        return this.#size;
    }

    set size(newsize){
        this.#size = newsize;
    }

    // Funciones del objeto.
    toString() {
        // Los atributos heredados sin "#", pues los pillo del "get" heredado de Product.
        return this.serialNumber + " - " + this.name+ " - " + this.description + " - " + this.price + " - " + this.tax + " - " + this.images + " - " + this.#size;
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

function testProductAlpha(){
    console.log("Comprobando el objeto Product y Subproductos...");
    let producto = new Product(124,"Leche","Viene de vacas",2,21,"...");
    console.log(producto.toString());
    let tech1 = new Technology(155,"Laptop","Ligero y portable", 800, 21, "...","MSI");
    console.log(tech1.toString());
    console.log("Cambiando el precio del Subproducto...")
    tech1.price=750;
    console.log(tech1.toString());
}

function testStoreHouseMethods() {
    let sh = StoreHouse.getInstance();
    console.log("StoreHouse creado: "+sh.name);
    
    let ctg1 = new Category("Cucharas","Redondas y perfectas para sopa.");
    let ctg2 = new Category("Tenedores","No me pinches.");
    console.log("Añadiendo categoría... Nuevo tamaño: "+ sh.addCategory(ctg1));
    console.log("Añadiendo categoría... Nuevo tamaño: "+ sh.addCategory(ctg2));
    console.log("Categorías: "+sh.showCategories());
    console.log("Añadiendo objeto no-categoría para provocar fallo...");
    try {
        sh.addCategory(new Technology(155,"Laptop","Ligero y portable", 800, 21, "...","MSI"))
    } catch (err) { console.log(err.msg) }
    console.log("Eliminando categoría...");

    console.log("");
}

function testAll() {
    // testAlpha();
    // testCategoryAlpha();
    // testProductAlpha();
    testStoreHouseMethods();
}

window.onload = testAll;




/*
let _stores = [
    {
        store: store,
        coords:coords,
        products:[
            {
                product: product,
                categories: []
            }
        ]
    }
];
*/