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
/* ++++++++++++++++++++++++++++++++++++++++ NOTA ++++++++++++++++++++++++++++++++++++++++ */
/*
    A la hora de formatear el código, aquellos atributos privados (#atrib) me los eliminaba o
    me hacía cosas raras, por lo que no he podido formatear correctamente el código.
    He estado mirando y es un problema de mis extensiones, pero he intentado ordenar el código
    lo mejor posible.
*/


/* ++++++++++++++++++++++++++++++++++++++++ Objeto personaliado para los errores ++++++++++++++++++++++++++++++++++++++++ */


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
            #defaultCategory = new Category("DEFAULT","DEFAULT");   // Categoría por defecto.
            #shops = [];    // Tiendas a las que suministra/guarda productos.
            #defaultShop = new Map();  // Acumula productos que han perdido tienda propia.

            // Constructor vacío.
            constructor() {
                if (!new.target) throw new MyError("ERROR EN EL SINGLETON.");
                // Inicializo la categoría por defecto.
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
                // Devuelvo un iterador con las categorías y sus productos internos.
                return this.#categories[Symbol.iterator]();
            }
            get shops(){
                // Devuelvo un iterador con los objetos de las tiendas.
                return this.#shops[Symbol.iterator]();
            }
            get products(){
                return this.#products;
            }

            addCategory(newCategory){
                if(newCategory==null) throw new MyError("La categoría no puede ser nula.");
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

            addProduct(newProduct,category){
                // Añade un producto asociado a una categoría.
                if(!(category instanceof Category)){
                    // Si llega aquí, entonces le he pasado un String
                    // Este es un apaño al crear nuevos productos con formularios.
                    let categoryFound = null;
                    for (let registeredCategory of this.#categories.keys()) {
                        if(registeredCategory.title == category){
                            categoryFound = registeredCategory;
                        }
                      }
                    if(categoryFound == null){
                        // Si es nulo, es que el String no ha tenido coincidencias.
                        throw new MyError("Este objeto no es una cateogría.");
                    }else{
                        // Ahora doy el cambiazo para que todo funcione.
                        category = categoryFound;
                    }
                }
                

                // La instancia funciona tanto como para Product como para herederos.
                if(!(newProduct instanceof Product)) throw new MyError("Este objeto no es un producto.");
                if(newProduct == null) throw new MyError("El producto no puede ser nulo.")
                
                // Lo añado al mapa de categorías y productos asociados.
                // No se pide controlar que exista la categoría a la que se asocia el producto.
                this.#categories.get(category).push(newProduct); // Get devuelve el array asociado a la categoría.
                
                // Después lo añado al array de "productos registrados".
                return (this.#products.push(newProduct));
            }

            removeProduct(deletedProduct){
                // Elimina un producto y TODAS sus relacciones con otros objetos.
                if(!(deletedProduct instanceof Product)) throw new MyError("Este objeto no es un producto.");
                if(!this.#products.includes(deletedProduct)) throw new MyError("Este producto no existe.");

                // Lo tenemos que eliminar de 3 sitios: products, categorías y stores.
                // CATEGORÍAS
                for (let [k,v] of this.#categories.entries()){
                    // v es un array con productos. Recorremos v para eliminar el producto.
                    // Para no ir a lo loco, primero miramos si lo contiene.
                    if(v.includes(deletedProduct)){
                        let index = v.findIndex((x) => x == deletedProduct);
                        v.splice(index,1);
                    }
                }

                // STORES
                // Recorremos todas las tiendas.
                this.#shops.forEach(shop => {
                    // Si no lo encuentra, retorna false. Tampoco ocasiona problema.
                    shop.products.delete(deletedProduct);
                });
                // También lo eliminamos de la tienda por defecto.
                this.#defaultShop.delete(deletedProduct);

                // PRODUCTS
                let index = this.#products.findIndex((v) => v == deletedProduct);
                this.#products.splice(index,1);

                return -1; // NOTA: No entiendo exactamente que nº de elementos he de retornar.
            }
            addProductInShop(shop,product,quantity){
                // Añade Product en Shop, con un nº de uds.
                if(!this.#products.includes(product)) throw new MyError("El producto no existe.");
                if(!this.#shops.includes(shop)) throw new MyError("La tienda no existe.");
                if(quantity<=0) throw new MyError("Cantidad incorrecta.");

                // Busco la tienda con la que trabajaremos.
                let index = this.#shops.findIndex((v) => v == shop);
                // Modifico el atributo "products" del objeto Store, donde guarda la cantidad.
                this.#shops[index].products.set(product,quantity);
                // Devuelvo la CANTIDAD de productos en esa tienda.
                return this.#shops[index].products.size;

            }
            addQuantityProductInShop(shop,product,quantity){
                if(!this.#products.includes(product)) throw new MyError("El producto no existe.");
                if(!this.#shops.includes(shop)) throw new MyError("La tienda no existe.");
                if(quantity<=0) throw new MyError("Cantidad incorrecta.");

                // Busco la tienda con la que trabajaremos.
                let index = this.#shops.findIndex((v) => v == shop);
                // Funciona igual que el anterior, pero tengo que sumar la canditad actual a la nueva.
                this.#shops[index].products.set(product,((this.#shops[index].products.get(product))+quantity));
                // Devuelvo el stock de ese producto en concreto.
                return this.#shops[index].products.get(product);
            }
            getCategoryProducts(category){
                // Dada una categoría, devuelve sus productos en modo iterador.
                if(!(category instanceof Category)) throw new MyError("Este objeto no es una cateogría.");
                if(category==null) throw new MyError("La categoría no puede ser nula.");

                // Retorno el array dentro del mapa en forma de iterador.
                return (this.#categories.get(category)[Symbol.iterator]());

            }
            addShop(newShop){
                if(!(newShop instanceof Store)) throw new MyError("Este objeto no es una tienda.");
                if(newShop == null) throw new MyError("La tienda no puede ser nula.");
                if(this.#shops.includes(newShop)) throw new MyError("Esta tienda ya existe.");
                return (this.#shops.push(newShop));
            }

            removeShop(shop){
                // Elimina Shop y sus cosas a default.
                // Lo primero será obtener los productos registrados en la tienda.
                // No se especifica si el stock también se mantiene, pero lo haré por si acaso.
                let index = this.#shops.findIndex((v) => v == shop);
                if(index==-1) throw new MyError("No se ha encontrado la tienda.");
                
                let savedProducts = 0;
                for (let [k,v] of this.#shops[index].products.entries()){
                    this.#defaultShop.set(k,v);
                    savedProducts+=v;
                }

                // Por último, busco y elimino la tienda.
                this.#shops.splice(index,1);

                // Retorno el nº de elementos.
                return savedProducts;
            }

            getShopProducts(shop){
                // Iterador de todos los productos de una tienda junto su Stock.
                let index = this.#shops.findIndex((v) => v == shop);
                return this.#shops[index].products.entries();
            }


            /* ++++++++++++++++++++++++++++++++++++++++ Funciones personalizadas ++++++++++++++++++++++++++++++++++++++++ */
            /*
                Estas funciones son las que he usado para testear el código y para visualizar
                el comportamiento del mismo.
                Los objetos iteradores son útiles, pero de momento me siento más cómodo
                visualizando Strings, por eso he usado estos métodos en el testeo.
            */

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

            // Muestra los nombres de las tiendas registradas.
            showShops(){
                let string = "";
                this.#shops.forEach(store => {
                    string+=store.name+" - ";
                });
                return string;
            }

            // Muestra los nombres de los productos y sus cantidades en una tienda registrada.
            showProductsInShop(shop){
                let index = this.#shops.findIndex((v) => v == shop);
                for (let [k,v] of this.#shops[index].products.entries()){
                    console.log(k.name + ": " + v);
                }
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


/* ++++++++++++++++++++++++++++++++++++++++ Definición de objetos varios ++++++++++++++++++++++++++++++++++++++++ */
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
    #products;  // Almacena los productos relaccionados con la tienda.
    constructor(CIF, name,address,phone,coords){
        this.#CIF = CIF;
        this.#name = name;
        this.#address = address;
        this.#phone = phone;
        this.#coords = coords;
        this.#products = new Map(); // Almacenará los productos y sus cantidades. Similar a StoreHouse.categories.
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
    get products(){
        return this.#products;
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


/* ++++++++++++++++++++++++++++++++++++++++ Funciones de testeo varias ++++++++++++++++++++++++++++++++++++++++ */

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

/* ++++++++++++++++++++++++++++++++++++++++ Función de testeo principal ++++++++++++++++++++++++++++++++++++++++ */

function testStoreHouseMethods() {
    let sh = StoreHouse.getInstance();
    console.log("+ + + + + + + + Comenzando el testeo de la práctica.");
    console.log("StoreHouse creado: "+sh.name);
    let instancia2 = StoreHouse.getInstance();
    console.log("¿Instancias iguales?: " + (sh === instancia2));

    console.log("");
    console.log("+ + + + + + + + addCategory.");
    let ctg1 = new Category("Cucharas","Redondas y perfectas para sopa.");
    let ctg2 = new Category("Tenedores","No me pinches.");
    console.log("Añadiendo categoría... Nuevo tamaño: "+ sh.addCategory(ctg1));
    console.log("Añadiendo categoría... Nuevo tamaño: "+ sh.addCategory(ctg2));
    //console.log("Categorías: "+sh.showCategories());
    console.log("Añadiendo objeto no-categoría para provocar fallo...");
    try {
        sh.addCategory(new Technology(155,"Laptop","Ligero y portable", 800, 21, "...","MSI"))
    } catch (err) { console.log(err.msg) }
    console.log("Añadiendo categoría null para provocar fallo...");
    try {
        sh.addCategory(null);
    } catch (err) { console.log(err.msg) }


    // Entrada de productos.
    console.log("");
    console.log("+ + + + + + + + addProduct.");
    let tech1 = new Technology(155,"Laptop","Ligero y portable", 800, 21, "...","MSI");
    let tech2 = new Technology(199,"Movil","Batería durarera",200, 21, "...","Iphone");
    console.log("Añadiendo producto a la categoría. Nuevo tamaño: "+ sh.addProduct(tech1,ctg1));
    console.log("Añadiendo producto a la categoría. Nuevo tamaño: "+ sh.addProduct(tech2,ctg1));
    console.log("Añadiendo algo que no es un producto...");
    try {
        console.log("Añadiendo producto a la categoría. Nuevo tamaño: "+ sh.addProduct(ctg1,ctg1));
    } catch (err) { console.log(err.msg) }
    console.log("");
    console.log("+ + + + + + + + removeCategory.");
    console.log("Mostrando categorías...");
    console.log(sh.showCategories());
    //console.log("Mostrando categorías y productos asociados...");
    //sh.showCategoriesAndProducts();
    console.log("Mostrando productos asociados a la categoría "+ctg1.title + ": "+sh.showProductsOfCategory(ctg1));
    console.log("Eliminando la categoría "+ctg1.title+". Nuevo tamaño: "+sh.removeCategory(ctg1));
    console.log("Mostrando categorías...");
    console.log(sh.showCategories());
    console.log("Eliminando una categoría que no está para provocar fallo...")
    try {
        console.log("Eliminando la categoría "+ctg1.title+". Nuevo tamaño: "+sh.removeCategory(ctg1));
    } catch (err) { console.log(err.msg) }
    console.log("Mostrando productos asociados a la categoría DEFAULT: "+sh.showProductsOfCategory(sh.defaultCategory));



    // Entrada de tiendas.
    console.log("");
    console.log("+ + + + + + + + addShop.");
    let shop1 = new Store("A6I4","Tienda chula","En la esquina",652014789,new Coords(19.21,-158.02));
    let shop2 = new Store("T7M2","Tienda distinta","En la otra esquina",926105887,new Coords(-129.21,258.02));
    console.log("Añadiendo una nueva tienda. Nuevo tamaño: "+sh.addShop(shop1));
    console.log("Añadiendo una nueva tienda. Nuevo tamaño: "+sh.addShop(shop2));
    console.log("Añadiendo una tienda ya existente...");
    try {
        console.log("Añadiendo una nueva tienda. Nuevo tamaño: "+sh.addShop(shop2));
    } catch (err) { console.log(err.msg) }
    console.log("Añadiendo una tienda null...");
    try {
        console.log("Añadiendo una nueva tienda. Nuevo tamaño: "+sh.addShop(null));
    } catch (err) { console.log(err.msg) }
    console.log("");
    console.log("+ + + + + + + + addProductInShop.");
    console.log("Mostrando tiendas: "+sh.showShops());
    console.log("Añadiendo productos a la tienda "+shop1.name+". Catidad de productos actuales: "+sh.addProductInShop(shop1,tech1,5));
    console.log("Añadiendo productos a la tienda "+shop1.name+". Catidad de productos actuales: "+sh.addProductInShop(shop1,tech2,5));
    console.log("Visualizando productos de la tienda "+shop1.name);
    sh.showProductsInShop(shop1);
    console.log("");
    console.log("+ + + + + + + + addQuantityProductInShop.");
    console.log("Sumando stock a la tienda "+shop1.name+". Nuevo stock: "+sh.addQuantityProductInShop(shop1,tech1,12));
    console.log("Sumando stock a la tienda "+shop1.name+". Nuevo stock: "+sh.addQuantityProductInShop(shop1,tech2,3));
    console.log("Visualizando productos de la tienda "+shop1.name);
    sh.showProductsInShop(shop1);
    // Para testear la eliminación, añadiré 10 elementos a la segunda tienda.
    sh.addProductInShop(shop2,tech1,5);
    sh.addProductInShop(shop2,tech2,5);
    console.log("");
    console.log("+ + + + + + + + removeShop.");
    console.log("Añadiendo elementos a "+shop2.name+"...");
    console.log("Eliminando la tienda "+shop2.name+". Productos devueltos a la tienda por defecto: "+sh.removeShop(shop2));
    console.log("Mostrando tiendas: "+sh.showShops());
    console.log("Eliminando tienda inexistente para provocar fallo...");
    try {
        console.log("Eliminando la tienda "+shop2.name+". Productos devueltos a la tienda por defecto: "+sh.removeShop(shop2));
    } catch (err) { console.log(err.msg) }
    console.log("");
    // Eliminación de producto y sus relacciones.
    console.log("");
    console.log("+ + + + + + + + removeProduct.");
    console.log("Creando un nuevo producto...");
    let food1 = new Food(905,"Queso","Increiblemente rico y malholiente", 15, 21, "...","Ayer");
    console.log("Insertando producto nuevo en múltiples sitios...");
    let shop3 = new Store("78E6","Tienda rara","Por ahí perdida",654877033,new Coords(-185.26,-208.02));
    let ctg3 = new Category("Lacteos","Vienen de la leche y por ende de las vacas.");
    sh.addCategory(ctg3);
    sh.addShop(shop3);
    sh.addProduct(food1,ctg3);
    sh.addProductInShop(shop3,food1,22);
    console.log("Mostrando el producto " + food1.name + " añadido en varios objetos...");
    sh.showCategoriesAndProducts();
    sh.showProductsInShop(shop3);
    console.log("Procediendo a la eliminación del objeto Producto y de sus relacciones...");
    sh.removeProduct(food1);
    console.log("Mostrando relacciones de " + food1.name + " tras su eliminación...");
    sh.showCategoriesAndProducts();
    sh.showProductsInShop(shop3);   // No retorna nada, pues la tienda ahora está vacía. 
    console.log("Eliminando producto que no existe...");
    try {
        sh.removeProduct(food1);
    } catch (err) { console.log(err.msg) }

    console.log("");
    console.log("+ + + + + + + + Métodos que devuelven iteradores.");
    console.log(sh.categories);
    console.log(sh.shops);
    console.log(sh.getCategoryProducts(ctg2));
    console.log(sh.getShopProducts(shop1));


    /*
    let iteratorSymbol = sh.categories;
    console.log(iteratorSymbol.next());
    console.log(iteratorSymbol.next());
    console.log(iteratorSymbol.next());
    console.log(iteratorSymbol.next());
    console.log(iteratorSymbol.next());
    
    let iteratorSymbolShop = sh.shops;
    console.log(iteratorSymbolShop.next());
    console.log(iteratorSymbolShop.next());
    console.log(iteratorSymbolShop.next());
    console.log(iteratorSymbolShop.next());
    console.log(iteratorSymbolShop.next());
    */
}

function testAll() {
    // testAlpha();
    // testCategoryAlpha();
    // testProductAlpha();
    testStoreHouseMethods();
}

//window.onload = testAll;




export default StoreHouse;
export {MyError, Category, Coords, Store, Product, Technology, Food, Clothing};


/*
let _stores = [
    {
        store: store,
        coords:coords,???
        products:[
            {
                --> product: product,
                categories: []
            }
        ]
    }
];
*/