/*
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

Consigli del giorno:
* Pensate prima in italiano.
* Dividete in piccoli problemi la consegna.
* Individuate gli elementi di cui avete bisogno per realizzare il programma.

Attenzione che usando Google Chrome, il prompt può dare problemi con la visualizzazione dei numeri in pagina sui tempi di refresh del dom, lasciando i numeri visibili mentre il prompt è aperto.
*/

// parametri
let nRandoms = 5;
let minRandom = 1;
let maxRandom = 100;
let timeToHide = 1 * 1000;

// selezione degli elementi del DOM
const eleNumbers = document.querySelector('.numbers');

// determinare i 5 numeri random
let arrRandoms = getArrRandomIntegers(nRandoms, minRandom, maxRandom);
console.log(arrRandoms);

// mettere i numeri random in pagina
// eleNumbers.innerHTML = arrRandoms // converte l'array in stringa prima di assegnarlo all'innerHTML
for (let i = 0; i < arrRandoms.length; i++) {
	eleNumbers.innerHTML += `<div class="number">${arrRandoms[i]}</div>`;
}


// registrimo la funzione che deve essere eseguita dopo il tempo stabilito
setTimeout(hideNumbers, timeToHide);
setTimeout(finishGame, timeToHide + 100);

function hideNumbers() {
	//eleNumbers.style.display = 'none';
	eleNumbers.innerHTML = '';
}

function finishGame() {
	const userNumbers = askNumbers();
	console.log(userNumbers);
	const guessedIndexes = verifyNumbers(arrRandoms, userNumbers);
	console.log(guessedIndexes);
	sayScore(arrRandoms, guessedIndexes);
}

function askNumbers() {
	const inputUser = prompt('Dammi i numeri separati da spazio: '); // '51 23 1 5 15'
	const arrInputUser = inputUser.split(' ');
	// convertiamo i numeri espressi come stringhe in numeri veri e propri, specialmente per far funzionare l'includes che viene dopo
	for (let i = 0; i < arrInputUser.length; i++) {
		arrInputUser[i] = parseInt(arrInputUser[i]);
	}
	return arrInputUser;
}

function verifyNumbers(arr1, arr2) {
	const arrGuessedIndexes = [];
	for (let i = 0; i < arr1.length; i++) {
		// non tiene conto della posizione dei numeri
		// if (arr2.includes(arr1[i]) ) {
		// 	arrGuessedIndexes.push(i);
		// }

		// tiene conto della posizione dei numeri
		if (arr1[i] == arr2[i]) {
			arrGuessedIndexes.push(i);
		}
	}
	return arrGuessedIndexes;
}

function sayScore(arrValues, arrIndexes) {
	let msg;
	if (arrIndexes.length === 0) {
		msg = 'Non ne hai azzeccato neanche uno!';
	} else if (arrIndexes.length === arrValues.length) {
		msg = 'Grande! Li hai azzeccati tutti!';
	} else {
		msg = `Ne hai azzeccati ${arrIndexes.length}, queste le posizioni azzeccate: ${arrIndexes.join(', ')}`;
	}
	console.log(msg);
	alert(msg);
}

function getArrRandomIntegers(n, min, max) {
	const arrRandoms = [];
	for (let i = 0; i < n; i++) {
		arrRandoms.push(getRandomInteger(min, max))
	}
	return arrRandoms;
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}