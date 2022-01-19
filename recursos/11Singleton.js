"use strict";

//Patrón Singleton
//Más que un patrón, el ejemplo del paper es un mecanismo para activar o desactivar la ejecución de un método.
//Tenemos dos formas de hacerlo, con declaración en un objeto literal o mediante constructor.
//El ejemplo construye un sistema de logs.

function testSingletonV1(){
	//Declaración mediante objeto literal
	let Logger1 = { //Definimos el objeto
		enabled:true, //La propieda enabled dice si se puede ejecutar el método o no.
		log: function(logText){ //Asociamos un método al objeto
			if(!this.enabled) // Comprobamos si la propiedad está activa para ejecutar el método
				return; // Si no está activa salimos del método. Podríamos lanzar una excepción también.
			if(console && console.log) // Ejecutamos el método. Si existe el objeto consola se muestra el mensaje por la consola.
				console.log(logText);
			else //Si no existe se muestra la alerta en la página.
				alert(logText);
		}
	}

	function Logger2(){ //Función constructora. Aunque no es necesario instanciar un objeto.
		throw new Error("You can't create a new Logger object.");
	}
	Logger2.enabled = true; //La propieda enabled dice si se puede ejecutar el método o no.
	Logger2.log = function(logText){ //Asociamos un método a la función. El método es estático
		if(!Logger2.enabled) // Comprobamos si la propiedad está activa para ejecutar el método
			return; // Si no está activa salimos del método. Podríamos lanzar una excepción también.
			if(console && console.log) // Ejecutamos el método. Si existe el objeto consola se muestra el mensaje por la consola.
				console.log(logText);
			else //Si no existe se muestra la alerta en la página.
				alert(logText);
	};

	cleanMessage();
	addMessage("Abre la cosola para comprobar los resultados de la ejecución.");
	Logger1.log("test"); // test
	Logger1.enabled = false;
	Logger1.log("test"); //

	Logger2.log("test2"); // test
	Logger2.enabled = false;
	Logger2.log("test2"); //
}

//Creamos el objeto Singleton que permitirá crear la instancia. Se hace uso de clousure.
function testSingletonPattern(){
	let Singleton = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
		let instantiated; //Atributo privado que permite guardar la única instancia creada.

		function init() { //Este método se ejecuta una única vez y es el utilizado para crear la única instancia del objeto.
			// singleton here

				// Private methods and variables. Elementos que son privados al objeto, solo accesibles a través de clousure
				function privateMethod(){
						console.log("I am private");
				}
				let privateVariable = "Im also private";
				let privateRandomNumber = Math.random();

			return { // Devuelve el objeto que será único. Funciona como un clousure
				publicMethod: function () {
					return 'publicMethod unique instance';
				},
				publicProperty: 'publicProperty unique instance',
				getRandomNumber: function() { //Propiedad que permite acceder a los atributos privados. Closure
					return privateRandomNumber;
				}
			};
		}
		return {
			// Devuelve un objeto con el método getInstance
			getInstance: function () {
				if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
					instantiated = init(); //instantiated contiene el objeto único
				}
				return instantiated; //Si ya está asignado devuelve la asignación.
			}
		};
	})();
	// calling public methods is then as easy as:
	// Para obtener el objeto único invocamos getInstance de la variable global Singleton, la cual siempre devuelve la misma instancia.
	cleanMessage();
	addMessage(Singleton.getInstance().publicMethod()); //publicMethod unique instance
	addMessage(Singleton.getInstance().publicProperty); //publicProperty unique instance
	addMessage(Singleton.getInstance().getRandomNumber()); //Random number.
	let instance1 = Singleton.getInstance();
	let instance2 = Singleton.getInstance();
	//Chequeamos si las dos instancias son el mismo objeto.
	addMessage(instance1 === instance2); //true
}
