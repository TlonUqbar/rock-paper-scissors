# ROCK-PAPER-SCISSORS GAME V1


## REQUIREMENTS AND RESTRICTIONS
- [x] Create a new git repo for the project 
- [x] Work from an external.js file.  (script.js)
  - [x] Files needed (index.html, sytle.css and script.js), I guess the css is optional.
- [x] The game will be played completely from the console.  
- [x] Opponent will be the computer
- [x] Make a function called `getComputerChoice` that will randomly return "Rock, Paper or Scissors".
	- [x] This is how we'll get the computer to play.
- [x] Write a function the plays a single round of "Rock Paper Scissors".
	- [x] The function should take 2 parameters.
  - [x] 1. Player Selection
  - [x] 2. Computer Selection
	- [x] The function should return a string that declares the winner of the round.   e.g. "You Lose! Paper beats Rock"
	- [x] Make  the playersSelection parameter case-insensitive.  All these are valid inputs `rock`, `ROCK`, `Rock`, `RoCk` and any other variant.
	- [x] Make sure that the function returns a value.  Will need to use that value later.
- [x] Write a function called `game`
	- [x] Use the previous function (play single round) inside of function game
	- [x] Game will play a 5 round game that keeps scores, and reports a winner and a loser at the end.
	- [x] Feel free to use a loop.  
	- [x] Use `console.log()` to display the results of each round and the winner at the end.
	- [x] Use `prompt` to get input from the user
- [x] Feel free to re-work previous functions as needed.  Specifically, you might want to change the return value to something more useful.
- [x] Feel free to create more "helper" functions if needed

- [x] All requirement met!
---

### GAME PLAY
- "Rock-Paper-Scissors" is game with simple and well defined rules.
- Each player make a choice from the 3 available - Rock, Paper, or Scissors - in the form a hand signal.
- A fist is Rock. 
- A open hand is paper. 
- A peace sign or the index and middle fingers extended are scissors.
- When played in person, there is a count: 1, 2, 3, shoot or sometimes rock, paper, scissors, shoot, and choices are revealed simultaneously on the shoot.
- Since we are turning the game into a computer game, we'll have to do it a little differently.
- The user makes a choice.  
- The computer makes a choice.  
- They will be simultaneously displayed and compared and a victor is declared.
- If there is a tie, the round will be played again, until there is a winner.
- The game is usually played in "Best of X" or "First to X" format.
- The requirements ask for a Best of 5 game.  So Best of 5 it is.
- Definition of a Round.
  - A round is any number of plays until a winner is decided.
  - A round can last one play, or it can for as many a needed to find a winner.

#### How to Win
These are the only winning options.
- "Rock beats/breaks Scissors"
- "Paper beats/covers Rock"
- "Scissors beats/cuts Paper"

#### Ties
In the case when both players choose the same shape or weapon.  
- It is a tie.  
- You play again.
- The round is over when there is a winner.

---





