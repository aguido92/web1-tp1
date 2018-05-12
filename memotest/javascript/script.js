'uses strict';
// Variables
let btnComenzar = document.getElementById('btn-comenzar');
let btnReset = document.getElementById('btn-reset');
let tablero = document.getElementById('tablero');
let seleccionar = document.getElementById('seleccionar');
let casillas = document.querySelectorAll('img');
let marcadas = [];
let aciertos = 0;
let aciertosTotales = 0;
let errores = 0;
let erroresTotales = 0;
let descarte = [];
let ganadas = 0;
let tiempo = 3; // 3 segundos por defecto
let probMarca = 0.50; // 50% por defecto
////////////////////
let tabla = document.getElementById("tablaPartidas");
let filaActual = 1;

// Funciones
function empezarJuego() {
	crearTablero();
	visible(tablero);
	let pTiempo = document.getElementById('tiempo');
	let regresivo = tiempo;
	pTiempo.innerHTML = regresivo;
	let timer = setInterval(function(){
		regresivo--;
		pTiempo.innerHTML = regresivo;
	},1000);
	setTimeout(function() {
		clearInterval(timer);
		pTiempo.innerHTML = '';
		ocultarMarcas();
		visible(btnReset);
		visible(seleccionar);
		if (marcadas.length === 0) {
			finalizar();
		}
	},tiempo * 1000);
}

function crearTablero() {
	alert(probMarca);
    for (let i = 1; i <= casillas.length; i++) {
        if (i === 1 || Math.random() < probMarca) {
            document.getElementById('casillero' + i).src = 'images/marcada.jpg';
            marcadas.push(i);
        } else {
            document.getElementById('casillero' + i).src = 'images/comun.jpg';
        }
    }
}

function ocultarMarcas() {
    //for (let i of marcadas) {
    //    document.getElementById('casillero' + i).src = 'images/casilla.png';
    //}
	for (let img of casillas) {
        img.src = 'images/casilla.jpg';
    }
}

function ocultar(elem) {
    elem.classList.add('oculto');
}

function visible(elem) {
    elem.classList.remove('oculto');
}

function darVuelta(selected) {
    if (marcadas.includes(selected)) {
        if (!descarte.includes(selected)) {
            document.getElementById('casillero' + selected).src = 'images/marcada.jpg';
            aciertos ++;
            aciertosTotales ++;
            descarte.push(selected);
        } else {
            // alert('Casillero ' + selected + ' ya seleccionado.');
        }
    } else {
		if (!descarte.includes(selected)) {
			document.getElementById('casillero' + selected).src = 'images/comun.jpg';
			errores ++;
			erroresTotales ++;
			descarte.push(selected);
			//setTimeout(function() {
			//	document.getElementById('casillero' + selected).src = 'images/casilla.png';
			//},500);
		} else {
            // alert('Casillero ' + selected + ' ya seleccionado.');
        }
    }
}

function elegir(selected) {
    darVuelta(selected);
    actualizarResultados();
    if (aciertos === marcadas.length) {
        finalizar();
    }
}

/**************************/


function actualizarResultados() {

	tabla.rows[filaActual].cells[1].innerText = aciertos;
	tabla.rows[filaActual].cells[2].innerText = errores;
    document.getElementById('cant-aciertos-totales').innerHTML = aciertosTotales;
    document.getElementById('cant-errores-totales').innerHTML = erroresTotales;
}

function crearFilaTabla(){
	filaActual = filaActual+1;
	let fila = tabla.insertRow(filaActual);
	let columna0 = fila.insertCell(0);
	let columna1 = fila.insertCell(1);
	let columna2 = fila.insertCell(2);
	columna0.innerHTML = "Partida " + filaActual;
	columna1.innerHTML = 0;
	columna2.innerHTML = 0;
}

/******************************/
function finalizar() {
    ganadas ++;
	ocultar(seleccionar);
	setTimeout(function(){
		alert('Ganaste');
		if (ganadas % 3 === 0) {
			alert('Felicitaciones! Llevas ganado ' + ganadas + ' veces');
		}
	},500);
}

function resetVariables() { // Vuelve a cero los resultados de la partida ganada y los arreglos.
    marcadas.splice(0, marcadas.length);
    descarte.splice(0, descarte.length);
    aciertos = 0;
    errores = 0;
    seleccionar.selectedIndex = 0;
}



// Eventos
btnComenzar.addEventListener('click', function () { // Funcion que ejecuta al presionar el boton "Comenzar"
	let inputTiempo = document.getElementById('input-tiempo').value;
	if (inputTiempo.length !== 0) {
		tiempo = inputTiempo;
	}
	let inputProbabilibdad = document.getElementById('input-probabilidad').value;
	if (inputProbabilibdad.length !== 0) {
		probMarca = inputProbabilibdad / 100;
	}
	if (probMarca >= 0 && probMarca <= 1) {
		let botonera = document.getElementById('botonera');
		ocultar(botonera);
		empezarJuego();
	} else {
		alert('Ingrese una probabilidad entre 1 y 100');
	}
});

seleccionar.addEventListener('change', function () {
    let selected = seleccionar.selectedIndex;
    if (selected !== 0) {
        elegir(selected);
    }
});

btnReset.addEventListener('click', function(){
	ocultar(this);
	ocultar(tablero);
	ocultar(seleccionar);
	visible(botonera);
	resetVariables();
	crearFilaTabla();
	//actualizarResultados();
	//crear nuevo td(), filaActual++;
});