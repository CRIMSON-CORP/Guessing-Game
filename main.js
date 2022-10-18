let PLAYER_NAME, PLAYER_LEVEL, PLAYER_POINTS, MIN_RANGE, MAX_RANGE, SECRET_NUMBER, NO_OF_LIVES;

PLAYER_NAME = prompt("Hello What is your name?");

while (!PLAYER_NAME) {
  PLAYER_NAME = prompt("Please tell me your name?");
}
main();

function main() {
  PLAYER_LEVEL = 1;
  PLAYER_POINTS = 0;
  MIN_RANGE = 1;
  MAX_RANGE = 2;
  NO_OF_LIVES = 3;
  SECRET_NUMBER = generateNewSecretNumber();

  welcome();
  outputResult();
  collectAnswer();

  function collectAnswer() {
    let response = prompt(
      `Guess my secret number🤭, its between ${MIN_RANGE} and ${MAX_RANGE}🤭...`
    );
    while (response !== SECRET_NUMBER) {
      if (NO_OF_LIVES <= 0) {
        playerLoose();
        break;
      } else if (Number.isNaN(parseInt(response))) {
        response = prompt("Please write a number😒..");
      } else if (response > SECRET_NUMBER) {
        --NO_OF_LIVES;
        response = prompt("Too high, try lower🤭..");
      } else if (response < SECRET_NUMBER) {
        --NO_OF_LIVES;
        response = prompt("Too low, try higher🤭..");
      } else {
        playerWin();
        break;
      }
    }
  }

  function playerWin() {
    console.log("Way to go!!, you got my number🤩");
    let response = prompt("Press Enter...");
    console.log("Ready for the next Level?😏");
    response = prompt("Press Enter...");
    PLAYER_LEVEL++;
    PLAYER_POINTS++;
    MAX_RANGE++;
    SECRET_NUMBER = generateNewSecretNumber();

    NO_OF_LIVES = 3 + Math.floor(PLAYER_LEVEL / 3);

    outputResult();
    collectAnswer();
  }

  function playerLoose() {
    console.log("=============================================");
    console.log("You've run out of lives 😭😭");
    console.log("Nice game though, you did Well😃");
    outputResult();
    console.log("Press Control+C to exit the game");
    return;
  }
  function outputResult() {
    console.table({
      Player: PLAYER_NAME,
      Level: PLAYER_LEVEL,
      Points: PLAYER_POINTS,
    });
  }

  function generateNewSecretNumber() {
    return Math.floor(Math.random() * (MAX_RANGE - MIN_RANGE + 1) + MIN_RANGE);
  }
}

function welcome() {
  console.log(`Hey ${PLAYER_NAME}!, welcome to my guessing game!`);
  let response = prompt("Press Enter...");
  console.log(
    "I will think of a secrete number, and you're going to try and guess it!, nice stuff right?"
  );
  response = prompt("Press Enter...");
  console.log("Now the rules");
  console.log(
    "You have 3 lives for starters, then you get an aditional life for every 3 levels you pass, sounds fun right?"
  );
  response = prompt("Press Enter...");
  console.log("Great, lets get this 🤩!");
}
