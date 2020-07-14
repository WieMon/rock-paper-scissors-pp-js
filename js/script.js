'use strict';

const hands = [...document.querySelectorAll('.game__img')];
const startBtn = document.querySelector('.game__btn-start');
const modalBtn = document.querySelector('.modal__btn');
const modalCloseBtn = document.querySelector('.modal__btn-close');
const gameStartTitle = document.querySelector('.game__title');
const playerNameInput = document.querySelector('.modal__input-name');
const roundNumberInput = document.querySelector('.modal__input-rounds');
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

//Function to print the start message
function startMessage() {
  gameStartTitle.innerHTML = `Your rounds to play: ${gameSummary.roundNumber - gameSummary.rounds} <br /> ${gameSummary.playerName} please choose your move: `;
}

//Function for adding the content of modal
function addContentModal() {
  gameSummary.playerName = playerNameInput.value.toUpperCase();
  gameSummary.roundNumber = roundNumberInput.value;
  startMessage();
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
}

//Function for the player choice
function playerHandSelection() {
  if (gameSummary.roundNumber === '') {
    alert('Please provide your name and number of rounds to play.');
    return openModal();
  }
  game.playerChoice = this.dataset.option;
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
  ++gameSummary.rounds;
  playerChoiceSpan.textContent = player;
  computerChoiceSpan.textContent = computer;
  gameSummary.roundNumber - gameSummary.rounds
  if (result === 'win') {
    playerScoreTotalSpan.textContent = ++gameSummary.playerPoints;
    } else if (result === 'loss') {
    computerScoreTotalSpan.textContent = ++gameSummary.computerPoints;
   } else {
  }
  gameStartTitle.innerHTML;
  startMessage();
}

//Function to publish the final message
function publishTotalMessage() {
  const winMessage = 'Congratulations!!! You won the game!!!';
  const lostMessage = 'I am sorry but you lost the game.';
  const drawMessage = 'Draw... Try again ...';
  let index = 0;
  if (gameSummary.playerPoints > gameSummary.computerPoints) {
    clearResults();
    const addLetter = () => {
      scoreMessageSpan.textContent += winMessage[index];
      index++;
      if (index === winMessage.length) clearInterval(indexTyping);
    }
    addLetter();
    const indexTyping = setInterval(addLetter, 40);
  } else if (gameSummary.playerPoints < gameSummary.computerPoints) {
    clearResults();
    const addLetter = () => {
      scoreMessageSpan.textContent += lostMessage[index];
      index++;
      if (index === lostMessage.length) clearInterval(indexTyping);
    }
    addLetter();
    const indexTyping = setInterval(addLetter, 40);
  } else {
    clearResults();
    const addLetter = () => {
      scoreMessageSpan.textContent += drawMessage[index];
      index++;
      if (index === drawMessage.length) clearInterval(indexTyping);
    }
    addLetter();
    const indexTyping = setInterval(addLetter, 40);
  }
}

//Function for ending the game
function endGame() {
  game.playerChoice = '';
  game.computerChoice = '';
}

function clearResults() {
  gameSummary.rounds = 0;
  gameSummary.playerPoints = 0;
  gameSummary.computerPoints = 0;
  playerChoiceSpan.textContent = '';
  computerChoiceSpan.textContent = '';
  gameSummary.roundNumber = ''
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
