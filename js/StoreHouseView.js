import { MyError, Category, Coords, Store, Product, Technology, Food, Clothing } from './StoreHouseModel.js';
import * as validar from './validation.js';
class StoreHouseView {
    // Constructor de lo que se va a visualizar en la página.
    constructor() {
        // Usaremos el main que he embutido por ahí.
        this.main = $("main");
        // Defino aquí la nueva ventana, pues así es "única".
        this.newWindow = [];
        this.indexWindow = 0;

    }

    // Código HTML creado.
    init(data) {

        this.main.empty(); // Evita que se genere siempre.

        this.main.append("<h1>Tiendas disponibles</h1> <span>(Haz click en 'SkinBits'...)</span><br>");



        //this.main.append("<a name='muestro' id='muestro' class='btn btn-primary' href='#' role='button'>Entrar</a>");


        // Para que no explote al cargar la primera vez
        // Pues no se pasa ningún dato.
        if (data != undefined) {
            // Creo una nueva tabla...
            let htmlChulo = "<table id='tablaTiendas' class='table table-dark'><tr><th>Nombre Tienda</th><th>CIF</th><th>Enlace</th></tr>"
                // Voy recorriendo el iterador de tiendas.
            for (let tienda of data) {
                // Creo una nueva fila en la tabla.
                // Cada botón tiene un ID propio.
                htmlChulo += ("<tr><td>" + tienda.name + "</td><td>" + tienda.CIF + "</td><td>  <a name='" + tienda.CIF + "' id='" + tienda.CIF + "' class='btn btn-primary tienda' href='#Tienda" + tienda.CIF + "' role='button'>Entrar</a>  </td></tr>");
            }

            htmlChulo += ("</table>");


            // Añado los menús secundarios.
            // Addición de tiendas
            htmlChulo += "<a id='newStore' name='newStore' class='btn btn-primary ml-2 newStore' href='#NuevaTienda' role='button'>Añadir tienda</a>";
            htmlChulo += "<a id='deleteStore' name='deleteStore' class='btn btn-danger ml-2 deleteStore' href='#EliminarTienda' role='button'>Eliminar tienda</a>";
            htmlChulo += "<br><br>";
            // Relaccionados con categorías
            htmlChulo += "<a id='categorias' name='categorias' class=' ml-2 btn btn-primary categorias' href='#Categorias' role='button'>Ver Categorias</a>";
            htmlChulo += "<a id='newCategory' name='newCategory' class='btn btn-primary ml-2 newCategory' href='#NuevaCategoría' role='button'>Añadir categoría</a>";
            htmlChulo += "<a id='deleteCategory' name='deleteCategory' class='btn btn-danger ml-2 deleteCategory' href='#EliminarCategoria' role='button'>Eliminar categoría</a>";
            htmlChulo += "<br><br>";
            // Para poder añadir productos
            htmlChulo += "<a id='newTechnologyProduct' name='newTechnologyProduct' class='ml-1 btn btn-primary newTechnologyProduct' href='#NuevaTecnologia' role='button'>Añadir tecnología</a>";
            htmlChulo += "<a id='newFoodProduct' name='newFoodProduct' class='ml-2 btn btn-primary newFoodProduct' href='#NuevaComida' role='button'>Añadir comida</a>";
            htmlChulo += "<a id='newClothingProduct' name='newClothingProduct' class='ml-2 btn btn-primary newClothingProduct' href='#NuevaRopa' role='button'>Añadir ropa</a>";
            htmlChulo += "<a id='deleteProduct' name='deleteProduct' class='ml-2 btn btn-danger deleteProduct' href='#EliminarProducto' role='button'>Eliminar producto</a>";
            htmlChulo += "<br>";

            this.main.append(htmlChulo);

        }

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);


        // Para que modifique el estado de la página.
        window.addEventListener('popstate', function(event) {
            let estado = null;
            if (event.state) {
                estado = event.state.cuerpoMain;
                $("main").empty();
                $("main").append(estado);
            }

        });



    }

    // Evento, al clickar en "SkinBits", se ejecuta la acción.
    bindInit(handler) {
        $("#init").click((event) => {
            handler();

            /*
            // Añado el state del historial.
            let htmlActual = ($("main")[0].innerHTML);
            let nuevoEstado = { cuerpoMain: htmlActual };

            history.pushState(nuevoEstado, null);
            event.preventDefault();
            */


        })
    }

    /*
        Evento para mostrar un producto en una ventana distinta.
        Maneja el control de las múltiples ventanas así como su contenido.
        T6.1
    */
    showShop(data) {

        // Reinicio el contenido del main.
        this.main.empty();



        this.main.append("<h1>" + data.name + " " + data.CIF + "</h1> <span>(Haz click en 'SkinBits' para volver...)</span>");
        let htmlChulo = "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Cantidad</th><th>Enlace</th><th>Nueva ventana</th></tr>"

        /* TODO MOSTRAR LAS CATEGORÍAS Y PRODUCTOS */
        for (let [key, value] of data.products.entries()) {
            htmlChulo += ("<tr><td>" + key.serialNumber + "</td><td>" + key.name + "</td><td>" + value + "</td> <td>  <a name='" + key.serialNumber + "' id='" + key.serialNumber + "' class='btn btn-primary producto' href='#Producto" + key.serialNumber + "' role='button'>Entrar</a>  </td>  <td> <a name='" + key.serialNumber + "' id='" + key.serialNumber + "' class='btn btn-primary nuevaVentana' href='#' role='button'>Abrir</a>  </td></tr>");
        }

        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);


    }

    // Añado el nuevo evento posible para abrir nueva ventana. T6.1
    showNewWindow(data) {

        // Creo un botón para cerrar la ventana.
        let cerrarVentana = $('<button class="btn btn-danger m-1 cerramiento">Cerrar Ventana</button>');
        cerrarVentana.click((event) => {
            if (this.newWindow[(this.newWindow.length) - 1] && !(this.newWindow[(this.newWindow.length) - 1].closed)) {
                this.newWindow[(this.newWindow.length) - 1].close();
                // Procedo a cerrar TODAS las ventanas.
                for (let i = 0; i < this.newWindow.length; i++) {
                    this.newWindow[i].close();
                }
                // Limpio el array
                this.newWindow = [];
                console.log('Acabas de cerrar la ventana.');
                // Elimino este propio botón tras activarlo.
                this.main.find(".cerramiento").remove();
            } else {
                console.log('La ventana está cerrada.');
                this.main.find(".cerramiento").remove();
            }
        });
        // Añado el botón para cerrar la nueva ventana si es la primera vez que se abre.
        if (this.newWindow.length == 0) {
            this.main.append(cerrarVentana);

        }

        // Si no está abierta la ventana, la creo. Si lo está, la focuseo.
        console.log("Abriendo nueva ventana...");
        // "_blank" para poder abrir MULTIPLES ventanas
        this.newWindow.push(window.open("auxPage.html", "_blank", "width=800, height=130, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"));
        console.log(this.newWindow);




        // Espero X tiempo a que "carge" la ventana antes de tocarla.
        /*
            NOTA:
            En mi torre 500ms es más que suficiente, pero bien es cierto
            que en mi portatil este tiempo tan justo hace cosas raras.
            Dejo la variable en caso de que explote.
        */
        let ms = 100;
        setTimeout(() => {
            // Procedo a añadir contenido a esta nueva ventana, la última del array.
            let productWindow = $(this.newWindow[(this.newWindow.length) - 1].document);
            let htmlChulo = "";
            if (data instanceof Technology) {
                // Cambio el título de la ventana.
                this.newWindow[(this.newWindow.length) - 1].document.title = "Tecnología";
                htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Marca</th></tr>"
                htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.brand + "</td></tr>";
            } else if (data instanceof Food) {
                this.newWindow[(this.newWindow.length) - 1].document.title = "Comida";
                htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Fecha caducidad</th></tr>"
                htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.expirationDate + "</td></tr>";

            } else if (data instanceof Clothing) {
                this.newWindow[(this.newWindow.length) - 1].document.title = "Ropa";
                htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Talla</th></tr>"
                htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.size + "</td></tr>";

            }
            productWindow.find("main").append(htmlChulo);

        }, ms);


    }
    bindShowNewWindow(handler) {
        $(".nuevaVentana").click((event) => {
            handler(event.target.id);
        })
    }

    bindShowShop(handler) {
        // Afecta a todos los botones de las tiendas.
        $(".tienda").click((event) => {
            // Le paso el ID ÚNICO del botón que ha producido el evento.
            handler(event.target.id);


        })
    }

    // Para mostrar las fichas de los productos.
    showProductFile(data) {
        this.main.empty();

        let htmlChulo = "";
        /*
            Compruebo que tipo de objeto es y lo personalizo.
            Como no sabía muy bien "como personalizarlo", simplemente
            le cambio el nombre al título en función del tipo de objeto.
            Además de mostrar 1 atributo específico en la tabla.
        */
        if (data instanceof Technology) {
            this.main.append("<h1>TECNOLOGÍA " + data.name + "</h1>");
            htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Marca</th></tr>"
            htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.brand + "</td></tr>";
        } else if (data instanceof Food) {
            this.main.append("<h1>COMIDA " + data.name + "</h1>");
            htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Fecha caducidad</th></tr>"
            htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.expirationDate + "</td></tr>";

        } else if (data instanceof Clothing) {
            this.main.append("<h1>ROPA " + data.name + "</h1>");
            htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Talla</th></tr>"
            htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.size + "</td></tr>";

        }
        this.main.append("<span>(Haz click en 'SkinBits' para volver...)</span>");

        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);
    }

    bindShowProductFile(handler) {
        $(".producto").click((event) => {
            handler(event.target.id);


        })
    }

    showCategorias(data) {
        this.main.empty();
        let htmlChulo = "";

        // Aquí me doy cuenta de que las categorías son un poco raras.
        // Pero tienen cierto "orden". [0] = CAT; [1] array de productos.
        // Debería haber usado un mapa.
        for (let v of data) {
            // Título de la categoría.
            htmlChulo += "<div class='card bg-dark text-white'><div class='card-header'><h1>" + v[0].title + "</h1>";
            htmlChulo += "<h4>" + v[0].description + "</h4></div>";
            // Productos relaccionados.
            htmlChulo += "<div class='card-body'>";
            for (let i = 0; i < v[1].length; i++) {
                htmlChulo += "<li>" + v[1][i].name + "</li>";
            }
            htmlChulo += "</div></div>";

        }

        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);


    }

    bindShowCategorias(handler) {
        $("#categorias").click((event) => {
            handler();
        })
    }

    /* Funciones relaccionadas con añadir productos de varios tipos. */
    formAddTechnologyProduct(data) {
        this.main.empty();
        // constructor(serialNumber, name,description,price,tax,images)
        // Esto lo he hecho con un copia pega de lo que hay en el index.
        let htmlChulo = "<form name='formTechnology' id='formTechnology' role='form' novalidate>" +
            "<div class='form-row'>" +
            "   <div class='form-group col-md-6'> <label for='serialNumber'>Nº Serie</label> <input type='number'" +
            "           class='form-control' id='serialNumber' placeholder='Nº Serie'> </div>" +
            "   <div class='form-group col-md-6'> <label for='name'>Nombre</label> <input type='text'" +
            "           class='form-control' id='name' placeholder='Nombre'> </div>" +
            "</div>" +
            "<div class='form-group'> <label for='description'>Descripción</label> <input type='text'" +
            "        class='form-control' id='description' placeholder='Descripción del producto'>" +
            "</div>" +
            "<div class='form-row'>" +
            "    <div class='form-group col-md-6'> <label for='price'>Precio</label> <input type='number'" +
            "            class='form-control' id='price' placeholder='Precio'> </div>" +
            "    <div class='form-group col-md-6'> <label for='tax'>Impuestos</label> <select id='tax'" +
            "                    class='form-control'>" +
            "                    <option selected value='21'>General</option>" +
            "            <option value='10'>Reducido</option>" +
            "                    <option value='4'>Superreducido</option>" +
            "        </select>" +
            "    </div>" +
            "</div>" +
            "<div class='form-group'> <label for='brand'>Marca</label> <input type='text'" +
            "        class='form-control' id='brand' placeholder='Marca del producto'>" +
            "</div>";

        // Añado un SELECT con la categoría a la que va. Odio admitirlo pero eston con PHP me mola más.
        htmlChulo += "    <div class='form-group col-md-6'> <label for='category'>Impuestos</label> <select id='category' class='form-control'>";
        for (let category of data) {
            // Recordemos que tenemos un mapa, donde 0 son las categorías y 1 los productos.
            htmlChulo += "<option value='" + category[0].title + "'>" + category[0].title + "</option>";
        }
        htmlChulo += "        </select></div>";


        htmlChulo += "<button type='submit' class='btn btn-primary btnTechnology'>Añadir producto tecnologico</button>" +
            "</form>";


        this.main.append(htmlChulo);


        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);
    }

    bindFormAddTechnologyProduct(handler) {
        $(".newTechnologyProduct").click((event) => {
            handler();
        })
    }

    // Llama a la validación para crear el objeto.
    bindAddTechnology(handler) {
        validar.validarNewTechnology(handler);
    }

    // Método para notificar al usuario cuando se realice una operación sobre un producto.
    showResultado(done, tech, error) {
        $(document.formTechnology).find('div.error').remove();
        if (done) {
            this.main.append("<h1 class='text-success'>Se ha insertado " + tech.name + " correctamente.</h1>");
        } else {
            this.main.append("<h1 class='text-danger'>Error al insertar " + tech.name + "</h1>");
        }
    }

    formAddFoodProduct(data) {
        this.main.empty();
        // constructor(serialNumber, name,description,price,tax,images)
        // Esto lo he hecho con un copia pega de lo que hay en el index.
        let htmlChulo = "<form name='formFood' id='formFood' role='form' novalidate>" +
            "<div class='form-row'>" +
            "   <div class='form-group col-md-6'> <label for='serialNumber'>Nº Serie</label> <input type='number'" +
            "           class='form-control' id='serialNumber' placeholder='Nº Serie'> </div>" +
            "   <div class='form-group col-md-6'> <label for='name'>Nombre</label> <input type='text'" +
            "           class='form-control' id='name' placeholder='Nombre'> </div>" +
            "</div>" +
            "<div class='form-group'> <label for='description'>Descripción</label> <input type='text'" +
            "        class='form-control' id='description' placeholder='Descripción del producto'>" +
            "</div>" +
            "<div class='form-row'>" +
            "    <div class='form-group col-md-6'> <label for='price'>Precio</label> <input type='number'" +
            "            class='form-control' id='price' placeholder='Precio'> </div>" +
            "    <div class='form-group col-md-6'> <label for='tax'>Impuestos</label> <select id='tax'" +
            "                    class='form-control'>" +
            "                    <option selected value='21'>General</option>" +
            "            <option value='10'>Reducido</option>" +
            "                    <option value='4'>Superreducido</option>" +
            "        </select>" +
            "    </div>" +
            "</div>" +
            "<div class='form-group'> <label for='expirationDate'>Fecha de caducidad</label> <input type='text'" +
            "        class='form-control' id='expirationDate' placeholder='Fecha de caducidad'>" +
            "</div>";
        htmlChulo += "    <div class='form-group col-md-6'> <label for='category'>Impuestos</label> <select id='category' class='form-control'>";
        for (let category of data) {
            htmlChulo += "<option value='" + category[0].title + "'>" + category[0].title + "</option>";
        }
        htmlChulo += "        </select></div>";
        htmlChulo += "<button type='submit' class='btn btn-primary btnFood'>Añadir producto alimenticio</button>" +
            "</form>";


        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);
    }

    bindFormAddFoodProduct(handler) {
        $(".newFoodProduct").click((event) => {
            handler();
        })
    }

    // Llama a la validación para crear el objeto.
    bindAddFood(handler) {
        validar.validarNewFood(handler);
    }


    formAddClothingProduct(data) {
        this.main.empty();
        // constructor(serialNumber, name,description,price,tax,images)
        // Esto lo he hecho con un copia pega de lo que hay en el index.
        let htmlChulo = "<form name='formClothing' id='formClothing' role='form' novalidate>" +
            "<div class='form-row'>" +
            "   <div class='form-group col-md-6'> <label for='serialNumber'>Nº Serie</label> <input type='number'" +
            "           class='form-control' id='serialNumber' placeholder='Nº Serie'> </div>" +
            "   <div class='form-group col-md-6'> <label for='name'>Nombre</label> <input type='text'" +
            "           class='form-control' id='name' placeholder='Nombre'> </div>" +
            "</div>" +
            "<div class='form-group'> <label for='description'>Descripción</label> <input type='text'" +
            "        class='form-control' id='description' placeholder='Descripción del producto'>" +
            "</div>" +
            "<div class='form-row'>" +
            "    <div class='form-group col-md-6'> <label for='price'>Precio</label> <input type='number'" +
            "            class='form-control' id='price' placeholder='Precio'> </div>" +
            "    <div class='form-group col-md-6'> <label for='tax'>Impuestos</label> <select id='tax'" +
            "                    class='form-control'>" +
            "                    <option selected value='21'>General</option>" +
            "            <option value='10'>Reducido</option>" +
            "                    <option value='4'>Superreducido</option>" +
            "        </select>" +
            "    </div>" +
            "</div>" +
            "<div class='form-group'> " +
            "       <label for='size'>Tamaño de la prenda</label>" +
            "<select id='size'" +
            "                    class='form-control'>" +
            "                    <option selected value='XL'>XL</option>" +
            "            <option value='M'>M</option>" +
            "                    <option value='S'>S</option>" +
            "        </select>" +
            "</div>";
        htmlChulo += "    <div class='form-group col-md-6'> <label for='category'>Impuestos</label> <select id='category' class='form-control'>";
        for (let category of data) {
            htmlChulo += "<option value='" + category[0].title + "'>" + category[0].title + "</option>";
        }
        htmlChulo += "        </select></div>";
        htmlChulo += "<button type='submit' class='btn btn-primary btnClothing'>Añadir prenda de ropa</button>" +
            "</form>";


        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);
    }

    bindFormAddClothingProduct(handler) {
        $(".newClothingProduct").click((event) => {
            handler();
        })
    }

    bindAddClothing(handler) {
        validar.validarNewClothing(handler);
    }

    // Deletear un producto, da igual el tipo.
    formDeleteProduct(data) {
        this.main.empty();
        // (title, description)
        let htmlChulo = "<form name='formDeleteProduct' id='formDeleteProduct' role='form' novalidate>" +
            "<div class='form-row'>" +
            "   <div class='form-group col-md-6'> <label for='serialNumber'>Nº Serie</label> <input type='number'" +
            "           class='form-control' id='serialNumber' placeholder='Nº Serie'> </div>" +
            "</div>" +
            "<button type='submit' class='btn btn-primary'>Eliminar</button>" +
            "</form>";


        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);
    }

    bindFormDeleteProduct(handler) {
        $(".deleteProduct").click((event) => {
            handler();
        })
    }

    bindDeleteProduct(handler){
        validar.validarDeleteProduct(handler);
    }

    showResultadoDeleteProduct(done, error){
        $(document.formDeleteProduct).find('div.error').remove();
        if (done) {
            this.main.append("<h1 class='text-success'>Se ha eliminado correctamente.</h1>");
        } else {
            this.main.append("<h1 class='text-danger'>Error al eliminar el producto </h1>");
        }
    }

    // Para añadir las tiendas nuevas.
    formAddStore(data) {
        this.main.empty();
        //(CIF, name,address,phone,coords)
        let htmlChulo = "<form name='formAddStore' id='formAddStore' role='form' novalidate>" +
            "<div class='form-row'>" +
            "   <div class='form-group col-md-6'> <label for='CIF'>CIF</label> <input type='text'" +
            "           class='form-control' id='CIF' placeholder='CIF'> </div>" +
            "   <div class='form-group col-md-6'> <label for='name'>Nombre</label> <input type='text'" +
            "           class='form-control' id='name' placeholder='Nombre'> </div>" +
            "</div>" +
            "<div class='form-group'> <label for='address'>Dirección</label> <input type='text'" +
            "        class='form-control' id='address' placeholder='Dirección de la tienda'>" +
            "</div>" +
            "<div class='form-row'>" +
            "    <div class='form-group col-md-6'> <label for='phone'>Telefono</label> <input type='number'" +
            "            class='form-control' id='phone' placeholder='Telefono'> </div>" +
            "    <div class='form-group col-md-9'> <label for='coords1'>Coordenadas X</label> <input type='number'" +
            "            class='form-control' id='coords1' placeholder='X'> </div>" +
            "    <div class='form-group col-md-9'> <label for='coords2'>Coordenadas Y</label> <input type='number'" +
            "            class='form-control' id='coords2' placeholder='X'> </div>" +
            "</div>" +
            "<button type='submit' class='btn btn-primary'>Añadir tienda</button>" +
            "</form>";


        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);
    }

    bindFormAddStore(handler) {
        $(".newStore").click((event) => {
            handler();
        })
    }

    bindAddStore(handler){
        validar.validarAddStore(handler);
    }

    showResultadoStore(done, store, error){
        $(document.formDeleteProduct).find('div.error').remove();
        if (done) {
            this.main.append("<h1 class='text-success'>Se ha añadido la tienda "+store.CIF+".</h1>");
        } else {
            this.main.append("<h1 class='text-danger'>Error al añadir la tienda "+store.CIF+".</h1>");
        }
    }

    // Botón para eliminar tienda.
    formDeleteStore(data) {
        this.main.empty();
        // constructor(serialNumber, name,description,price,tax,images)
        // Esto lo he hecho con un copia pega de lo que hay en el index.
        let htmlChulo = "<form name='deleteStore' id='deleteStore' role='form' novalidate>";
        htmlChulo += "    <div class='form-group col-md-6'> <label for='store'>Tiendas</label> <select id='store' class='form-control'>";
        for (let store of data) {
            htmlChulo += "<option value='" + store.CIF + "'>" + store.name + "</option>";
        }
        htmlChulo += "        </select></div>";
        htmlChulo += "<button type='submit' class='btn btn-primary btnDelTienda'>Eliminar tienda</button>" +
            "</form>";


        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);
    }

    bindFormDeleteStore(handler) {
        $(".deleteStore").click((event) => {
            handler();
        })
    }

    bindDeleteStore(handler){
        validar.validarDeleteStore(handler);
    }

    showResultadoDeleteStore(done, error){
        $(document.formDeleteProduct).find('div.error').remove();
        if (done) {
            this.main.append("<h1 class='text-success'>Se ha eliminado la tienda.</h1>");
        } else {
            this.main.append("<h1 class='text-danger'>Esta tienda ya ha sido eliminada.</h1>");
        }
    }

    // Finalmente, para añadir categorías.
    formAddCategory(data) {
        this.main.empty();
        // (title, description)
        let htmlChulo = "<form name='formAddCategory' id='formAddCategory' role='form' novalidate>" +
            "<div class='form-row'>" +
            "   <div class='form-group col-md-6'> <label for='title'>Título</label> <input type='text'" +
            "           class='form-control' id='title' placeholder='Título'> </div>" +
            "</div>" +
            "<div class='form-group'> <label for='description'>Descripción</label> <input type='text'" +
            "        class='form-control' id='description' placeholder='Descripción del producto'>" +
            "</div>" +
            "<button type='submit' class='btn btn-primary'>Añadir categoría</button>" +
            "</form>";


        this.main.append(htmlChulo);

        // Añado los botones para moverse por el historial.
        let btnInicio = $("<button class='btn btn-primary m-1'>Inicio</button>");
        let btnAtras = $("<button class='btn btn-primary m-1'><-</button>");
        let btnAdelante = $("<button class='btn btn-primary m-1'>-></button>");
        btnInicio.click(() => {
            window.history.go();
        });
        btnAtras.click(() => {
            window.history.go(-1);
        });
        btnAdelante.click(() => {
            window.history.go(1);
        });
        this.main.append(btnAtras);
        this.main.append(btnAdelante);
        this.main.append(btnInicio);
    }

    bindFormAddCategory(handler) {
        $(".newCategory").click((event) => {
            handler();
        })
    }

    bindAddCategory(handler){
        validar.validarAddCategory(handler);
    }

    showResultadoCategory(done, category, error){
        $(document.formDeleteProduct).find('div.error').remove();
        if (done) {
            this.main.append("<h1 class='text-success'>Se ha añadido la categoría "+category.title+".</h1>");
        } else {
            this.main.append("<h1 class='text-danger'>Error al añadir la categoría "+category.title+".</h1>");
        }
    }

}

export default StoreHouseView;