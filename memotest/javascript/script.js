'use strict';
// Variables de acceso al HTML
let btnComenzar = document.getElementById('btn-comenzar');
let btnReset = document.getElementById('btn-reset');
let tablero = document.getElementById('tablero');
let seleccionar = document.getElementById('seleccionar');
let casillas = document.querySelectorAll('img');
let tabla = document.getElementById("cuerpoTabla");
//inicialización de variables locales
let marcadas = [];
let aciertos = 0;
let aciertosTotales = 0;
let errores = 0;
let erroresTotales = 0;
let descarte = [];
let ganadas = 0;
let tiempo = 3; // 3 segundos por defecto
let probMarca = 0.50; // 50% por defecto
let filaActual = 0;



// Funciones internas
/* muestra el tiempo disponible antes de dar vuelta
(dejar "boca abajo") las cartas para que inicie el 
juego. Luego las oculta y prepara la página para que
el usuario pueda jugar.*/
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

/* genera el random para saber que cartas están marcadas, 
cambia la imagen correspondiente (las "da vuelta"), 
y guarda los índices de las cartas marcadas.*/
function crearTablero() {
    for (let i = 1; i <= casillas.length; i++) {
        if (i === 1 || Math.random() < probMarca) {
            document.getElementById('casillero' + i).src = 'images/marcada.jpg';
            marcadas.push(i);
        } else {
            document.getElementById('casillero' + i).src = 'images/comun.jpg';
        }
    }
}

/* deja "boca abajo" las cartas, para que comience a jugar el usuario.*/
function ocultarMarcas() {
	for (let img of casillas) {
        img.src = 'images/casilla.jpg';
    }
}

/* oculta (vuelve invisible) el elemento pasado por parámetro.*/
function ocultar(elem) {
    elem.classList.add('oculto');
}

/* deja de ocultar (vuelve visible) el elemento pasado por parámetro.*/
function visible(elem) {
    elem.classList.remove('oculto');
}

/* muestra (deja "boca arriba") la carta seleccionada por el usuario
(solo en caso que esa carta no haya sido previamente seleccionada.*/
function darVuelta(selected) {
	if (!descarte.includes(selected)){
		descarte.push(selected);
		if (marcadas.includes(selected)) {
			document.getElementById('casillero' + selected).src = 'images/marcada.jpg';
            aciertos ++;
            aciertosTotales ++;
		}
		else{
			document.getElementById('casillero' + selected).src = 'images/comun.jpg';
			errores ++;
			erroresTotales ++;
		}
	}
}

/* disparador de funciones, que realiza la lógica de mostrar la carta
seleccionada por el usuario, actualizar resultados y felicitarlo en 
caso de haber terminado el juego.*/
function elegir(selected) {
    darVuelta(selected);
    actualizarResultados();
    if (aciertos === marcadas.length) {
        finalizar();
    }
}

/* actualiza la tabla de aciertos y fallas (actuales y totales).*/
function actualizarResultados() {
	tabla.rows[filaActual].cells[1].innerText = aciertos;
	tabla.rows[filaActual].cells[2].innerText = errores;
    document.getElementById('cant-aciertos-totales').innerHTML = aciertosTotales;
    document.getElementById('cant-errores-totales').innerHTML = erroresTotales;
}

/* inserta una nueva fila de aciertos y fallas actuales.*/
function crearFilaTabla(){
	filaActual = filaActual+1;
	let fila = tabla.insertRow(filaActual);
	let columna0 = fila.insertCell(0);
	let columna1 = fila.insertCell(1);
	let columna2 = fila.insertCell(2);
	let numPartida = filaActual+1;
	columna0.innerHTML = "Partida " + numPartida;
	columna1.innerHTML = 0;
	columna2.innerHTML = 0;
}

/* actualiza la cantidad de partidas finalizadas, y felicita al
usuario cada 3 partidas concecutivas.*/
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

/* al volver a jugar, reinicia las variables y arreglos que se utilizan.*/
function resetVariables() { 
    marcadas.splice(0, marcadas.length);
    descarte.splice(0, descarte.length);
    aciertos = 0;
    errores = 0;
    seleccionar.selectedIndex = 0;
}



// Eventos
/* Funcion que ejecuta ante el evento: presionar el boton "Comenzar"*/
btnComenzar.addEventListener('click', function () { 
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

/* Funcion que ejecuta ante el evento: cambio de selección del usuario*/
seleccionar.addEventListener('change', function () {
    let selected = seleccionar.selectedIndex;
    if (selected !== 0) {
        elegir(selected);
    }
});

/* Funcion que ejecuta ante el evento: presionar el boton "Partida Nueva"*/
btnReset.addEventListener('click', function(){
	ocultar(this);
	ocultar(tablero);
	ocultar(seleccionar);
	visible(botonera);
	resetVariables();
	crearFilaTabla();
});