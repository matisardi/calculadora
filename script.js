var num = "";
var total = 0;
var pendiente = "";
var nuevoNum = 0;
var posUltimoSigno = 0;
var memoria = 0;
var funcionPrevia = 0;

function agregaDigito(digito) {
    if (funcionPrevia == 0) {
        if (pendiente == "=") {
            borrar();
        }
        if (nuevoNum == 1) {
            document.getElementById('verGrande').innerHTML = "";
            nuevoNum = 0;
        }
        num += digito;
        // console.log(num);
        actualizaVerChico(digito);
        actualizaVerGrande(digito);
    }
}

function operador(signo) {
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
    // console.log(total);
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

function actualizaVerChico(dato) {
    if (document.getElementById('verChico').innerHTML == 0) document.getElementById('verChico').innerHTML = "";
    document.getElementById('verChico').innerHTML += dato;
}

function actualizaVerGrande(dato) {
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
    document.getElementById('verChico').innerHTML = "0";
    document.getElementById('verGrande').innerHTML = "0";
}

function borrarUltimo() {
    if (num != "" && pendiente != "") {
        document.getElementById('verChico').innerHTML = document.getElementById('verChico').innerHTML.slice(0,-num.length);
    } else document.getElementById('verChico').innerHTML = "0";
    document.getElementById('verGrande').innerHTML = "0";
    num = "";
    funcionPrevia = 0;
}

function cambiaSigno() {
    let cadena = document.getElementById('verChico').innerHTML;
    if (num != "") {
        num = parseFloat(num) * (-1);
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
        num = Math.sqrt(num);
        document.getElementById('verGrande').innerHTML = num;
        funcionPrevia = 1;
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
        for (let i=1; i<=num; i++) resultado *= i;
        num = resultado;
        document.getElementById('verGrande').innerHTML = num;
        funcionPrevia = 1;
    }
}
