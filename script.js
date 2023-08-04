/**
 * This a first attempt at making a ROCK-PAPER-SCISSORS game.
 * This is part of The Odin Project Curriculum.
 */

const r = "Rock";
const s = "Scissors";
const p = "Paper";
const icons = {"rock" : "🪨", "paper" : "📜", "scissors" : "✂️"}
let playerSelection = '';
let computerSelection = '';
let result = '';
let round = 0;
let playerScore = 0;
let computerScore = 0;
let gameWinner = '';
const start = document.querySelector("#button");
const clickRock = document.querySelector("#rock");
const clickPaper = document.querySelector("#paper");
const clickScissors = document.querySelector("#scissors");
const again = document.querySelector("#again");
const quit = document.querySelector("#quit");
const rock = () => getHumanChoice(r);
const paper = () =>  getHumanChoice(p);
const scissors = () => getHumanChoice(s);
const intro = document.querySelector("#intro-container");
const game =  document.querySelector("#game-container");
const over = document.querySelector("#over-container");
const playerScoreBox = document.querySelector("#p1");
const computerScoreBox = document.querySelector("#p2");
const playLog = document.querySelector("#plays");
const history = document.querySelector("#history");
const outcome = document.querySelector("#outcome");
const p1Over = document.querySelector("#player1-over");
const p2Over = document.querySelector("#player2-over");


start.addEventListener( "click", startGame );


// using a random number to generate a string based choice
function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3) + 1;
  const moves = { 1 : "Rock", 2 : "Paper", 3 : "Scissors"}
  
  return moves[choice];
}

function getHumanChoice(choice) {
  computerSelection = getComputerChoice();
  playerSelection = choice;
  result = playRound(playerSelection, computerSelection);
  updateScores(playerSelection, computerSelection, result)
  updateLog();
}


function playRound(player, computer) {
  const moves = { 
    "rock" : { "rock": "It's a tie! Play again!", "paper": "You Lose! Paper covers Rock.", "scissors" : "You Win! Rock breaks Scissors." },
    "paper" : { "rock": "You Win! Paper covers Rock.", "paper": "It's a tie! Play again!", "scissors" : "You Lose! Scissors cuts Paper." },
    "scissors" : { "rock": "You Lose! Rock breaks Scissors.", "paper": "You Win! Scissors cuts Paper.", "scissors" : "It's a tie! Play again!" }
  }
  playerSelection = player.toLowerCase();
  computerSelection = computer.toLowerCase();

  return moves[playerSelection][computerSelection];
}


function scoreKeeping(result) {
  if( result.includes("You Win!")){
    playerScore++;
    round++;
  } else if (result.includes("You Lose!")){
    computerScore++;
    round++;
  } else {
    return;
  }
}

function fixIconOrientation(div1, div2, div3, move1, move2, result){
  let parts  = result.split("! ");

  div3.innerHTML = `<h3 class="round-result">${parts[0]}</h3><h4 class="round-play">${parts[1]}</h4>`;
  div1.textContent = icons[move1];
  div2.textContent = icons[move2];
 
  if(move1 === "rock") div1.style.rotate = "";
  if(move2 === "rock") div2.style.rotate = "";
  if(move1 === "scissors") div1.style.setProperty("rotate", "0.25turn");
  if(move2 === "scissors") div2.style.setProperty("rotate", "0.25turn");
  if(move1 === "paper") div1.style.setProperty("rotate", "0.68turn");
  if(move2 === "paper") div2.style.setProperty("rotate", "0.68turn"); 
}


function updateScores(playerSelection, computerSelection, result){
  let player1 = document.querySelector(".player1");
  let player2 = document.querySelector(".player2");
  let results = document.querySelector(".result");

  fixIconOrientation(player1, player2, results, playerSelection, computerSelection, result);
  scoreKeeping(result);
  updateScoreBoxes(playerScoreBox, computerScoreBox)

  if( round === 5 ) {
    updateLastScreen(playerSelection, computerSelection);
    gameOver();
  }
}

function updateLog(){
  const li = document.createElement("li");
  let state1 = '';
  let state2 = '';

  if(result.includes("You Win!")){
   state1 = "winner";
   state2 = "loser";
  } else if (result.includes("You Lose!")){
    state1 = "loser";
    state2 = "winner";
  } else {
    state1 = "tie";
    state2 = "tie";
  }  
  li.innerHTML = `<div class="${state1}">${icons[playerSelection]}</div> <div>Round ${round}</div> <div class="${state2}">${icons[computerSelection]}</div>`;
  playLog.appendChild(li);
}

function updateLastScreen(playerSelection, computerSelection){
  let player1 = document.querySelector("#board-over .player1");
  let player2 = document.querySelector("#board-over .player2");
  let results = document.querySelector("#board-over .result");
  let playerScoreBox = document.querySelector("#p1-over");
  let computerScoreBox = document.querySelector("#p2-over");

  again.addEventListener("click", resetGame );
  quit.addEventListener("click", startGame );

  fixIconOrientation(player1, player2, results, playerSelection, computerSelection, result);
  updateScoreBoxes(playerScoreBox, computerScoreBox);
  finalOutcome();
}

function finalOutcome(){
  if(playerScore > computerScore){
    gameWinner = "You Win!";
    outcome.classList = ["won"];
   } else{
    gameWinner = "You Lose!";
    outcome.classList = ["lost"];
   }
   outcome.textContent = gameWinner;
}

function updateScoreBoxes(playerScoreBox, computerScoreBox){
  let player = playerScoreBox;
  let computer = computerScoreBox;
  player.innerText = playerScore;
  computer.innerText = computerScore;
  if(playerScore > computerScore){
    player.classList = ["score winning"];
    computer.classList = ["score losing"];
  }else if (playerScore < computerScore){
    player.classList = ["score losing"];
    computer.classList = ["score winning"];
  } else {
    player.classList = ["score neutral"];
    computer.classList = ["score neutral"];
  }
}

function gameOver() { 
  // remove event listeners for button selections
  clickRock.removeEventListener("click", rock)
  clickPaper.removeEventListener("click", paper);
  clickScissors.removeEventListener("click", scissors);
  
  game.style.setProperty( "transform", "scale(0)" );
  over.style.setProperty( "transform", "scale(0)" );

  window.setTimeout( () => (game.classList.remove("show"), game.style.display = "none" ), 1000);
  window.setTimeout( ()=> { over.style.display = ""}, 990)
  window.setTimeout( ()=> ( over.style = "min-height: 98vh, transform: scale(1)" ), 1001);
  window.setTimeout( ()=> ( over.style = "" ), 2001);
}

function startGame(){
  // add event listeners for the next panel
  clickRock.addEventListener( "click", rock )
  clickPaper.addEventListener( "click", paper);
  clickScissors.addEventListener( "click", scissors,);
  
  intro.style.setProperty( "transform", "scale(0)" );
  game.style.setProperty( "transform", "scale(0)" );

  window.setTimeout( () => ( intro.classList.remove("show"), intro.style.display = "none" ), 1000);
  window.setTimeout( ()=> { game.style.display = ""}, 900 );
  window.setTimeout( ()=> ( game.style = "min-height: 98vh, transform: scale(1)" ), 1001);
}

function resetGame(){
  //reset scores
  result = '';
  round = 0;
  playerScore = 0;
  computerScore = 0;

  clickRock.addEventListener( "click", rock )
  clickPaper.addEventListener( "click", paper);
  clickScissors.addEventListener( "click", scissors,);
  
  over.style.setProperty( "transform", "scale(0)" );
  game.style.setProperty( "transform", "scale(0)" );

  window.setTimeout( () => ( intro.classList.remove("show"), intro.style.display = "none" ), 1000);
  window.setTimeout( () => ( game.style.display = "" ), 900 );
  window.setTimeout( () => ( game.style = "min-height: 98vh, transform: scale(1)" ), 1010);
  window.setTimeout( () => ( over.style.display = "none" ), 1000 );

  resetScoresBox();
}

function resetScoresBox(){
    // reset all boards 
    playerScoreBox.innerText = playerScore;
    computerScoreBox.innerText = computerScore;
    playerScoreBox.classList = ["score neutral"];
    computerScoreBox.classList = ["score neutral"];
    document.querySelector(".player1").innerHTML = '';
    document.querySelector(".player2").innerHTML = '';
    document.querySelector(".result").innerHTML = "<h1>Good Luck!</h1>";
    playLog.innerHTML = '';
}
