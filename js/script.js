'use strict';

const hands = [...document.querySelectorAll('.game__img')];
const startBtn = document.querySelector('.game__btn-start');
const modalBtn = document.querySelector('.modal__btn');
const modalCloseBtn = document.querySelector('.modal__btn-close');
const gameStartTitle = document.querySelector('.score__title');
const playerNameInput = document.querySelector('.modal__input-name');
const roundNumberInput = document.querySelector('.modal__input-rounds');
const roundNumberSpan = document.querySelector('[data-summary="round-number"]');
const playerChoiceSpan = document.querySelector('[data-summary="your-choice"]');
const computerChoiceSpan = document.querySelector('[data-summary="computer-choice"]');
const playerScoreTotalSpan = document.querySelector('[data-summary="your-score-total"]');
const computerScoreTotalSpan = document.querySelector('[data-summary="computer-score-total"]');
const scoreMessageSpan = document.querySelector('[data-summary="score-message"]');

const game = {
  playerChoice: '',
  computerChoice: '',
}

const gameSummary = {
  playerPoints: 0,
  computerPoints: 0,
  rounds: 0,
  roundNumber: '',
  playerName: '',
}

//Function for opening the modal
function openModal() {
  document.querySelector('.overlay').classList.add('show');
  document.querySelector('.modal').classList.add('show');
  playerNameInput.value = '';
  roundNumberInput.value = '';
}

//Function for closing the modal
function closeModal() {
  document.querySelector('.overlay').classList.remove('show');
}

//Function for adding the content of modal
function addContentModal() {
  gameSummary.playerName = playerNameInput.value.toUpperCase();
  gameSummary.roundNumber = roundNumberInput.value;
  gameStartTitle.innerHTML = `${gameSummary.playerName} you will play ${gameSummary.roundNumber} rounds. Please choose your move.`;
  if (gameSummary.playerName === '' || gameSummary.roundNumber === '') {
    alert('Please fill the form.');
    return openModal();
  }
}

//Function to initiate the game
function initGame() {
  closeModal();
  addContentModal();
  scoreMessageSpan.textContent = '';
  playerScoreTotalSpan.textContent = 0;
  computerScoreTotalSpan.textContent = 0;
  roundNumberSpan.textContent = '';
}

//Function for the player choice
function playerHandSelection() {
  if (gameSummary.roundNumber === '') {
    alert('Please provide your name and number of rounds to play.');
    return openModal();
  }
  game.playerChoice = this.dataset.option;
  hands.forEach(hand => hand.style.boxShadow = '');
  this.style.boxShadow = '0 0 0 4px red';
  playGame();
}

//Function for the computer choice
function computerHandSelection() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

//Function for the game results
function checkResult(player, computer) {
  if (player === computer) {
    return 'draw';
  } else if ((player === "paper" && computer === "rock") ||
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper")) {
    return 'win';
  } else {
    return 'loss';
  }
}

//Function for showing the game results
function publishResult(player, computer, result) {
  roundNumberSpan.textContent = ++gameSummary.rounds;
  playerChoiceSpan.textContent = player;
  computerChoiceSpan.textContent = computer;
  if (result === 'win') {
    playerScoreTotalSpan.textContent = ++gameSummary.playerPoints;
  } else if (result === 'loss') {
    computerScoreTotalSpan.textContent = ++gameSummary.computerPoints;
  }
}

//Function for ending the game
function endGame() {
  game.playerChoice = '';
  game.computerChoice = '';
}

//Main function
function playGame() {
  if (gameSummary.rounds < gameSummary.roundNumber) {
    game.computerChoice = computerHandSelection();
    const gameResult = checkResult(game.playerChoice, game.computerChoice);
    publishResult(game.playerChoice, game.computerChoice, gameResult);
    endGame();
  }
  if (gameSummary.rounds == gameSummary.roundNumber) {
    window.setTimeout(() => {
      publishTotalMessage();
    }, 1000);
  }
}

//Event Listeners
startBtn.addEventListener('click', function (e) {
  e.preventDefault();
  openModal();
});
modalCloseBtn.addEventListener('click', function (e) {
  e.preventDefault();
  closeModal();
});
modalBtn.addEventListener('click', initGame);
hands.forEach(hand => hand.addEventListener('click', playerHandSelection));
