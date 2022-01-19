"use strict";

// Función para comprobar que no ha explotado nada aún.
function msg(message) {
    document.getElementById("msg").innerHTML += message;
}

// Expresiones regulares usadas a lo largo del ejercicio.
const EXP_DNI = /^\d{8}[A-Z]$/; // 8 nº y cualquier letra.
const VALID_DEGREE = /\b(?:bachelor|vocacional|other|Bachelor|Vocacional|Other)\b/; // Solo 1 de esas palabras.


/* ++++++++++++++++++++++++++++++++++++++++ Definición de objetos varios ++++++++++++++++++++++++++++++++++++++++ */

/*
    Objeto para mostrar los errores.
    "n" es el mensage personalizado.
    Como no te gustó el sistema de números, las excepciones ahora se escriben en el
    try-catch, sin haber mensajes predeterminados.
*/
function MyError(n) {
    this.msg = "||> ERROR - " + n;
}
// Heredo los atributos de la clase Error.
MyError.prototype = Object.create(Error.prototype);
MyError.prototype.constructor = MyError;


function Course(name, students, tutor) {
    if (name.length == 0) {
        throw new MyError("Se requiere un nombre para el curso.");
    } else {
        this.name = name;
    }
    if (students <= 0) {
        throw new MyError("El curso debe de tener al menos un alumno.");
    } else {
        this.students = students;
    }
    if (tutor instanceof Professor) {
        this.tutor = tutor;
    } else {
        throw new MyError("Esta persona no es un Profesor.");
    }



    // Atributos privados de Course, las listas de alumnos.
    let _bachelor = [];
    let _vocacional = [];
    let _other = [];
    Object.defineProperty(this, 'bachelor', {
        get: function() {
            return _bachelor;
        }
    });
    Object.defineProperty(this, 'vocacional', {
        get: function() {
            return _vocacional;
        }
    });
    Object.defineProperty(this, 'other', {
        get: function() {
            return _other;
        }
    });

    // Función añadida del apartado 2.2
    this.doApplication = function(student) {
        if (student.degree == "bachelor") {
            // Compruebo que no exista ya dicho alumno en el curso.
            _bachelor.forEach(a => {
                if (student.DNI == a.DNI) throw new MyError("Este alumno ya se encuentra preinscrito en este curso.");
            });
            _bachelor.push(student); // Meto al alumno.
            // Ordeno por la nota media de los estudiantes.
            _bachelor.sort((a, b) => (a.grade > b.grade) ? -1 : (a.grade < b.grade) ? 1 : 0);
        } else if (student.degree == "vocacional") {
            _vocacional.push(student);
            _vocacional.sort((a, b) => (a.grade > b.grade) ? -1 : (a.grade < b.grade) ? 1 : 0);
        } else { // Si llega aquí, es "other". No hay otra posibilidad.
            _other.push(student);
            _other.sort((a, b) => (a.grade > b.grade) ? -1 : (a.grade < b.grade) ? 1 : 0);
        }
    }

    // Estas funciones ayudan al testeo del ejercicio.
    this.showStudentsFromBachelor = function() {
        return _bachelor.join(" **** ");
    }
    this.showStudentsFromVocacional = function() {
        return _vocacional.join(" **** ");
    }
    this.showStudentsFromOther = function() {
        return _other.join(" **** ");
    }
}
// Getters y setters de Course
Course.prototype.getName = function() {
    return this.name;
};
Course.prototype.getStudents = function() {
    return this.students;
};
Course.prototype.setStudents = function(newStudents) {
    if (newStudents <= 0) {
        throw new MyError("El curso debe de tener al menos un alumno.");
    } else {
        this.students = newStudents;
    }
};
Course.prototype.getTutor = function() {
    return this.tutor;
};
Course.prototype.setTutor = function(newTutor) {
    if (newTutor instanceof Professor) {
        this.tutor = newTutor;
    } else {
        throw new MyError("Esta persona no es un Profesor.");
    }
};



/* ++++++++++++++++++++++++++++++++++++++++ Definición de objetos abstractos y herederos ++++++++++++++++++++++++++++++++++++++++ */
(function() {
    let abstractCreateLock = false; // Cerrojo para la clase abstracta.
    // console.log("Se ha creado el cerrojo.");

    function Person() {
        if (abstractCreateLock) throw new MyError("No se puede instanciar la clase abstracta Person.");
        abstractCreateLock = true; // Lo activamos el cerrojo.
        this.Name = "";
        this.DNI = "";
        this.birth = ""; // No pide expresión regular?
    }
    // Defino las funciones de la clase abstracta.
    Person.prototype = {};
    Person.prototype.toString = function() {
        return this.Name + " - " + this.DNI + " - " + this.birth;
    }
    Person.prototype.getName = function() {
        return this.Name;
    };
    Person.prototype.getDNI = function() {
        return this.DNI;
    };
    Person.prototype.getBirth = function() {
        return this.birth;
    }; // Considero que no es necesario hacer setters para los atributos de Person.


    function Student(Name, DNI, birth, degree, grade) {
        abstractCreateLock = false; // Quito el cerrojo.
        Person.call(this); // Heredo las propiedades de Person.
        if (Name.length == 0) {
            throw new MyError("Se requiere un nombre.");
        } else {
            this.Name = Name;
        }
        // Compruebo que el DNI sea el correcto.
        if (DNI.match(EXP_DNI)) {
            this.DNI = DNI;
        } else {
            throw new MyError("DNI incorrecto.");
        }
        //DNI.match(EXP_DNI) ? this.DNI = DNI : throw new MyError("DNI incorrecto."); Esto no me va y no se por qué?
        if (birth.length == 0) {
            throw new MyError("Se requiere una fecha de nacimiento.");
        } else {
            this.birth = birth;
        }
        if (degree.match(VALID_DEGREE)) {
            this.degree = degree;
        } else {
            throw new MyError("Curso no reconocido o inválido.");
        }
        if (grade < 0 || grade > 10) {
            throw new MyError("Nota media no válida.");
        } else {
            this.grade = grade;
        }
    }
    // Heredo las funciones de la clase abstracta y las ajusto al nuevo objeto
    Student.prototype = Object.create(Person.prototype);
    Student.prototype.toString = function() {
        return this.Name + " - " + this.DNI + " - " + this.birth + " - " + this.degree + " - " + this.grade;
    }
    Student.prototype.getDegree = function() {
        return this.degree;
    };
    Student.prototype.getGrade = function() {
        return this.grade;
    };
    // El curso y la nota varían, pero el nombre, DNI y demases, no.
    Student.prototype.setDegree = function(newDegree) {
        if (newDegree.match(VALID_DEGREE)) {
            this.degree = newDegree;
        } else {
            throw new MyError("Curso no reconocido o inválido.");
        }
    };
    Student.prototype.setGrade = function(newGrade) {
        this.grade = newGrade;
    };


    function Professor(Name, DNI, birth) {
        abstractCreateLock = false; // Quito el cerrojo.
        Person.call(this); // Heredo las propiedades de Person.
        if (Name.length == 0) {
            throw new MyError("Se requiere un nombre.");
        } else {
            this.Name = Name;
        }
        if (DNI.match(EXP_DNI)) {
            this.DNI = DNI;
        } else {
            throw new MyError("DNI incorrecto.");
        }
        if (birth.length == 0) {
            throw new MyError("Se requiere una fecha de nacimiento.");
        } else {
            this.birth = birth;
        }
    }
    Professor.prototype = Object.create(Person.prototype);
    // Heredo el toString(), pero no necesito modificarlo.


    // Activo el cerrojo.
    abstractCreateLock = true;
    window.Person = Person;
    window.Student = Student;
    window.Professor = Professor;

})();


/* ++++++++++++++++++++++++++++++++++++++++ Definición del objeto Singleton ++++++++++++++++++++++++++++++++++++++++ */
let HighSchool = (function() {
    let instantiated; // Guara la instancia única.

    function init() {
        // No posee ningún campo privado.
        return {
            // Atributos públicos.
            Name: "IES Maestre de Calatrava",
            courses: new Map(),
            addCourse: function(course) {
                if (course instanceof Course) {
                    // Comprobado que sea un Course, se mira que no esté repetido.
                    if (this.courses.has(course.name)) {
                        throw new MyError("Este curso ya está registrado.");
                    }
                    this.courses.set(course.name, course); // La clave es el nombre, el valor, todo el objeto.
                } else {
                    throw new MyError("Este curso no es válido o es incorrecto.");
                }
            },
            removeCourse: function(course) {
                if (!this.courses.delete(course.name)) throw new MyError("No se ha encontrado el curso a eliminar.");
            },
            // Esta función es para facilitar el testeo.
            // Transformo el mapa en array con las claves y hago un Join.
            showCourses: function() {
                return (Array.from(this.courses.keys())).join(" - ");
            }
        }
    }
    return { // Devuelvo el objeto con un getInstance()
        getInstance: function() {
            if (!instantiated) {
                // Si no está instanciado, lo inicia.
                instantiated = init();
            }
            return instantiated; // Devuelve la instancia ya creada o recien iniciada.
        }

    }


})();


/* ++++++++++++++++++++++++++++++++++++++++ Funciones de testeo principal ++++++++++++++++++++++++++++++++++++++++ */

function testPerson() {
    console.log("+ + + + + + + + Comenzando el testeo sobre Person.");
    console.log("");
    // Intento instanciar un objeto Person.
    console.log("Instanciando el objeto Person...");
    try {
        let objetoPerson = new Person();
    } catch (err) { console.log(err.msg) }


    // El objeto estudiante principal.
    console.log("Instanciando el objeto Student...");
    let estudiante1 = new Student("David Véliz Fernández", "06291715L", "09/05/2000", "bachelor", 7);
    console.log("Atributos de estudiante1: " + estudiante1.toString());

    // Objeto Professor
    console.log("Instanciando el objeto Professor...");
    let profe1 = new Professor("Pablo Lizano", "09461529N", "09/03/1900"); // Por poner algo.
    console.log("Atributos de profe1: " + profe1.toString());

    // Comprobación de propiedades obligatorias.
    console.log("Instanciando el objeto Student y Professor con atributos obligatorios vacíos.");
    try {
        let objetoMal = new Student("", "06292715L", "09/05/2000", "Bach", 7);
    } catch (err) { console.log(err.msg) }
    try {
        let objetoMal = new Student("AAA", "06239715L", "", "Bach", 7);
    } catch (err) { console.log(err.msg) }

    // Comprobación de propiedades no-válidas o incorrectas.
    console.log("Instanciando el objeto Student y Professor con DNI incorrecto...");
    try {
        let objetoMal = new Student("David Véliz Fernández", "0629715L", "09/05/2000", "Bach", 7);
    } catch (err) { console.log(err.msg) }
    try {
        let profe1 = new Professor("Pablo Lizano", "09461529", "09/03/1900"); // Por poner algo.
    } catch (err) { console.log(err.msg) }
    console.log("Instanciando el objeto Student con un degree no válido...");
    try {
        let objetoMal = new Student("David Véliz Fernández", "06297152L", "09/05/2000", "Bach", 7);
    } catch (err) { console.log(err.msg) }
    console.log("Instanciando el objeto Student con un grade no válido...");
    try {
        let objetoMal = new Student("David Véliz Fernández", "06297152L", "09/05/2000", "other", -9);
    } catch (err) { console.log(err.msg) }

    // Pruebo unos cuantos getters y setters. Las excepciones del set son las mismas que al instanciar.
    console.log("");
    console.log("Iniciando pruebas sobre getters y setters...");
    console.log("Nombre de estudiante1: " + estudiante1.getName());
    console.log("DNI de estudiante1: " + estudiante1.getDNI());
    console.log("Curso de estudiante1: " + estudiante1.getDegree());
    console.log("Nota media de estudiante1: " + estudiante1.getGrade());
    console.log("Nombre y DNI de profe1: " + profe1.getName() + " - " + profe1.getDNI());
    console.log("Modificando nota y curso de estudiante1...");
    estudiante1.setDegree("other");
    estudiante1.setGrade(3);
    console.log("Atributos de estudiante1: " + estudiante1.toString());
}

function testCourseSinListas() {
    let estudiante1 = new Student("David Véliz Fernández", "06291715L", "09/05/2000", "bachelor", 7);
    let profe1 = new Professor("Pablo Lizano", "09461529N", "09/03/1900"); // Por poner algo.


    console.log("+ + + + + + + + Comenzando el testeo sobre Course.");
    console.log("");
    // Intento instanciar un objeto Course de varias formas incorrectas.
    console.log("Instanciando el objeto Course de formas incorrectas...");
    try { // Sin nombre de curso.
        let courseMal = new Course("", 3, profe1);
    } catch (err) { console.log(err.msg) }
    try { // Sin alumnos que puedan matricularse.
        let courseMal = new Course("DAW", 0, profe1);
    } catch (err) { console.log(err.msg) }
    try { // Sin un profesor.
        let courseMal = new Course("DAW", 3, estudiante1);
    } catch (err) { console.log(err.msg) }
    // Creando un curso válido.
    console.log("");
    console.log("Creando el curso DAW...");
    let daw = new Course("DAW", 20, profe1);
}

function testHighSchool() {
    let estudiante1 = new Student("David Véliz Fernández", "06291715L", "09/05/2000", "bachelor", 7);
    let profe1 = new Professor("Pablo Lizano", "09461529N", "09/03/1900"); // Por poner algo.

    console.log("+ + + + + + + + Comenzando el testeo sobre HighSchool.");
    console.log("");
    console.log("Mostrando la instancia actual: ");
    console.log(HighSchool.getInstance());

    // Intento instanciar un objeto Course de varias formas incorrectas.
    let instanciaChula1 = HighSchool.getInstance();
    let instanciaChula2 = HighSchool.getInstance();
    console.log("Guardadas dos instancias... ¿Son la misma?");
    console.log(instanciaChula1 === instanciaChula2);

    // Creo un nuevo Curso. El testeo está en otra función.
    let daw = new Course("DAW", 20, profe1);
    let dam = new Course("DAM", 10, profe1);
    let asir = new Course("ASIR", 15, profe1);
    console.log("");
    console.log("Añadiendo cursos a HighSchool...");
    HighSchool.getInstance().addCourse(daw);
    HighSchool.getInstance().addCourse(dam);
    HighSchool.getInstance().addCourse(asir);
    console.log("Cursos registrados: " + HighSchool.getInstance().showCourses());

    // Elimino algún curso.
    console.log("Eliminando DAM de HighSchool...");
    HighSchool.getInstance().removeCourse(dam);
    console.log("Cursos registrados: " + HighSchool.getInstance().showCourses());
    console.log("");

    // Control de expecciones en HighSchool.
    console.log("Añadiendo curso repetido a HighSchool...");
    try {
        HighSchool.getInstance().addCourse(daw);
    } catch (err) { console.log(err.msg) }
    console.log("Eliminando un curso inexistente...");
    try {
        HighSchool.getInstance().removeCourse(dam);
    } catch (err) { console.log(err.msg) }



}

function testNewCourse() {
    let estudiante1 = new Student("David Véliz Fernández", "06291715L", "09/05/2000", "bachelor", 7);
    let estudiante2 = new Student("María", "09521715L", "09/05/2000", "bachelor", 3);
    let estudiante3 = new Student("Aura", "06299785B", "09/05/2000", "vocacional", 4);
    let estudiante4 = new Student("Alex", "22191987S", "09/05/2000", "bachelor", 8);
    let profe1 = new Professor("Pablo Lizano", "09461529N", "09/03/1900"); // Por poner algo.
    let daw = new Course("DAW", 20, profe1);
    let dam = new Course("DAM", 10, profe1);
    let asir = new Course("ASIR", 15, profe1);


    console.log("+ + + + + + + + Comenzando el testeo sobre Course tras el apartado 2.2.");
    console.log("");
    // Añado alumnos a los cursos.
    console.log("Añado alumnos al curso de DAW.");
    daw.doApplication(estudiante1);
    daw.doApplication(estudiante2);
    daw.doApplication(estudiante4);
    daw.doApplication(estudiante3);
    console.log("Mostrando estudiantes de DAW con procedencia de Bachillerato: ");
    console.log(daw.showStudentsFromBachelor());

    // Comprobación de errores.
    console.log("");
    console.log("Añadiendo alumno ya preinscrito...");
    try {
        daw.doApplication(estudiante1);
    } catch (err) { console.log(err.msg) }


}

/*
    NOTA
    Los demás test han sido creados según la aplicación se iba desarrollando.
    Los dejo ahí por si los quieres ver, pero es en este donde exclusivamente
    compruebo punto por punto lo que piden en el apartado 3 del ejercicio, sin
    dar demasiados rodeos. El testeo detallado está en las demás funciones.
*/
function testObligatorio() {
    console.log("+ + + + + + + + Comenzando el obligatorio de la práctica.");
    console.log("");
    // Propiedades de Objetos Student.
    console.log("Propiedades de Objetos Student.");
    let estudiante1 = new Student("David Véliz Fernández", "06291715L", "09/05/2000", "bachelor", 7);
    console.log("Atributos de estudiante1: " + estudiante1.toString());

    // Propiedades de Objetos Professor.
    console.log("");
    console.log("Propiedades de Objetos Professor.");
    let profe1 = new Professor("Pablo Lizano", "09461529N", "09/03/1900"); // Por poner algo.
    console.log("Atributos de profe1: " + profe1.toString());

    // El objeto Person no se puede instanciar.
    console.log("");
    console.log("El objeto Person no se puede instanciar.");
    try {
        let objetoPerson = new Person();
    } catch (err) { console.log(err.msg) }

    // Propiedades del objeto Course.
    console.log("");
    console.log("Propiedades del objeto Course.");
    let daw = new Course("DAW", 20, profe1);
    console.log(daw.name + " - " + daw.students + " - " + daw.tutor.DNI); // DNI por no poner todo el objeto.

    // El objeto HighSchool es único.
    console.log("");
    console.log("El objeto HighSchool es único.");
    let instanciaChula1 = HighSchool.getInstance();
    let instanciaChula2 = HighSchool.getInstance();
    console.log("Guardadas dos instancias... ¿Son la misma? " + (instanciaChula1 === instanciaChula2));

    // Asignar un tutor a un Course.
    console.log("");
    console.log("Asignar un tutor a un Course.");
    let profe2 = new Professor("Antonio", "09473006N", "09/03/1900");
    console.log(daw.getTutor().DNI);
    console.log("Reasignando un profesor...");
    daw.setTutor(profe2);
    console.log(daw.getTutor().DNI);


    // Añadir un objeto Course al HighSchool comprobando que si existe se genera una excepción.
    console.log("");
    console.log("Añadir un objeto Course al HighSchool comprobando que si existe se genera una excepción.");
    let dam = new Course("DAM", 10, profe1);
    let asir = new Course("ASIR", 15, profe1);
    HighSchool.getInstance().addCourse(daw);
    HighSchool.getInstance().addCourse(dam);
    HighSchool.getInstance().addCourse(asir);
    console.log("Añadiendo curso repetido...");
    try {
        HighSchool.getInstance().addCourse(daw);
    } catch (err) { console.log(err.msg) }

    // Borrar un objeto Course de HighSchool.
    console.log("");
    console.log("Borrar un objeto Course de HighSchool.");
    console.log("Cursos registrados: " + HighSchool.getInstance().showCourses());
    HighSchool.getInstance().removeCourse(dam);
    console.log("Cursos registrados: " + HighSchool.getInstance().showCourses());

    // Recorrer objetos Course de HighSchool.
    console.log("");
    //console.log("Recorrer objetos Course de HighSchool.");
    /*
        TODO
    */

    // Añadir alumnos que aplican a un curso mediante doApplication().
    console.log("");
    console.log("Añadir alumnos que aplican a un curso mediante doApplication().");
    let estudiante2 = new Student("María", "09521715L", "09/05/2000", "bachelor", 3);
    let estudiante3 = new Student("Aura", "06299785B", "09/05/2000", "vocacional", 4);
    let estudiante4 = new Student("Alex", "22191987S", "09/05/2000", "bachelor", 8);
    daw.doApplication(estudiante1);
    daw.doApplication(estudiante2);
    daw.doApplication(estudiante4);
    daw.doApplication(estudiante3);
    console.log("Alumnos procedentes de Bachillerato: ");
    console.log(daw.showStudentsFromBachelor());
    console.log("De vocacional: ");
    console.log(daw.showStudentsFromVocacional());
    console.log("De other: ");
    console.log(daw.showStudentsFromOther()); // No he metido ninguno.

    // Recuperar alumnos admitidos de un curso.
    console.log("");
    //console.log("Recuperar alumnos admitidos de un curso.");
    /*
        TODO
    */

}

function testTodo() {
    //testPerson();
    //testCourseSinListas();
    //testHighSchool();
    //testNewCourse();
    testObligatorio();
}

window.onload = testTodo;

/*
    TODO:
    - Saber como furulan las clases abstractas
    - Cosas de Person
        - Atributos en general, constructores y cosas válidas.
        - Atributos privados.
        - Expresión regular en DNI.
        - Lo de los cursos, que solo sean X cosas.
    - Course como objeto normal y listas de alumnos.
        - Atributos privados y mierdas de Course
            - Atributo de tutor con objeto Professor y excepciones.
        - Propiedad "courses" mediante un iterador.
            - Lo de los porcentajes de admitidos?
    - HighSchool como Singleton, un objeto único.
    - Getter y setter como nos salga del pito.
    


*/