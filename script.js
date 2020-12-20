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

let gameOver, activePlayer, score, scores;

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
       if (scores[activePlayer] >= 100) {
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

function init() {
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
