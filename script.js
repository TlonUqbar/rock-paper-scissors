/**
 * This a first attempt at making a ROCK-PAPER-SCISSORS game with a UI.
 * This is part of The Odin Project Curriculum.
 */

// constants
const icons = {"rock" : "🪨", "paper" : "📜", "scissors" : "✂️"}
const enterButton = document.querySelector("#button");
const clickRock = document.querySelector("#rock");
const clickPaper = document.querySelector("#paper");
const clickScissors = document.querySelector("#scissors");
const againButton = document.querySelector("#again");
const quitButton = document.querySelector("#quit");
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


// annonymous functions
const rock = () => getHumanChoice("Rock");
const paper = () =>  getHumanChoice("Paper");
const scissors = () => getHumanChoice("Scissors");
const enter = (e) => {  if(e.code === "Enter") startGame(); };
const playAgain = (e) => { if(e.code === 'KeyA') resetGame(); };
const quitGame = (e) => { if(e.code === 'KeyQ') backToIntro() };
const again = () => resetGame();
const quit = () => backToIntro();

// variables
let playerSelection = '';
let computerSelection = '';
let result = '';
let round = 0;
let playerScore = 0;
let computerScore = 0;
let gameWinner = '';

// starting event listeners
enterButton.addEventListener( "click", startGame );
window.addEventListener( "keydown", enter );

// using a random number to generate a string based choice
function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3) + 1;
  const moves = { 1 : "Rock", 2 : "Paper", 3 : "Scissors"}
  
  return moves[choice];
}

function getHumanChoice(choice) {
  computerSelection = getComputerChoice().toLowerCase();
  playerSelection = choice.toLowerCase();
  result = playRound(playerSelection, computerSelection);
  updateScores();
}

function playRound(playerSelection, computerSelection) {
  const moves = { 
    "rock" : { "rock": "It's a tie! Play again!", "paper": "You Lose! Paper covers Rock.", "scissors" : "You Win! Rock breaks Scissors." },
    "paper" : { "rock": "You Win! Paper covers Rock.", "paper": "It's a tie! Play again!", "scissors" : "You Lose! Scissors cuts Paper." },
    "scissors" : { "rock": "You Lose! Rock breaks Scissors.", "paper": "You Win! Scissors cuts Paper.", "scissors" : "It's a tie! Play again!" }
  }

  return moves[playerSelection][computerSelection];
}

function scoreKeeping() {
  const li = document.createElement("li");
  let state1 = '';
  let state2 = '';

  if( result.includes("You Win!")){
    playerScore++;
    round++;
    state1 = "winner";
    state2 = "loser";
  } else if (result.includes("You Lose!")){
    computerScore++;
    round++;
    state1 = "loser";
    state2 = "winner";
  } else {
    state1 = "tie";
    state2 = "tie";
  }
 
  li.innerHTML = `<div class="${state1}">${icons[playerSelection]}</div> <div>Round ${round}</div> <div class="${state2}">${icons[computerSelection]}</div>`;
  playLog.appendChild(li);

  // when the play box has more than 15 entries, the scores and controls grow apart
  // this brings the controls back into view after a differnt call shows the scores first
  window.setTimeout( () => ( document.querySelector("#controls").scrollIntoView() ), 1500);
}

function fixIconOrientation(div1, div2, div3){
  let parts  = result.split("! ");
  const iconsPlayer = { "rock" : div1.style.rotate = "", "scissors": div1.style.setProperty("rotate", "0.25turn"), "paper" : div1.style.setProperty("rotate", "0.68turn") };
  const iconsComputer = { "rock" : div2.style.rotate = "", "scissors" : div2.style.setProperty("rotate", "0.25turn"), "paper" : div2.style.setProperty("rotate", "0.68turn") };

  div3.innerHTML = `<h3 class="round-result">${parts[0]}</h3><h4 class="round-play">${parts[1]}</h4>`;
  div1.textContent = icons[playerSelection];
  div2.textContent = icons[computerSelection];
 
  iconsPlayer[playerSelection];
  iconsComputer[computerSelection];
}

function updateScores(){
  let player1 = document.querySelector(".player1");
  let player2 = document.querySelector(".player2");
  let results = document.querySelector(".result");

  fixIconOrientation(player1, player2, results);
  scoreKeeping();
  updateScoreBoxes(playerScoreBox, computerScoreBox);
  
  if( playerScore === 5 || computerScore === 5 ) {
    updateLastScreen();
    gameOver();
  }
}

function updateLastScreen(){
  let player1 = document.querySelector("#board-over .player1");
  let player2 = document.querySelector("#board-over .player2");
  let results = document.querySelector("#board-over .result");
  let playerScoreBox = document.querySelector("#p1-over");
  let computerScoreBox = document.querySelector("#p2-over");

  fixIconOrientation(player1, player2, results);
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
  playerScoreBox.innerText = playerScore;
  computerScoreBox.innerText = computerScore;
  console.log("scores", playerScore, computerScore)
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
  // when there are more than 15 entries in the play box the scores are not visible
  // this brings them back into view, later another call brings the controls into view
  document.querySelector("#announcements").scrollIntoView();
}

function gameOver() { 
  // add eventlistners 
  window.addEventListener( "keydown", playAgain);
  window.addEventListener("keydown", quitGame);
  againButton.addEventListener("click", again );
  quitButton.addEventListener("click", quit );

  // remove event listeners
  clickRock.removeEventListener("click", rock)
  clickPaper.removeEventListener("click", paper);
  clickScissors.removeEventListener("click", scissors);
  window.removeEventListener("keydown", movesKeyboard);
  
  // change divs inline styles
  game.style.setProperty( "transform", "scale(0)" );
  over.style.setProperty( "transform", "scale(0)" );

  // delayed actions
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
  window.addEventListener("keydown", movesKeyboard);

  //remove Enter key event listerner
  window.removeEventListener( "keydown", enter);

  // change divs inline styles
  intro.style.setProperty( "transform", "scale(0)" );
  game.style.setProperty( "transform", "scale(0)" );

  // delayed actions
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

  // add event listeners
  clickRock.addEventListener( "click", rock )
  clickPaper.addEventListener( "click", paper);
  clickScissors.addEventListener( "click", scissors,);
  window.addEventListener("keydown", movesKeyboard);

  // remove event listeners
  window.removeEventListener( "keydown", playAgain);
  window.removeEventListener( "keydown", quitGame);
  againButton.removeEventListener( "click", again );
  quitButton.removeEventListener( "click", quit );

  // change divs inline styles
  over.style.setProperty( "transform", "scale(0)" );
  game.style.setProperty( "transform", "scale(0)" );

  // delayed actions
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

function movesKeyboard(e){
  // Use keys "R, P, S" to play, ignore all others
  const key = document.querySelector(`.key[data-key="${e.code}"]`)

  if(!key) return;

  switch(e.code){
    case "KeyR":
      pressed(key);
      return rock();
    case "KeyP":
      pressed(key);
      return paper();
    case "KeyS":
      pressed(key);
      return scissors();
    default:
      break;
  }
}

function pressed(move) {
  move.firstElementChild.classList.add("pressed");
  
  const keyed = document.querySelector("kbd.pressed");
  // add eventlistener to remove transition
  keyed.addEventListener("transitionend", removeTransition);
}

function removeTransition(e){
  // key reset
  if (e.propertyName !== "transform") return;
  // remove() sometimes fails, this is more effective
  this.classList = [" "];
}

function backToIntro(){
  let height = (document.querySelector("body").clientHeight - 2)+ 'px';
  // let visible = over;
  // let hidden = intro;
  let greet = document.querySelector("#greeting").style;
  let quest = document.querySelector("#question").style;
  let rps = document.querySelector("#rps").style;
  let start = document.querySelector("#start").style;

  //reset scores 
  result = '';
  round = 0;
  playerScore = 0;
  computerScore = 0;
  resetScoresBox();

  // add eventlistners 
  enterButton.addEventListener( "click", startGame );
  window.addEventListener( "keydown", enter );

  // hide divs inside hidden div so that the slide down effect can work seamlessly 
  greet.display = "none";
  quest.display = "none";
  rps.display = "none";
  start.display = "none";

  // hidden div style changes
  intro.style.height = "0px";
  intro.style.setProperty("background-color", "rgba(19, 36, 44, 1)");
  intro.style.setProperty( "transform", "scale(1)" );
  intro.classList.add("show");

  // visible div style changes
  over.style.height = height;
  over.style.setProperty( "transform", "scale(0)" );

  // delayed actions and changes
  window.setTimeout( () => ( over.style.height = ''), 10);
  window.setTimeout( () => ( intro.style.display = ""), 100);
  window.setTimeout( () => ( over.style.display = "none" ), 1000 );
  window.setTimeout( () => ( greet.display = "", quest.display = "", rps.display = "", start.display = ""), 1500);
  window.setTimeout( () => ( intro.style.height = '', intro.style.removeProperty("background-color")), 1200);
}
