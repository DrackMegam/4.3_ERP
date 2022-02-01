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
            #products = []; // Productos almacenados y sus cantidades.
            #categories = new Map();   // Categorías registradas junto los productos.
            #defaultCategory = new Category("DEFAULT","DEFAULT");
            
            #shops = [];    // Tiendas a las que suministra/guarda productos.
            // Categoría creada por defecto. Por si algún producto o tienda no tiene otro lugar.
            #defaultShop = [];  // Acumula productos que han perdido tienda propia.


            // Constructor vacío.
            constructor() {
                if (!new.target) throw new MyError("ERROR EN EL SINGLETON.");
                // Añado la categoría por defecto.
                this.#categories.set(this.#defaultCategory,[]);
            }

            

            // Getters y Setters
            get defaultCategory() {
                return this.#defaultCategory;
            }
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
                this.#categories.set(newCategory,[]); // Añado la categoría y un array vacío de futuros productos.
                return this.#categories.size;

            }
            removeCategory(deleteCategory){
                if(!(deleteCategory instanceof Category)) throw new MyError("Este objeto no es una cateogría.");
                if(!this.#categories.has(deleteCategory)) throw new MyError("No se ha encontrado la categoría.");
                if(deleteCategory==this.#defaultCategory) throw new MyError("No puedes eliminar la categoría por defecto.");
                // Lo primero será guardar los productos de esa categoría para pasarlos a default.
                let products = this.#categories.get(deleteCategory);
                // Los inserto en el array de la categoría por defecto.
                products.forEach(product => {
                    this.#categories.get(this.#defaultCategory).push(product);
                });

                // Finalmente, elimino la categoría.
                this.#categories.delete(deleteCategory);
                return this.#categories.size;
            }

            // Estos métodos son para visualizar mejor los contenidos.
            // Devuelve un String con todas las categorías registradas.
            showCategories(){
                let string = "";
                for (let [k,v] of this.#categories.entries()){
                    string+= k  +" || ";
                }
                return string;
            }
            // Ejecuta varios logs con los nombres de las categorías y todos sus productos asociados.
            showCategoriesAndProducts(){
                for (let [k,v] of this.#categories.entries()){
                    console.log(k.title + ": " + v);
                }
            }
            // Devuelve una cadena con los nombres de todos los productos asociados a una categoría.
            showProductsOfCategory(category){
                if(!(category instanceof Category)) throw new MyError("Este objeto no es una cateogría.");
                let string = "";
                // Array con todos los objetos productos.
                let products = this.#categories.get(category);

                products.forEach(product => {
                    string+= product.name+" - ";
                });

                return string;
            }
            addProduct(newProduct,category){
                // Añade un producto asociado a una categoría.
                if(!(category instanceof Category)) throw new MyError("Este objeto no es una cateogría.");
                // La instancia funciona tanto como para Product como para herederos.
                if(!(newProduct instanceof Product)) throw new MyError("Este objeto no es un producto.");
                if(newProduct == null) throw new MyError("El producto no puede ser nulo.")
                
                // Lo añado al mapa de categorías y productos asociados.
                // No se pide controlar que exista la categoría a la que se asocia el producto.
                this.#categories.get(category).push(newProduct); // Get devuelve el array asociado a la categoría.
                
                // Después lo añado al array de "productos registrados".
                return (this.#products.push(newProduct));
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
            addShop(newShop){
                if(!(newShop instanceof Store)) throw new MyError("Este objeto no es una tienda.");
                if(newShop == null) throw new MyError("La tienda no puede ser nula.");
                if(this.#shops.includes(newShop)) throw new MyError("Esta tienda ya existe.");
                return (this.#shops.push(newShop));
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
    //console.log("Categorías: "+sh.showCategories());
    console.log("Añadiendo objeto no-categoría para provocar fallo...");
    try {
        sh.addCategory(new Technology(155,"Laptop","Ligero y portable", 800, 21, "...","MSI"))
    } catch (err) { console.log(err.msg) }
    console.log("Eliminando categoría...");

    // Entrada de productos.
    console.log("");
    let tech1 = new Technology(155,"Laptop","Ligero y portable", 800, 21, "...","MSI");
    let tech2 = new Technology(199,"Movil","Batería durarera",200, 21, "...","Iphone");
    console.log("Añadiendo producto a la categoría. Nuevo tamaño: "+ sh.addProduct(tech1,ctg1));
    console.log("Añadiendo producto a la categoría. Nuevo tamaño: "+ sh.addProduct(tech2,ctg1));
    console.log("Añadiendo algo que no es un producto...");
    try {
        console.log("Añadiendo producto a la categoría. Nuevo tamaño: "+ sh.addProduct(ctg1,ctg1));
    } catch (err) { console.log(err.msg) }
    console.log("Mostrando categorías...");
    console.log(sh.showCategories());
    //console.log("Mostrando categorías y productos asociados...");
    //sh.showCategoriesAndProducts();
    console.log("Mostrando productos asociados a la categoría "+ctg1.title + ": "+sh.showProductsOfCategory(ctg1));
    console.log("Eliminando la categoría "+ctg1.title+". Nuevo tamaño: "+sh.removeCategory(ctg1));
    console.log("Mostrando categorías...");
    console.log(sh.showCategories());
    console.log("Mostrando productos asociados a la categoría DEFAULT: "+sh.showProductsOfCategory(sh.defaultCategory));



    // Entrada de tiendas.
    console.log("");
    let shop1 = new Store("A6I4","Tienda chula","En la esquina",652014789,new Coords(19.21,-158.02));
    let shop2 = new Store("T7M2","Tienda distinta","En la otra esquina",926105887,new Coords(-129.21,258.02));
    console.log("Añadiendo una nueva tienda. Nuevo tamaño: "+sh.addShop(shop1));
    console.log("Añadiendo una nueva tienda. Nuevo tamaño: "+sh.addShop(shop2));
    console.log("Añadiendo una tienda ya existente...");
    try {
        console.log("Añadiendo una nueva tienda. Nuevo tamaño: "+sh.addShop(shop2));
    } catch (err) { console.log(err.msg) }
    console.log("");
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