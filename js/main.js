function main() {
  const PLAYERNAME_ELEMENT = document.querySelector(".user span:last-child");
  const MIN_RANGE_ELEMENT = document.querySelector(".title span:first-child");
  const MAX_RANGE_ELEMENT = document.querySelector(".title span:last-child");
  const PLAYER_LEVEL_ELEMENT = document.querySelector(".level span:last-child");
  const PLAYER_POINTS_ELEMENT = document.querySelector(".points span:last-child");
  const FEEDBACK_ELEMENT = document.querySelector(".feedback");
  const NUMBER_OF_TRIALS_ELEMENT = document.querySelector(".number-of-trials span");
  const GUESSED_NUMBERS_ELEMENT = document.querySelector(".guessed-numbers span");

  const FORM = document.forms[0];
  const INPUT = FORM.firstElementChild;
  const BUTTON = FORM.lastElementChild;

  let PLAYER_POINTS = 0;
  let PLAYER_LEVEL = 1;
  let MIN_RANGE = 1;
  let MAX_RANGE = 2;
  let NUMBER_OF_TRIALS = 0;
  let GUESSED_NUMBERS = [];
  let SECRET_NUMBER = generateNewSecretNumber();

  registerPlayerName(PLAYERNAME_ELEMENT);
  updateRange(MAX_RANGE);
  updatePlayerLevel(PLAYER_LEVEL);
  updatePlayerPoints(PLAYER_POINTS);

  FORM.onsubmit = function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const playerGuess = formData.get("guess-input");

    if (!playerGuess) {
      return updateInputBorderColor("red");
    }

    if (Number.isNaN(parseInt(playerGuess))) {
      updateFeedback("Please write a number!");
      return updateInputBorderColor("red");
    }

    updateNumberOfTrials(++NUMBER_OF_TRIALS);
    updateGuessedNumbers(playerGuess);

    if (playerGuess > SECRET_NUMBER) {
      updateFeedback("Your guess is too High!");
    } else if (playerGuess < SECRET_NUMBER) {
      updateFeedback("Your guess is too low");
    } else {
      playerWin();
    }
  };

  INPUT.onkeydown = () => updateInputBorderColor("white");

  function registerPlayerName() {
    let playername = prompt("Hello What is your name?");

    while (!playername) {
      playername = prompt("Please tell me your name?");
    }
    PLAYERNAME_ELEMENT.innerHTML = playername;
  }

  function updateRange(NEW_MAX_RANGE) {
    MAX_RANGE = NEW_MAX_RANGE;
    MIN_RANGE_ELEMENT.innerHTML = MIN_RANGE;
    MAX_RANGE_ELEMENT.innerHTML = NEW_MAX_RANGE;
  }

  function generateNewSecretNumber() {
    return Math.floor(Math.random() * (MAX_RANGE - MIN_RANGE + 1) + MIN_RANGE);
  }

  function updatePlayerLevel(NEW_PLAYER_LEVEL) {
    PLAYER_LEVEL = NEW_PLAYER_LEVEL;
    PLAYER_LEVEL_ELEMENT.innerHTML = NEW_PLAYER_LEVEL;
  }

  function updatePlayerPoints(NEW_PLAYER_POINT) {
    PLAYER_POINTS = NEW_PLAYER_POINT;
    PLAYER_POINTS_ELEMENT.innerHTML = NEW_PLAYER_POINT;
  }

  function updateInputBorderColor(color) {
    INPUT.style.borderColor = color;
  }

  function updateFeedback(feedback) {
    FEEDBACK_ELEMENT.innerHTML = feedback;
  }

  function updateGuessedNumbers(guessedNumber) {
    GUESSED_NUMBERS.push(guessedNumber);
    GUESSED_NUMBERS_ELEMENT.innerHTML = GUESSED_NUMBERS.slice(-10);
  }

  function updateNumberOfTrials(NEW_NUMBER_OF_TRIALS) {
    NUMBER_OF_TRIALS = NEW_NUMBER_OF_TRIALS;
    NUMBER_OF_TRIALS_ELEMENT.innerHTML = NEW_NUMBER_OF_TRIALS;
  }

  function disableForm() {
    FORM.style.pointerEvents = "none";
  }
  function enableForm() {
    FORM.style.pointerEvents = "all";
  }

  function playerWin() {
    disableForm();
    updateFeedback(`You got the Number in ${NUMBER_OF_TRIALS} guesses!`);
    updateInputBorderColor("green");

    setTimeout(() => {
      updateFeedback("You have advanced to the next level!");
      updateInputBorderColor("white");
      updateNumberOfTrials(0);
      updateGuessedNumbers([]);

      updateRange(++MAX_RANGE);
      updatePlayerLevel(++PLAYER_LEVEL);
      updatePlayerPoints(++PLAYER_POINTS);

      SECRET_NUMBER = generateNewSecretNumber();

      GUESSED_NUMBERS = [];
      GUESSED_NUMBERS_ELEMENT.innerHTML = "";

      setTimeout(() => {
        enableForm();
        updateFeedback("&nbsp;");
      }, 3000);
    }, 3000);
  }
}

window.document.addEventListener("DOMContentLoaded", main);
