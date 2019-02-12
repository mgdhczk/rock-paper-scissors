
const moves = [
  'rock',
  'paper',
  'scissors',
];

const results = {
  player: 0,
  computer: 0,
  tie: 0
};

const rounds = 3;
let countRounds = rounds;

const outcomeElement = document.getElementById('outcome');
const resultsElement = document.getElementById('results');
const finalResultElement = document.getElementById('final-result');

const printResult = function() {
  resultsElement.innerHTML = 'player ' + results['player'] + ' - ' + results['computer'] + ' computer';
}

const printFinalResult = function(clear = false) {
  if (clear) {
    finalResultElement.innerHTML = '';
  } else {
    if (results.player > results.computer) {
      finalResultElement.innerHTML = 'GAME OVER! PLAYER WON!';
    } else if (results.player === results.computer) {
      finalResultElement.innerHTML = 'GAME OVER! A TIE!';
    } else {
      finalResultElement.innerHTML = 'GAME OVER! COMPUTER WON!';
    }
  } 
}

const printOutcome = function(winner) {
  if (winner) {
    outcomeElement.innerHTML = (winner === 'player' || winner === 'computer') ? winner + ' won!' : 'a tie!';
  } else {
    outcomeElement.innerHTML = '';
  }
  
}

const setResult = function(winner) {
  results[winner] += 1;
  printOutcome(winner)
  printResult();
}

const play = function(e) {
  if(countRounds > 0) {
    countRounds -= 1;
    const playerMove = e.target.id;
    const computerMove = moves[Math.floor(Math.random() * 3)]; 
    
    if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'rock')
    ) {
      setResult('player'); 
    } else if (playerMove === computerMove) {
      setResult('tie');
    } else {
      setResult('computer');
    }
  } 
  if(countRounds === 0) {
    printFinalResult();
  }
}

const newGame = function(e) {
  countRounds = rounds;
  results.player = 0;
  results.computer = 0;
  results.tie = 0;
  printOutcome();
  printResult();
  printFinalResult(true);
}

document
  .getElementById('new-game')
  .addEventListener('click', newGame);

document
  .querySelectorAll('button[name="player-move"]')
  .forEach(function(button) {
    button.addEventListener('click', play);
  });
