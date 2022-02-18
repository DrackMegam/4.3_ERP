// Importo los objetos, productos y demases.
import {MyError, Category, Coords, Store, Product, Technology, Food, Clothing} from './StoreHouseModel.js';


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
    }

    // Evento privado que carga los objetos.
    #loadStoreHouseObjects(){
        // Inicializo tres categorías
        let ctg1 = new Category("Cucharas","Redondas y perfectas para sopa.");
        let ctg2 = new Category("Tenedores","No me pinches.");
        let ctg3 = new Category("Cuchillos","Poco afilados.");
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


}

export default StoreHouseController;