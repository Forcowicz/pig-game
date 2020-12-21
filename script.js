'use strict';

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0')
const current1Element = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let gameOver, activePlayer, score, scores, winningScore, inputValidation, input;

init();

btnRoll.addEventListener('click', () => {
    if(!gameOver) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;
        if (dice !== 1) {
            score += dice;
            setCurrentScore(score);
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
   if(!gameOver) {
       scores[activePlayer] += score;
       document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
       if (scores[activePlayer] >= winningScore) {
           gameOver = true;
           document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
           document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
           btnRoll.classList.add('hidden');
           btnHold.classList.add('hidden');
           diceElement.classList.add('hidden');
           document.querySelector(`#name--${activePlayer}`).textContent = 'Winner!';
       } else {
           switchPlayer();
       }
   }
});

btnNew.addEventListener('click', init);

input.addEventListener('focusout', () => {
   const inputValue = Number(document.querySelector('.input').value);
   if(inputValue <= 0) {
       alert('Winning score cannot be 0 and below or empty!');
       input.value = 100;
   } else if(inputValue !== inputValidation) {
       alert('New winning score will be applied on new game!');
   }
});

function init() {
    input = document.querySelector('.input');
    inputValidation = Number(input.value);
    if(inputValidation) {
        winningScore = inputValidation;
    } else {
        winningScore = 100;
    }
    scores = [0, 0];
    score = 0;
    activePlayer = 0;
    gameOver = false;
    score0Element.textContent = '0';
    score1Element.textContent = '0';
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    diceElement.classList.add('hidden');
    document.querySelector('.player--0').className = 'player player--0 player--active';
    document.querySelector('.player--1').className = 'player player--1';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
}

function setCurrentScore(score) {
    document.getElementById(`current--${activePlayer}`).textContent = score;
}

function switchPlayer() {
    score = 0;
    setCurrentScore(score);
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}
