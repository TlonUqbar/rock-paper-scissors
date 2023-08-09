# ROCK-PAPER-SCISSORS (UI) GAME V2

## REQUIREMENTS (AND NO RESTRICTIONS - SO I WENT CRAZY AND HAD FUN!)

#### git Tasks
- [x] Create a new branch and work from it
- [x] Push new branch to remote with 'git push origin rock-paper-scissors-ui'
- [x] Merge feature branch into main branch
- [x] Prune feature branch with 'git push --delete origin rock-paper-scissors-ui'

#### UI Requirements and Tasks
- [x] Play game by clicking buttons
- [x] Temporarily remove logic to play only 5 rounds
- [x] Create 3 buttons, one for each selection. 
  - [x] Add an Event Listener to each button 
  - [x] when clicked the button will call "playRound" with correct "playerSelection" 
- [x] Add a 'div' for displaying results
- [x] Change all 'console.log()'s  into DOM methods.
- [x] Display the running score.
- [x] Announce the winner of the game when a players reaches 5 points.
- [x] Refactor original work to make this work.

#### Bonus:
- [x] Add a log to record previous plays.
- [x] Play game by pressing keys.
- [x] Add transitions to indicate start of play and end of play.
- [x] Keep original game [console-game](https://tlonuqbar.github.io/rock-paper-scissors/console-game/)
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
- The requirements ask for (console version) a Best of 5 game.  So Best of 5 it is.
	- The UI version changed that to first to 5. First to 5 point wins.
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





