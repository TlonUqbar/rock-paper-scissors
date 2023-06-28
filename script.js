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

function getHumanChoice() {

}

function game() {

}

function playRound(playerSelection, computerSelection) {

}

console.log("Computer choice: ", getComputerChoice());