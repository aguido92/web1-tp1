let btn = document.getElementById("comienzo");
btn.addEventListener("click", jugar);
let seleccionable = document.getElementsByClassName("seleccionable");
let tablero = document.getElementsByClassName("tablero");
let cantCartas = 8;
let arregloCartas = [cantCartas];
let probabilidadSeleccionada = 50;
let listaImagenesCartas =document.querySelectorAll("img");
let varTieneMarca = false;

function jugar(){
	let probabilidadCargada =document.getElementById("probabilidad").value;
	if (probabilidadCargada.length > 0)
		probabilidadSeleccionada = parseInt(probabilidadCargada);	
	for (let i = 0; i < cantCartas; i++){
		varTieneMarca = tieneMarca();
		arregloCartas[i] = varTieneMarca;
		arregloCartas[0] = true; /* opcional 1 = la primer posición tiene marca obligatoriamente*/
		if (arregloCartas[i]){
			listaImagenesCartas[i].src="images/cartaMarcada.jpg";
		}
		else
			listaImagenesCartas[i].src="images/cartaSinMarca.jpg";
	}
	tablero[0].classList.toggle("ocultable");
	correrTiempo();
	
}

function tieneMarca(){
	let valorMarca = Math.floor((Math.random() * 100));
	if (valorMarca < probabilidadSeleccionada){
		return true;
	}
	else{
		return false;
	}
}

function correrTiempo(){
	let timer = setTimeout('timeout()', 5000);
}

function timeout(){
	tablero[0].classList.toggle("ocultable");
	seleccionable[0].classList.toggle("seleccionable");
}

let opcionSeleccionada = document.getElementById("seleccionable");
opcionSeleccionada.addEventListener("change", mostrar);

function mostrar(){
	if (arregloCartas[opcionSeleccionada.selectedIndex])
		alert("bien, encontraste una carta marcada");
	else
		alert("la carta no esta marcada");
}

