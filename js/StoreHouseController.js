// Importo los objetos, productos y demases.
import {MyError, Category, Coords, Store, Product, Technology, Food, Clothing} from './StoreHouseModel.js';
import * as ck from './cookies.js';

class StoreHouseController{
    #modelStoreHouse;
    #viewStoreHouse;

    constructor(modelStoreHouse,viewStoreHouse){
        this.#modelStoreHouse = modelStoreHouse;
        this.#viewStoreHouse = viewStoreHouse;

        // Ejecuto métodos por defecto.
        this.onInit();
        this.onLoad();

        // Enlazo el bindInit con el método que ejecuta el inicio.
        this.#viewStoreHouse.bindInit(this.handleInit);
        this.#viewStoreHouse.bindShowShop(this.handleShowShop);
        this.#viewStoreHouse.bindShowProductFile(this.handleShowProductFile);
        this.#viewStoreHouse.bindShowCategorias(this.handleShowCategorias);
        // Nuevo apartado T6.1 para mostrar producto en nueva ventana.
        this.#viewStoreHouse.bindShowNewWindow(this.handleShowNewWindow);
        this.#viewStoreHouse.bindLogginButton(this.handleLoggin);
        


    }

    // Evento privado que carga los objetos.
    #loadStoreHouseObjects(){
        // Inicializo tres categorías
        let ctg1 = new Category("Objetos de lujo","Categoría donde solo se añaden objetos de lujo.");
        let ctg2 = new Category("Cacharros","Donde va todo aquello que no va a default.");
        let ctg3 = new Category("Extra","No me han instanciado con ningún objeto dentro....");
        // Inicializo tres tiendas.
        let shop1 = new Store("A6I4","Tienda chula","En la esquina",652014789,new Coords(19.21,-158.02));
        let shop2 = new Store("T7M2","Tienda distinta","En la otra esquina",926105887,new Coords(-129.21,258.02));
        let shop3 = new Store("78E6","Tienda rara","Por ahí perdida",654877033,new Coords(-185.26,-208.02));
        // Inicializo productos varios.
        let tech1 = new Technology(155,"Laptop","Ligero y portable", 800, 21, "...","MSI");
        let tech2 = new Technology(199,"Movil","Batería durarera",200, 21, "...","Iphone");
        let tech3 = new Technology(295,"Camara","A tope de zoom",650, 22, "...","Xiagochan");
        let food1 = new Food(905,"Queso","Increiblemente rico y malholiente", 15, 21, "...","Ayer");
        let cloth1 = new Clothing(225,"Sudadera","Cálida y suave", 25, 21, "...","XXL");


        // Aquí van los métodos para añadir productos.
        this.#modelStoreHouse.addCategory(ctg1);
        this.#modelStoreHouse.addCategory(ctg2);
        this.#modelStoreHouse.addCategory(ctg3);
        this.#modelStoreHouse.addProduct(tech1,ctg1)
        this.#modelStoreHouse.addProduct(tech2,ctg1)
        this.#modelStoreHouse.addProduct(tech3,ctg1)
        this.#modelStoreHouse.addProduct(food1,ctg2)
        this.#modelStoreHouse.addProduct(cloth1,ctg2)
        this.#modelStoreHouse.addShop(shop1);
        this.#modelStoreHouse.addShop(shop2);
        this.#modelStoreHouse.addShop(shop3);
        this.#modelStoreHouse.addProductInShop(shop1,tech1,8);
        this.#modelStoreHouse.addProductInShop(shop1,tech2,2);
        this.#modelStoreHouse.addProductInShop(shop1,tech3,6);
        this.#modelStoreHouse.addProductInShop(shop1,food1,3);
        this.#modelStoreHouse.addProductInShop(shop2,tech3,6);
        this.#modelStoreHouse.addProductInShop(shop2,food1,3);
        this.#modelStoreHouse.addProductInShop(shop2,cloth1,1);
        this.#modelStoreHouse.addProductInShop(shop3,cloth1,8);
        this.#modelStoreHouse.addQuantityProductInShop(shop1,tech1,12);

        /*
        // Creo un archivo JSON
        let storeJson = JSON.parse(shop1.toJSON());
        console.log(storeJson);

        let productJson = JSON.parse(cloth1.toJSON());
        console.log(productJson);

        let categoriaJSON = JSON.parse(ctg1.toJSON());
        console.log(categoriaJSON);


        
        let categoriaJSON = JSON.parse(ctg1.toJSON());
        Object.assign(new Category,categoriaJSON);
        console.log(categoriaJSON);
        console.log(ctg1);
        console.log(categoriaJSON instanceof Category);
        */
    
    }

    // Carga la vista inicial del View con los datos pasados.
    onInit = (data) => {
        this.#viewStoreHouse.init(data);
    }

    // Inicializa todo el "testeo" de crear objetos y demases.
    onLoad = () => {
        this.#loadStoreHouseObjects();
    }

    // Este solo se carga al clickar en "SkinBits";
    handleInit = () => {
        // La página inicial solo requiere de info sobre las tiendas.
        let data = this.#modelStoreHouse.shops;
        
        // Le paso la info de las tiendas.
        this.onInit(data);
        // Vuelvo a vincular el método, pues ahora hay nuevos botones.
        this.#viewStoreHouse.bindShowShop(this.handleShowShop);
        this.#viewStoreHouse.bindShowCategorias(this.handleShowCategorias);
        // Menús y formularios para añadir objetos
        /*
            RECORDATORIO
            El bindeo se hace cuando se crea el botón.
            No siempre se hace en el constructor, pues quizá el botón aún 
            no exista en ese entonces.
        */
        this.#viewStoreHouse.bindFormAddTechnologyProduct(this.handleFormAddTechnologyProduct);
        this.#viewStoreHouse.bindFormAddFoodProduct(this.handleFormAddFoodProduct);
        this.#viewStoreHouse.bindFormAddClothingProduct(this.handleFormAddClothingProduct);
        this.#viewStoreHouse.bindFormAddStore(this.handleFormAddStore);
        this.#viewStoreHouse.bindFormAddCategory(this.handleFormAddCategory);
        this.#viewStoreHouse.bindFormDeleteProduct(this.handleformDeleteProduct);
        this.#viewStoreHouse.bindFormDeleteStore(this.handleShowFormDeleteStore);
        this.#viewStoreHouse.bindFormDeleteCategory(this.handleShowFormDeleteCategory);
        // Bindeo el botón de loggin.
        //this.#viewStoreHouse.bindLoggin(this.handleLoggin);
        this.#viewStoreHouse.bindLogginButton(this.handleLoggin);
        // Bindeación del backup.
        this.#viewStoreHouse.bindBackup(this.handlerBackup);
    }

    // Handler del Backup, crea la copia de seguridad.
    handlerBackup = () => {
        /*
        //let archivo = new Blob(["Así \n es"],{type:"text/plain;charset=utf-8"});
        //saveAs(archivo,"backup.txt");
        let base = location.protocol + '//' + location.host + location.pathname;
		let url = new URL('utils.php', base);
        fetch(url,{
            method: 'post'
        }).then(function (response){
            return response.text();
        }).catch(function(err){

        });
        */
    }

    // Handler del loggin.
    handleLoggin = (username, password) =>{
        if(username == "admin" && password == "admin"){
            ck.setCookie("username","admin",30);
            ck.setCookie("password","admin",30);
            this.#viewStoreHouse.showResultadoLoggin(true);
        }else{
            this.#viewStoreHouse.showResultadoLoggin(false);
        }
    }

    // Método para ver productos de una tienda.
    handleShowShop = (target) => {
        //console.log(target);
        // Con el CIF de la tienda es suficiente.
        let tiendas = this.#modelStoreHouse.shops;
        let data;
        for (let tienda of tiendas){
            if(tienda.CIF==target){
                data = tienda;
            }
        }

        this.#viewStoreHouse.showShop(data);
        this.#viewStoreHouse.bindShowProductFile(this.handleShowProductFile);
        this.#viewStoreHouse.bindShowNewWindow(this.handleShowNewWindow);

    }

    handleShowProductFile = (target) => {
        let productos = this.#modelStoreHouse.products;
        let data;
        //console.log(productos);
        // Solo necesito un único producto, así que lo busco.
        for(let producto of productos){
            if(producto.serialNumber==target){
                data = producto;
            }
        }

        this.#viewStoreHouse.showProductFile(data);
    }

    handleShowCategorias = () => {
        let data = this.#modelStoreHouse.categories;
        //console.log(data);
        this.#viewStoreHouse.showCategorias(data);
    }

    // Manejador de eventos para abrir una nueva ventana del producto. T6.1
    handleShowNewWindow = (target) => {
        //console.log(target);
        let productos = this.#modelStoreHouse.products;

        let data;
        //console.log(productos);
        // Solo necesito un único producto, así que lo busco.
        for(let producto of productos){
            if(producto.serialNumber==target){
                data = producto;
            }
        }
        this.#viewStoreHouse.showNewWindow(data);
    }

    // Handlers para los distintos tipos de productos.
    handleFormAddTechnologyProduct = () => {
        let data = this.#modelStoreHouse.categories;
        this.#viewStoreHouse.formAddTechnologyProduct(data);
        this.#viewStoreHouse.bindAddTechnology(this.createTechnology);
    }

    // Creación del objeto.
    createTechnology = (serialNumber, name,description,price,tax,images,brand,category) => {
        console.log("Creando Technology...");
        let tech = new Technology(serialNumber,name,description,price,tax,images,brand);
        console.log(tech);
        let done, error;
        try{
            this.#modelStoreHouse.addProduct(tech,category);
            done=true;
            console.log("Añadido Technology");
        }catch(e){
            done = false;
            error = e;
            console.log("Fallo al añadir Technology");
            console.log(error);
        }

        // Ahora notifico al usuario.
        this.#viewStoreHouse.showResultado(done,tech,error);
    }

    handleFormAddFoodProduct = () => {
        let data = this.#modelStoreHouse.categories;
        this.#viewStoreHouse.formAddFoodProduct(data);
        this.#viewStoreHouse.bindAddFood(this.createFood);
    }

    createFood = (serialNumber, name,description,price,tax,images,expirationDate,category) => {
        console.log("Creando Food...");
        let food = new Food(serialNumber,name,description,price,tax,images,expirationDate);
        console.log(food);
        let done, error;
        try{
            this.#modelStoreHouse.addProduct(food,category);
            done=true;
            console.log("Añadido Food");
        }catch(e){
            done = false;
            error = e;
            console.log("Fallo al añadir Food");
            console.log(error);
        }

        // Ahora notifico al usuario.
        this.#viewStoreHouse.showResultado(done,food,error);
    }


    handleFormAddClothingProduct = () => {
        let data = this.#modelStoreHouse.categories;
        this.#viewStoreHouse.formAddClothingProduct(data);
        this.#viewStoreHouse.bindAddClothing(this.createClothing);
    }

    createClothing = (serialNumber, name,description,price,tax,images,size,category) => {
        console.log("Creando Clothing...");
        let cloth = new Clothing(serialNumber,name,description,price,tax,images,size);
        console.log(cloth);
        let done, error;
        try{
            this.#modelStoreHouse.addProduct(cloth,category);
            done=true;
            console.log("Añadido Clothing");
        }catch(e){
            done = false;
            error = e;
            console.log("Fallo al añadir Clothing");
            console.log(error);
        }

        // Ahora notifico al usuario.
        this.#viewStoreHouse.showResultado(done,cloth,error);
    }

    handleformDeleteProduct= () => {
        let data = "";
        this.#viewStoreHouse.formDeleteProduct(data);
        this.#viewStoreHouse.bindDeleteProduct(this.deleteProduct);
    }

    deleteProduct = (serialNumber) => {
        let done, error;
        try{
            this.#modelStoreHouse.removeProduct(serialNumber);
            done = true;
            console.log("Eliminado el producto con éxito");
        }catch(e){
            error = e;
            console.log("Fallo al eliminar el producto");
            console.log(error);
        }
        this.#viewStoreHouse.showResultadoDeleteProduct(done,error);
    }

    // Handlers adicionales para los Stores y las Categories
    handleFormAddStore = () => {
        let data = "";
        this.#viewStoreHouse.formAddStore(data);
        this.#viewStoreHouse.bindAddStore(this.addStore);
    }

    addStore = (CIF,name,address,phone,coords1,coords2) => {
        //CIF, name,address,phone,coords
        console.log("Creando Store...");
        let store = new Store(CIF,name,address,phone,new Coords(coords1,coords2));
        console.log(store);
        let done, error;
        try{
            this.#modelStoreHouse.addShop(store);
            done=true;
            console.log("Añadido Store");
        }catch(e){
            done = false;
            error = e;
            console.log("Fallo al añadir Store");
            console.log(error);
        }

        // Ahora notifico al usuario.
        this.#viewStoreHouse.showResultadoStore(done,store,error);
    }

    handleShowFormDeleteStore = () => {
        let data = this.#modelStoreHouse.shops
        //console.log(data);
        this.#viewStoreHouse.formDeleteStore(data);
        this.#viewStoreHouse.bindDeleteStore(this.deleteStore);

    }

    deleteStore = (CIF) => {
        let done, error;
        try{
            this.#modelStoreHouse.removeShop(CIF);
            done = true;
            console.log("Eliminada la tienda con éxito");
        }catch(e){
            error = e;
            console.log("Fallo al eliminar la tienda");
            console.log(error);
        }
        this.#viewStoreHouse.showResultadoDeleteStore(done,error);
    }

    handleFormAddCategory = () => {
        let data = "";
        this.#viewStoreHouse.formAddCategory(data);
        this.#viewStoreHouse.bindAddCategory(this.addCategory);

    }

    addCategory = (title,description) => {
        //CIF, name,address,phone,coords
        console.log("Creando Category...");
        let category = new Category(title,description);
        console.log(category);
        let done, error;
        try{
            this.#modelStoreHouse.addCategory(category);
            done=true;
            console.log("Añadido Category");
        }catch(e){
            done = false;
            error = e;
            console.log("Fallo al añadir Category");
            console.log(error);
        }

        // Ahora notifico al usuario.
        this.#viewStoreHouse.showResultadoCategory(done,category,error);
    }

    handleShowFormDeleteCategory = () => {
        let data = this.#modelStoreHouse.categories
        //console.log(data);
        this.#viewStoreHouse.formDeleteCategory(data);
        this.#viewStoreHouse.bindDeleteCategory(this.deleteCategory);
    }

    deleteCategory = (title) => {
        let done, error;
        try{
            this.#modelStoreHouse.removeCategory(title);
            done = true;
            console.log("Eliminada la categoría con éxito");
        }catch(e){
            error = e;
            console.log("Fallo al eliminar la categoría");
            console.log(error);
        }
        this.#viewStoreHouse.showResultadoDeleteCategory(done,error);
    }
}

export default StoreHouseController;