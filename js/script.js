console.log("JS OK");

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// # MILESTONE 1
// Prepariamo "qualcosa" per tenere il punteggio dell'utente.
// Quando l'utente clicca su una cella, incrementiamo il punteggio.
// Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
// # MILESTONE 2
// Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
// Generiamoli e stampiamo in console per essere certi che siano corretti
// # MILESTONE 3
// Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
// # MILESTONE 4
// Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
// (Ma come stabiliamo quale sia il punteggio massimo?)
// # MILESTONE 5
// Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
// #BONUS:
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// 1 prendo gli elementi dal dom
const container = document.getElementById("custom-container");
const button = document.getElementById("button");
const title = document.getElementById("title");
const select = document.getElementById("difficult-select");

// creo un oggetto con i valori di difficoltà

const cellsDifficulty = {
  easy: 100,
  medium: 81,
  hard: 49,
};

// 3.5 creo una funzione che crei le caselle
const createCell = (content) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.append(content);
  return cell;
};

// creo una funzione per generare numeri casuali che non si ripetano

const randomUniqueNumber = (min, max, blacklist) => {
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
  } while (blacklist.includes(randomNumber));

  return randomNumber;
};

// 2 creo un event listener collegato al bottone
button.addEventListener("click", function () {
  const prevContainer = document.getElementById("grid");
  if (prevContainer) {
    prevContainer.remove();
  }
  const difficulty = cellsDifficulty[select.value];
  console.log(difficulty);
  const grid = document.createElement("div");
  grid.setAttribute("id", "grid");

  // creo una variabile che contenga i numeri già estratti
  const bombs = [];

  // creo un loop che mi generi 16 numeri casuali a cui poi assegnare la classe bomba
  for (let i = 0; i < 16; i++) {
    const numbers = randomUniqueNumber(1, cellsDifficulty[select.value], bombs);
    bombs.push(numbers);

    console.log(bombs);
  }

  // preparo una variabile che tenga il punteggio dell'utente
  let userScore = 0;

  // preparo un flag per fermare il gioco
  let isGameOver = false;

  // 3 creo un loop che crei le caselle
  for (let i = 1; i <= difficulty; i++) {
    const cell = createCell(i);

    // 4 creo un event listener che aggiunga la classe clicked alle varie caselle
    cell.addEventListener("click", () => {
      // faccio in modo che se la casella è già stata cliccata non aumento il punteggio dell'utente
      if (isGameOver === false) {
        if (
          !cell.classList.contains("clicked") &&
          !bombs.includes(i) &&
          userScore < difficulty - 16
        ) {
          // aumento il punteggio dell'utente con ogni click
          userScore++;
          cell.classList.add("clicked");
        } else if (userScore === difficulty - 16) {
          userScore++;
          alert("congratulazioni! hai vinto!");
          isGameOver = true;
        } else if (bombs.includes(i)) {
          alert(`hai preso la bomba! Il tuo punteggio è: ${userScore}`);
          cell.classList.add("exploded");
          isGameOver = true;
        }
      }
      console.log(difficulty);
      console.log(i);
      console.log(userScore);
    });

    cell.classList.add(select.value);
    grid.appendChild(cell);
    title && title.remove();
    container.appendChild(grid);
  }
});
