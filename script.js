/**
 * This a first attempt at making a ROCK-PAPER-SCISSORS game.
 * This is part of The Odin Project Curriculum.
 */

const r = "Rock";
const s = "Scissors";
const p = "Paper";
let playerSelection = '';
let computerSelection = '';
let result;
let round = 0;
let playerScore = 0;
let computerScore = 0;
let roundWinner = '';
let gameWinner = '';
const clickRock = document.querySelector("#rock");
const clickPaper = document.querySelector("#paper");
const clickScissors = document.querySelector("#scissors");
const rock = () => getHumanChoice(r);
const paper = () =>  getHumanChoice(p);
const scissors = () => getHumanChoice(s);
const playerScoreBox = document.querySelector("#p1");
const computerScoreBox = document.querySelector("#p2");
const playLog = document.querySelector("#plays");


clickRock.addEventListener("click", rock)
clickPaper.addEventListener("click", paper);
clickScissors.addEventListener("click", scissors);


// using a random number to generate a string based choice
function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3) + 1;
  
  switch (choice) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
    default:
      break;
  }
}

function getHumanChoice(choice) {
  computerSelection = getComputerChoice();
  playerSelection = choice;
  result = playRound(playerSelection, computerSelection);
  updateScores(playerSelection, computerSelection, result)
  updateLog();
}


function playRound(player, computer) {
  playerSelection = player.toLowerCase();
  computerSelection = computer.toLowerCase();

  // display player and computer choices
  console.log(`Player selected: "${playerSelection}" \nComputer selected: "${computerSelection}"`);

  const moves = { 
    "rock" : { "rock": "It's a tie! Play again!", "paper": "You Lose! Paper covers Rock.", "scissors" : "You Win! Rock breaks Scissors." },
    "paper" : { "rock": "You Win! Paper covers Rock.", "paper": "It's a tie! Play again!", "scissors" : "You Lose! Scissors cuts Paper." },
    "scissors" : { "rock": "You Lose! Rock breaks Scissors.", "paper": "You Win! Scissors cuts Paper.", "scissors" : "It's a tie! Play again!" }
  }

  console.log("result:", moves[playerSelection][computerSelection]);
  return moves[playerSelection][computerSelection];
}


function updateScores(p1, p2, result){
  let player1 = document.querySelector(".player1");
  let player2 = document.querySelector(".player2");
  let results = document.querySelector(".result");
  let parts  = result.split("! ");

  // results.textContent = result;
  results.innerHTML = `<h3 class="round-result">${parts[0]}</h3><h4 class="round-play">${parts[1]}</h4>`;
  player1.textContent = p1;
  player2.textContent = p2;

  if( result.includes("You Win!")){
    roundWinner = "Professor wins this round!";
    playerScore++;
    round++;
    
  } else if (result.includes("You Lose!")){
    roundWinner = "Joshua wins this round!";
    computerScore++;
    round++;
  } else {
    roundWinner = "No winner this round. Play again!";
  }
  
  playerScoreBox.innerText = playerScore;
  computerScoreBox.innerText = computerScore;

  if(playerScore > computerScore){
    playerScoreBox.classList = ["score winning"];
    computerScoreBox.classList = ["score losing"];
  }else if (playerScore < computerScore){
    playerScoreBox.classList = ["score losing"];
    computerScoreBox.classList = ["score winning"];
  } else {
    playerScoreBox.classList = ["score neutral"];
    computerScoreBox.classList = ["score neutral"];
  }
}

function updateLog(){
  const li = document.createElement("li");
  let p1 = playerSelection;
  let p2 = computerSelection;
  
  if(result.includes("You Win!")){
    li.innerHTML = `<div class="winner">${p1}</div> <div>Round ${round}</div> <div class="loser">${p2}</div>`;
  } else if (result.includes("You Lose!")){
    li.innerHTML = `<div class="loser">${p1}</div> <div>Round ${round}</div> <div class="winner">${p2}</div>`;
  } else {
    li.innerHTML = `<div class="tie">${p1}</div> <div>Round ${round}</div> <div class="tie">${p2}</div>`;
  }  
  playLog.appendChild(li);
}


// function game() {
//   let roundWinner = '';
//   let winner = '';
//   let result = '';
//   let playerScore = 0;
//   let computerScore = 0;
//   let round = 0;

//   for( round; round < 5; ){
//     result = playRound(getHumanChoice(), getComputerChoice());

//     if( result.includes("You Win!")){
//       roundWinner = "Player wins this round!";
//       playerScore++;
//       round++;
//     } else if (result.includes("You Lose!")){
//       roundWinner = "Computer wins this round!";
//       computerScore++;
//       round++;
//     } else {
//       roundWinner = "No winner this round. Play again!";
//     }
//     console.log(`${roundWinner}. Current score: Player ${playerScore} - Computer ${computerScore} `);
//   }

//   if (playerScore > computerScore){
//     winner = "Player wins game!";
//   } else {
//     winner = "Computer wins game!";
//   }

//   return `Final score: Player ${playerScore} - Computer ${computerScore}\nWinner: ${winner}`;
// }



