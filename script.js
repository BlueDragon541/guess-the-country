// global variables
const wordDiv = document.getElementById("word");
const resultsDiv = document.getElementById("results");
const dialogDiv = document.getElementById("dialog");
const cardContainerDiv = document.getElementById("cardContainer");
// variable COUNTRIES comes from countries-all.js

let answer;
let guess;
let guessesLeft;
let country;

function randomCountry() {
  console.log('There are ${COUNTIRES.length} countries in the list');
  let randomCountryIndex = Math.floor(Math.random() * COUNTRIES.length);
  console.log('The randomCountryIndex is: ${randomCountryIndex');
  return COUNTRIES[randomCountryIndex]

}

function startGame() {
  console.clear();

  // Initialize the game state
  country = randomCountry();
  answer = country.name.common.toUpperCase();
  guess = [];
  guessesLeft = 10;
  console.log("the answer is:");
  console.log(answer);
  for (let i = 0; i < answer.length; i++) {
    // TODO: how to handle letters not on our keyboard?
    if (answer[i] >= "A" && answer[i] <= "Z") {
      guess.push("_");
    } else {
      guess.push(answer[i]);
    }
  }

  // Make sure all letter buttons are enabled
  enableAllButtons();

  updateResults();
}

function showHint() {
  cardContainerDiv.innerHTML = ""; // clear any existing card content

  // create a div element to hold the card
  let card = document.createElement("div");

  // create an image element for the flag
  let img = document.createElement("img");
  // TODO: How to read image url from country data?
  // img.src = ???
  img.src = country.flags.png;
  img.style.border = "thin solid grey";
  card.appendChild(img);

  // create a paragraph element for info
  let p = document.createElement("p");
  // TODO: display other hints, e.g.
  // Continent(s), population, area, capital(s), etc
  // p.innerHTML += `Continent: ...<br>`;
  // p.innerHTML += `Population: ...<br>`;
  p.innerHTML += `Capital: ${country.capital[0]}<br>`;
  p.innerHTML += `Population ${country.population}<br>`;
  card.appendChild(p);

  cardContainerDiv.appendChild(card); // create and add the card to the container

  dialog.showModal(); // show the dialog
}

function updateResults() {
  let gameOver = false;
  wordDiv.innerHTML = guess.join(" ");
  // check for win and update the results div
  if (guess.join("") === answer) {
    resultsDiv.innerHTML = "You win!";
    gameOver = true;
  } else if (guessesLeft > 0) {
    resultsDiv.innerHTML = "You have " + guessesLeft + " guesses left";
  } else {
    // guessesLeft == 0
    resultsDiv.innerHTML = "You have no more guesses left, game over!<br>";
    resultsDiv.innerHTML = "The answer was: " + answer;
    gameOver = true;
  }

  if (gameOver) {
    disableAllButtons();
  }
}

function clickLetter(letter) {
  console.log("clicked letter ", letter);

  // Disable the clicked letter button so it can't be guessed again
  disableButton(letter);

  // Update the guess array
  if (answer.indexOf(letter) != -1) {
    // the letter was in the answer
    for (let i = 0; i < answer.length; i++) {
      if (answer.charAt(i) === letter) {
        guess[i] = letter;
      }
    }
  } else {
    // the letter was not in the answer, used up a guess
    guessesLeft--;
  }

  updateResults();
}

// Start a new game
startGame();

// HELPER FUNCTIONS

// helper functions for the letter buttons
function disableAllButtons() {
  document
    .querySelectorAll(".letter-button")
    .forEach((b) => (b.disabled = true));
}

function enableAllButtons() {
  document
    .querySelectorAll(".letter-button")
    .forEach((b) => (b.disabled = false));
}

function disableButton(letter) {
  document.getElementById("letter-" + letter).disabled = true;
}

function closeCard() {
  dialogDiv.close(); // hide the dialog
}