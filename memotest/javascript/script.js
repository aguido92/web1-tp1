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
let time = 3; // 3 segundos por defecto
let probMarca = 50; // 50% por defecto

// Funciones
function empezarJuego() {
	crearTablero();
	visible(tablero);
	let pTime = document.getElementById('time');
	let regresivo = time;
	pTime.innerHTML = regresivo;
	let timer = setInterval(function(){
		regresivo--;
		pTime.innerHTML = regresivo;
	},1000);
	setTimeout(function() {
		clearInterval(timer);
		pTime.innerHTML = '';
		ocultarMarcas();
		visible(btnReset);
		visible(seleccionar);
		if (marcadas.length === 0) {
			finalizar();
		}
	},time * 1000);
}

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

function ocultarMarcas() {
    //for (let i of marcadas) {
    //    document.getElementById('casillero' + i).src = 'images/casilla.png';
    //}
	for (let img of casillas) {
        img.src = 'images/casilla.png';
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
			let mensaje = document.getElementById('mensaje-falla');
			//visible(mensaje);
			//setTimeout(function() {
			//	document.getElementById('casillero' + selected).src = 'images/casilla.png';
			//	ocultar(mensaje);
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

function actualizarResultados() {
    document.getElementById('cant-aciertos').innerHTML = aciertos;
    document.getElementById('cant-aciertos-totales').innerHTML = aciertosTotales;
    document.getElementById('cant-errores').innerHTML = errores;
    document.getElementById('cant-errores-totales').innerHTML = erroresTotales;
}

function finalizar() {
    ganadas ++;
	ocultar(seleccionar);
	setTimeout(function(){
		alert('Ganaste');
		if (ganadas % 3 === 0) {
			alert('Felicitaciones! Llevas ganado ' + ganadas + ' veces');
		}
/*		casillas = console.log(document.querySelectorAll('img'));
		for (let i = 1; i < casillas.length; i++) {
		console.log(casillas[i].src);
			if (casillas[i].src === 'images/casilla.png'){
				casillas[i].src = 'images/comun.jpg';
			}
		}
	*/
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
	time = document.getElementById('input-time').value;
	if (time == 0) { // Puede ser Undifined
		alert('Ingresar tiempo!');
	} else {
		probMarca = document.getElementById('input-prob').value / 100;
		if (probMarca > 0 && probMarca <= 1) {
			let botonera = document.getElementById('botonera');
			ocultar(botonera);
			empezarJuego();
		}
		else {
			alert('Ingrese una probabilidad entre 1 y 100');
		}
	}
});

seleccionar.addEventListener('change', function () {
    let selected = this.selectedIndex;
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
	actualizarResultados();
});