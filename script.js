'use strict';

// Selecting all necessary elements
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

// Application-state variables
const scores = [0, 0];
let score = 0;
let activePlayer = 0;
let gameOver = false;

// Starting conditions
score0Element.textContent = '0';
score1Element.textContent = '0';
diceElement.classList.add('hidden');

// Rolling dice
btnRoll.addEventListener('click', () => {
    if(!gameOver) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true switch to next player
        if (dice !== 1) {
            score += dice;
            setCurrentScore(score); // 0 or 1
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
   if(!gameOver) {
       scores[activePlayer] += score;
       document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
       if (scores[activePlayer] >= 20) {
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

btnNew.addEventListener('click', () => {
    gameOver = false;
    scores[0] = 0; scores[1] = 1;
    activePlayer = 0;
    score = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    document.querySelector('.player--0').className = 'player player--0 player--active';
    document.querySelector('.player--1').className = 'player player--1';
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
});

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
