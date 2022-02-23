import { MyError, Category, Coords, Store, Product, Technology, Food, Clothing } from './StoreHouseModel.js';

class StoreHouseView {
    // Constructor de lo que se va a visualizar en la página.
    constructor() {
        // Usaremos el main que he embutido por ahí.
        this.main = $("main");
        // Defino aquí la nueva ventana, pues así es "única".
        this.newWindow = null;
    }

    // Código HTML creado.
    init(data) {

        this.main.empty(); // Evita que se genere siempre.
        this.main.append("<h1>Tiendas disponibles</h1> <span>(Haz click en 'SkinBits'...)</span>");

        //this.main.append("<a name='muestro' id='muestro' class='btn btn-primary' href='#' role='button'>Entrar</a>");


        // Para que no explote al cargar la primera vez
        // Pues no se pasa ningún dato.
        if (data != undefined) {
            // Creo una nueva tabla...
            let htmlChulo = "<table id='tablaTiendas' class='table table-dark'><tr><th>Nombre Tienda</th><th>CIF</th><th>Enlace</th></tr>"
                // Voy recorriendo el iterador de tiendas.
            for (let tienda of data) {
                //console.log(tienda);
                // Creo una nueva fila en la tabla.
                // Cada botón tiene un ID propio.
                htmlChulo += ("<tr><td>" + tienda.name + "</td><td>" + tienda.CIF + "</td><td>  <a name='" + tienda.CIF + "' id='" + tienda.CIF + "' class='btn btn-primary tienda' href='#' role='button'>Entrar</a>  </td></tr>");
            }

            htmlChulo += ("</table>");


            // Añado los menús secundarios.
            // No se si esto lo he entendido mal, pero muestro al principio las tiendas y también un botón para listarlas?
            //htmlChulo += "<a id='init' name='init' class='btn btn-primary init' href='#' role='button'>Tiendas</a>";
            htmlChulo += "<a id='categorias' name='categorias' class='btn btn-primary categorias' href='#' role='button'>Categorias</a>";



            this.main.append(htmlChulo);
        }



    }

    // Evento, al clickar en "SkinBits", se ejecuta la acción.
    bindInit(handler) {
        $("#init").click((event) => {
            handler();
        })
    }

    // Evento relaccionado con mostrar una tienda y sus propiedades.
    showShop(data) {
        //console.log(data);
        // Reinicio el contenido del main.
        this.main.empty();

        this.main.append("<h1>" + data.name + " " + data.CIF + "</h1> <span>(Haz click en 'SkinBits' para volver...)</span>");
        let htmlChulo = "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Cantidad</th><th>Enlace</th><th>Nueva ventana</th></tr>"

        /* TODO MOSTRAR LAS CATEGORÍAS Y PRODUCTOS */
        for (let [key, value] of data.products.entries()) {
            //console.log(key+" "+value)
            htmlChulo += ("<tr><td>" + key.serialNumber + "</td><td>" + key.name + "</td><td>" + value + "</td> <td>  <a name='" + key.serialNumber + "' id='" + key.serialNumber + "' class='btn btn-primary producto' href='#' role='button'>Entrar</a>  </td>  <td> <a name='" + key.serialNumber + "' id='" + key.serialNumber + "' class='btn btn-primary nuevaVentana' href='#' role='button'>Abrir</a>  </td></tr>");
        }

        this.main.append(htmlChulo);

    }

    // Añado el nuevo evento posible para abrir nueva ventana. T6.1
    showNewWindow(data) {
        
        // Creo un botón para cerrar la ventana.
        let cerrarVentana = $('<button class="btn btn-danger m-1 cerramiento">Cerrar Ventana</button>');
        cerrarVentana.click((event) => {
            if (this.newWindow && !(this.newWindow.closed)) {
                this.newWindow.close();
                console.log('Acabas de cerrar la ventana.');
                // Elimino este propio botón tras activarlo.
                this.main.find(".cerramiento").remove();
            } else {
                console.log('La ventana está cerrada.');
            }
        });

        // Si no está abierta la ventana, la creo. Si lo está, la focuseo.
        if (!this.newWindow || this.newWindow.closed) {
            console.log("Abriendo nueva ventana...");
            this.newWindow = window.open("auxPage.html", "Ventana", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
            // Añado el botón para cerrar la nueva ventana.
            this.main.append(cerrarVentana);

            // Espero X tiempo a que "carge" la ventana antes de tocarla.
            /*
                NOTA:
                En mi torre 500ms es más que suficiente, pero bien es cierto
                que en mi portatil este tiempo tan justo hace cosas raras.
                Dejo la variable en caso de que explote.
            */
           let ms = 500;
            setTimeout(()=>{
                // Procedo a añadir contenido a esta nueva ventana.
                let productWindow = $(this.newWindow.document);
                let htmlChulo = "";
                if (data instanceof Technology) {
                    htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Marca</th></tr>"
                    htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.brand + "</td></tr>";
                } else if (data instanceof Food) {
                    htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Fecha caducidad</th></tr>"
                    htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.expirationDate + "</td></tr>";
        
                } else if (data instanceof Clothing) {
                    htmlChulo += "<table class='table table-dark'><tr><th>Nº Serie</th><th>Nombre producto</th><th>Descripción</th><th>Precio</th><th>Impuestos</th><th>Talla</th></tr>"
                    htmlChulo += "<tr><td>" + data.serialNumber + "</td><td>" + data.name + "</td><td>" + data.description + "</td><td>" + data.price + "€</td><td>" + data.tax + "%</td><td>" + data.size + "</td></tr>";
        
                }
                productWindow.find("main").append(htmlChulo);

            },ms);
            
        } else {
            console.log("Focus a ventana ya creada");
            this.newWindow.focus();
        }

    }
    bindShowNewWindow(handler) {
        $(".nuevaVentana").click((event) => {
            //console.log(event.target);
            handler(event.target.id);
        })
    }



    bindShowShop(handler) {
        // Afecta a todos los botones de las tiendas.
        $(".tienda").click((event) => {
            //console.log(event.target);
            // Le paso el ID ÚNICO del botón que ha producido el evento.
            handler(event.target.id);
        })
    }


    // Para mostrar las fichas de los productos.
    showProductFile(data) {
        this.main.empty();
        //console.log(data);
        //console.log(data instanceof Technology);
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
    }

    bindShowProductFile(handler) {
        $(".producto").click((event) => {
            handler(event.target.id);
        })
    }


    showCategorias(data) {
        this.main.empty();
        let htmlChulo = "";
        //console.log(data);

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

    }

    bindShowCategorias(handler) {
        $("#categorias").click((event) => {
            //console.log(event);
            handler();
        })
    }
}

export default StoreHouseView;