"use strict";

// Player One
const playerOne = document.querySelector(".playerOne");

// Player Two
const playerTwo = document.querySelector(".playerTwo");

// Checks to see who's turn it is
let playerOneTurn = true;

// Variable for player 1 and 2 to keep track of current score
const playerOneCurrentScore = document.querySelector("#currentOne");
const playerTwoCurrentScore = document.querySelector("#currentTwo");

// Variable to hold total score for player 1 and 2
const playerOneTotalScore = document.querySelector("#scoreOne");
const playerTwoTotalScore = document.querySelector("#scoreTwo");

// H1 element
const h1 = document.querySelector("h1");

// Dice display in the middle of the page
const diceDisplay = document.querySelector(".dice");
// Initial state to hide dice
diceDisplay.classList.add("hidden");

// Roll dice button
const rollDice = document.querySelector(".btnRoll");

// Button to hold points
const holdBtn = document.querySelector(".btnHold");

// Button to reset the game
const newGame = document.querySelector(".btnNew");

// Variable to hold current score
let currentScore = 0;

// Total score
let playerOneTotal = 0;
let playerTwoTotal = 0;

// Function to toggle players, change textContent and reset current score
const playerToggle = (currentPlayer, previousPlayer, resetCurrentScore) => {
  currentPlayer.classList.add("playerActive");
  previousPlayer.classList.remove("playerActive");
  resetCurrentScore.textContent = 0;
};

// Function to disable rollDice and holdBtn when a player wins the game
const gameOver = () => {
  holdBtn.disabled = true;
  rollDice.disabled = true;
  diceDisplay.classList.add("hidden");
};

// Event listner to check what number is generated and display the equivalent dice img
rollDice.addEventListener("click", () => {
  // Random num between 1-6
  const randomNum = Math.floor(Math.random() * 6) + 1;
  diceDisplay.classList.remove("hidden");
  diceDisplay.src = `./assets/dice-${randomNum}.png`;
  // Toggle who's turn it is
  if (randomNum === 1) {
    currentScore = 0;
    playerOneTurn = !playerOneTurn;
    if (!playerOneTurn) {
      playerToggle(playerTwo, playerOne, playerOneCurrentScore);
    } else {
      playerToggle(playerOne, playerTwo, playerTwoCurrentScore);
    }
  }

  // Checks to see which player contains the class of playerActive and if randomNum does not equal to 1, and adds to their current score
  if (playerOne.classList.contains("playerActive") && randomNum !== 1) {
    currentScore += randomNum;
    playerOneCurrentScore.textContent = currentScore;
  } else if (playerTwo.classList.contains("playerActive") && randomNum !== 1) {
    currentScore += randomNum;
    playerTwoCurrentScore.textContent = currentScore;
  }
});

// Hold event to add current score to total score and change player turns if a player decides to hold
holdBtn.addEventListener("click", () => {
  if (playerOneTurn) {
    playerOneTurn = false;
    playerOneTotal += currentScore;
    playerOneTotalScore.textContent = playerOneTotal;
    currentScore = 0;
    playerToggle(playerTwo, playerOne, playerOneCurrentScore);
  } else {
    playerOneTurn = true;
    playerTwoTotal += currentScore;
    playerTwoTotalScore.textContent = playerTwoTotal;
    currentScore = 0;
    playerToggle(playerOne, playerTwo, playerTwoCurrentScore);
  }

  // Checks to see who gets to 100 first
  if (playerOneTotal >= 100) {
    gameOver();
    playerOne.classList.add("playerWinner");
    h1.style.color = "white";
  } else if (playerTwoTotal >= 100) {
    gameOver();
    playerTwo.classList.add("playerWinner");
    h1.style.color = "white";
  }
});

// Reset game to original state on click
newGame.addEventListener("click", () => {
  playerOne.classList.remove("playerWinner");
  playerTwo.classList.remove("playerWinner");

  playerOne.classList.add("playerActive");
  playerTwo.classList.remove("playerActive");

  playerOneTotal = 0;
  playerTwoTotal = 0;

  holdBtn.disabled = false;
  rollDice.disabled = false;

  playerOneTotalScore.textContent = 0;
  playerTwoTotalScore.textContent = 0;
});
