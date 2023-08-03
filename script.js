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
// let roundWinner = '';
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
  
  switch (choice) {
    case 1:
      return "Rock";
    case 2:
      return "Paper";
    case 3:
      return "Scissors";
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

  // console.log("result:", moves[playerSelection][computerSelection]);
  return moves[playerSelection][computerSelection];
}


function updateScores(p1, p2, result){
  let player1 = document.querySelector(".player1");
  let player2 = document.querySelector(".player2");
  let results = document.querySelector(".result");
  let parts  = result.split("! ");

  // results.textContent = result;
  results.innerHTML = `<h3 class="round-result">${parts[0]}</h3><h4 class="round-play">${parts[1]}</h4>`;
  player1.textContent = icons[p1];
  player2.textContent = icons[p2];

  
  // rotate icons in shout box
  if(p1 === "rock") player1.style.rotate = "";
  if(p2 === "rock") player2.style.rotate = "";
  if(p1 === "scissors") player1.style.setProperty("rotate", "0.25turn");
  if(p2 === "scissors") player2.style.setProperty("rotate", "0.25turn");
  if(p1 === "paper") player1.style.setProperty("rotate", "0.68turn");
  if(p2 === "paper") player2.style.setProperty("rotate", "0.68turn"); 

  // update score keeping
  if( result.includes("You Win!")){
    playerScore++;
    round++;
  } else if (result.includes("You Lose!")){
    computerScore++;
    round++;
  } else {
    return;
  }
  
  // update scoreboard
  playerScoreBox.innerText = playerScore;
  computerScoreBox.innerText = computerScore;

  // apply styles to show who is winning/losing
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

  // end of match
  if( round === 5 ) {
   if(playerScore > computerScore){
    gameWinner = "You Win!"
   } else{
    gameWinner = "You Lose!"
   }
  
  updateLastScreen(p1, p2)
  gameOver(gameWinner);
  }
}

function updateLog(){
  const li = document.createElement("li");
  let p1 = playerSelection;
  let p2 = computerSelection;
  
  // insert round plays into play log
  if(result.includes("You Win!")){
    li.innerHTML = `<div class="winner">${icons[p1]}</div> <div>Round ${round}</div> <div class="loser">${icons[p2]}</div>`;
  } else if (result.includes("You Lose!")){
    li.innerHTML = `<div class="loser">${icons[p1]}</div> <div>Round ${round}</div> <div class="winner">${icons[p2]}</div>`;
  } else {
    li.innerHTML = `<div class="tie">${icons[p1]}</div> <div>Round ${round}</div> <div class="tie">${icons[p2]}</div>`;
  }  
  playLog.appendChild(li);
}

function updateLastScreen(p1, p2){
  let player1 = document.querySelector("#board-over .player1");
  let player2 = document.querySelector("#board-over .player2");
  let results = document.querySelector("#board-over .result");
  let p1Final = document.querySelector("#p1-over");
  let p2Final = document.querySelector("#p2-over");
  let parts  = result.split("! ");

  again.addEventListener("click", resetGame );
  quit.addEventListener("click", startGame );

  // results.textContent = result;
  results.innerHTML = `<h3 class="round-result">${parts[0]}</h3><h4 class="round-play">${parts[1]}</h4>`;
  player1.textContent = icons[p1];
  player2.textContent = icons[p2];

  p1Final.innerText = playerScore;
  p2Final.innerText = computerScore;  

  if(playerScore > computerScore){
    p1Final.classList = ["score winning"];
    p2Final.classList = ["score losing"];
  }else if (playerScore < computerScore){
    p1Final.classList = ["score losing"];
    p2Final.classList = ["score winning"];
  } else {
    p1Final.classList = ["score neutral"];
    p2Final.classList = ["score neutral"];
  }

  outcome.textContent = gameWinner;
  if(gameWinner === "You Win!"){
    outcome.classList.add("won");
  } else {
    outcome.classList.add("lost");
  }
}


function gameOver(winner) { 
  clickRock.removeEventListener("click", rock)
  clickPaper.removeEventListener("click", paper);
  clickScissors.removeEventListener("click", scissors);
  
  game.style.setProperty( "transform", "scale(0)" );
  over.style.setProperty( "transform", "scale(0)" );
  // over.style.setProperty( "min-height", "80vh" );

  window.setTimeout( () => (game.classList.remove("show"), game.style.display = "none" ), 1000);

  window.setTimeout( ()=> { over.style.display = ""}, 990)
  window.setTimeout( ()=> ( over.style = "min-height: 98vh, transform: scale(1)" ), 1001);
  window.setTimeout( ()=> ( over.style = "" ), 2001);
  
}

function startGame(){

  // add event listener for the next panel
  clickRock.addEventListener( "click", rock )
  clickPaper.addEventListener( "click", paper);
  clickScissors.addEventListener( "click", scissors,);

  
  intro.style.setProperty( "transform", "scale(0)" );
  game.style.setProperty( "transform", "scale(0)" );
  // game.style.setProperty( "min-height", "80vh" );

  window.setTimeout( () => ( intro.classList.remove("show"), intro.style.display = "none" ), 1000);

  window.setTimeout( ()=> { game.style.display = ""}, 900 );
  window.setTimeout( ()=> ( game.style = "min-height: 98vh, transform: scale(1)" ), 1001);
  

}

function resetGame(){
  
  result = '';
  round = 0;
  playerScore = 0;
  computerScore = 0;

  clickRock.addEventListener( "click", rock )
  clickPaper.addEventListener( "click", paper);
  clickScissors.addEventListener( "click", scissors,);
  
  // intro.style.display = "none";

  over.style.setProperty( "transform", "scale(0)" );
  game.style.setProperty( "transform", "scale(0)" );
  // over.style.setProperty( "transform", "scale(0)" );
  // over.style.setProperty( "min-height", "80vh" );

  window.setTimeout( () => ( intro.classList.remove("show"), intro.style.display = "none" ), 1000);
  window.setTimeout( ()=> { game.style.display = ""}, 900 );
  window.setTimeout( ()=> ( game.style = "min-height: 98vh, transform: scale(1)" ), 1001);

  resetScores();
  resetPlayLog();

  // window.setTimeout( () => (game.classList.remove("show"), game.style.display = "none" ), 1000);

  // window.setTimeout( ()=> { over.style.display = ""}, 990)
  // window.setTimeout( ()=> ( over.style = "min-height: 98vh, transform: scale(1)" ), 1001);
  // window.setTimeout( ()=> ( over.style = "" ), 2001);

}

function resetScores(){
    // update scoreboard
    playerScoreBox.innerText = playerScore;
    computerScoreBox.innerText = computerScore;
    document.querySelector(".player1").innerHTML = '';
    document.querySelector(".player2").innerHTML = '';
    document.querySelector(".result").innerHTML = "<h1>Good Luck!</h1>";
}

function resetPlayLog(){
  playLog.innerHTML = '';
}