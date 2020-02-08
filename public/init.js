import { updateProgressBar, renderHistory } from "../utilities.js";
import Game from "../Game.js";

const newGame = async () => {
  const game = await Game.init();
  return game;
};

const playGame = async () => {
  const game = await newGame();
  const unlock = document.getElementById("submit");
  const viewHistory = document.getElementById("history-button");

  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  let totalSeconds = 0;

  setInterval(setTime, 1000);

  function setTime() {
    totalSeconds++;
    seconds.innerHTML = stringify(totalSeconds % 60);
    minutes.innerHTML = stringify(parseInt(totalSeconds / 60));

    return `min: ${minutes.innerHTML} seconds: ${seconds.innerHTML} `;
  }

  function stringify(val) {
    let valStr = val + "";
    if (valStr.length < 2) {
      return "0" + valStr;
    } else {
      return valStr;
    }
  }

  unlock.addEventListener("click", () => {
    const inputs = document.querySelectorAll("input");

    for (const { value } of inputs) {
      game.currentGuess.push(value);
    }

    game.checkGuess();
    updateProgressBar(game);
    // game.timeTaken = time;
  });

  viewHistory.addEventListener("click", () => {
    renderHistory(game);
  });
};

playGame();
