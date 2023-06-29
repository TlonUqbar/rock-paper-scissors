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
      break;
    } else {
      input = prompt("You MUST Make you selection:  Rock, Paper or Scissors");
    }
  }
  return input;
}

function game() {

}

function playRound(playerSelection, computerSelection) {

}

console.log("Computer choice: ", getComputerChoice());
console.log("Human choice:", getHumanChoice());
