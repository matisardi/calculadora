var num = "";               // guarda el número que se está ingresando
var total = 0;              // va guardando el total
var pendiente = "";         // guarda la última operación ingresada
var nuevoNum = 0;           // flag para cuando se ingresa un nuevo número
var posUltimoSigno = 0;     // guarda la posición del último signo ingresado
var memoria = 0;            // buffer que funciona con las teclas de memoria
var funcionPrevia = 0;      // flag que indica si hubo una función previa (por ejemplo raíz cuadrada)
var error = 0;              // flag para cuando hay un error

function agregaDigito(digito) {
    if (error == 1) borrarUltimo();
    if (funcionPrevia == 0) {
        if (pendiente == "=") {
            borrar();
        }
        if (nuevoNum == 1) {
            document.getElementById('verGrande').innerHTML = "";
            nuevoNum = 0;
        }
        num += digito;
        actualizaVerChico(digito);
        actualizaVerGrande(digito);
    }
}

function operador(signo) {
    if (error == 1) borrarUltimo();
    if (num != "") {
        switch (pendiente) {
            case "":
            case "+":
                total += parseFloat(num);
                break;
            case "-":
                total -= parseFloat(num);
                break;
            case "*":
                total *= parseFloat(num);
                break;
            case "/":
                total /= parseFloat(num);
                break;
            case "%":
                total %= parseFloat(num);
                break;
        }
    }
    if (pendiente != "=") {
        if (num == "") document.getElementById('verChico').innerHTML = document.getElementById('verChico').innerHTML.slice(0,-1);
        actualizaVerChico(signo);
        document.getElementById('verGrande').innerHTML = "";
        actualizaVerGrande(total);
    } else if (signo != "=") {
        document.getElementById('verChico').innerHTML = "";
        num = total + signo;
        actualizaVerChico(num);
    }
    posUltimoSigno = document.getElementById('verChico').innerHTML.length - 1;
    pendiente = signo;
    num = "";
    nuevoNum = 1;
    funcionPrevia = 0;
}

function actualizaVerChico(dato) {          // agrega en el display chico el dato parámetro
    if (document.getElementById('verChico').innerHTML == 0) document.getElementById('verChico').innerHTML = "";
    document.getElementById('verChico').innerHTML += dato;
}

function actualizaVerGrande(dato) {         // agrega en el display grande el dato parámetro
    if (document.getElementById('verGrande').innerHTML == 0) document.getElementById('verGrande').innerHTML = "";
    document.getElementById('verGrande').innerHTML += dato;
}

function borrar() {
    num = "";
    total = 0;
    pendiente = "";
    nuevoNum = 0;
    posUltimoSigno = 0;
    funcionPrevia = 0;
    error = 0;
    document.getElementById('verChico').innerHTML = "0";
    document.getElementById('verGrande').innerHTML = "0";
}

function borrarUltimo() {
    if (num != "" && pendiente != "") {
        document.getElementById('verChico').innerHTML = document.getElementById('verChico').innerHTML.slice(0,posUltimoSigno + 1);
    } else document.getElementById('verChico').innerHTML = "0";
    document.getElementById('verGrande').innerHTML = "0";
    num = "";
    funcionPrevia = 0;
    error = 0;
}

function cambiaSigno() {
    let cadena = document.getElementById('verChico').innerHTML;
    if (num != "") {
        num = "-" + num;
        if (posUltimoSigno == 0) {
            cadena = "-" + cadena;
        } else cadena = cadena.slice(0, posUltimoSigno + 1) + "-" + cadena.slice(posUltimoSigno + 1);
        document.getElementById('verChico').innerHTML = "";
        document.getElementById('verGrande').innerHTML = "";
        actualizaVerChico(cadena);
        actualizaVerGrande(num);
    }
}

function memory(accion) {
    switch (accion) {
        case "+":
            memoria += parseFloat(document.getElementById('verGrande').innerHTML);
            break;
        case "-":
            memoria -= parseFloat(document.getElementById('verGrande').innerHTML);
            break;
        case "S":
            memoria = parseFloat(document.getElementById('verGrande').innerHTML);
            break;
        case "C":
            memoria = 0;
            break;
        case "R":
            document.getElementById('verChico').innerHTML = document.getElementById('verChico').innerHTML.slice(0,-num.length);
            actualizaVerChico(memoria);
            document.getElementById('verGrande').innerHTML = memoria;
            num = memoria;
    }
}

function raizCuadrada() {
    if (funcionPrevia == 0) {
        document.getElementById('verChico').innerHTML = document.getElementById('verChico').innerHTML.slice(0,-num.length);
        actualizaVerChico(`sqrt(${num})`);
        if (num >= 0) {
            num = Math.sqrt(num);
            document.getElementById('verGrande').innerHTML = num;
            funcionPrevia = 1;
        } else {
            document.getElementById('verGrande').innerHTML = "Dato inválido"
            error = 1;
        }
    }
}

function cuadrado() {
    if (funcionPrevia == 0) {
        document.getElementById('verChico').innerHTML = document.getElementById('verChico').innerHTML.slice(0,-num.length);
        actualizaVerChico(`${num}**2`);
        num = num ** 2;
        document.getElementById('verGrande').innerHTML = num;
        funcionPrevia = 1;
    }
}

function inv() {
    if (funcionPrevia == 0) {
        document.getElementById('verChico').innerHTML = document.getElementById('verChico').innerHTML.slice(0,-num.length);
        actualizaVerChico(`(1/${num})`);
        num = 1 / num;
        document.getElementById('verGrande').innerHTML = num;
        funcionPrevia = 1;
    }
}

function numeral() {
    if (funcionPrevia == 0) {
        let resultado = 1;
        document.getElementById('verChico').innerHTML = document.getElementById('verChico').innerHTML.slice(0,-num.length);
        actualizaVerChico(`${num}!`);
        if (num >= 0) {
            for (let i=1; i<=num; i++) resultado *= i;
            num = resultado;
            document.getElementById('verGrande').innerHTML = num;
            funcionPrevia = 1;
        } else {
            document.getElementById('verGrande').innerHTML = "Dato inválido"
            error = 1;
        }
    }
}
