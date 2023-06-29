/**
 * This a first attempt at making a ROCK-PAPER-SCISSORS game.
 * This is part of The Odin Project Curriculum.
 */


let playerSelection = '';
let computerSelection = '';
let roundNumber = 0;


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

// take the input and lowercase it, then compare it to valid options
// ask for input again if the option is invalid
function getHumanChoice() {
  let input = prompt("Make you selection:  Rock, Paper or Scissors");

  // not sure this is the best way to do this but with the limitations imposed this best I can do
  start = true
  while (start) {
    
    input != null ? input = input.toLowerCase() : input;

    if(input == "rock" || input == "paper" || input == "scissors"){
      start = false;
    } else {
      input = prompt("You MUST Make you selection:  Rock, Paper or Scissors");
    }
  }
  return input;
}


function playRound(player, computer) {
  playerSelection = player;
  computerSelection = computer;

  // display player and computer choices
  console.log("Player selected: ", playerSelection);
  console.log("Computer selected: ", computerSelection);

  // not ideal but it will do for now
  switch(playerSelection){
    case "rock":
      switch(computerSelection){
        case "rock":
          return "It's a tie! Play again!";
        case "paper":
          return "You Lose! Paper covers Rock.";

        case "scissors":
          return "You Win! Rock breaks Scissors.";
        default :
          break;
      }
      break;
    case "paper":
      switch (computerSelection){
        case "rock":
          return "You Win! Paper covers Rock.";
        case "paper":
          return "It's a tie! Play again!";
        case "scissors":
          return "You Lose! Scissors cuts Paper.";
        default:
          break;
      }
      break;
    case "scissors":
      switch(computerSelection){
        case "rock":
          return "You Lose!  Rock breaks Scissors.";
        case "paper":
          return "You Win! Scissors cuts Paper.";
        case "scissors":
          return "It's a tie! Play again!";
        default:
          break;
      }
      break;
  }
}

function game() {

}


// console.log("Computer choice: ", getComputerChoice());
// console.log("Human choice:", getHumanChoice());
console.log("Let's play a round: ", playRound(getHumanChoice(), getComputerChoice()));