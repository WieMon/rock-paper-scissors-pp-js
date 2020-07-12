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

