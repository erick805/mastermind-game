import {
  updateProgressBar,
  renderHistory,
  renderTime,
  playSound
} from "../utilities.js";
import Game from "../Game.js";

const newGame = async () => {
  const game = await Game.init();
  return game;
};

const playGame = async () => {
  const game = await newGame();
  const unlock = document.getElementById("submit");
  const inputs = document.querySelectorAll("input");
  const viewHistory = document.getElementById("history-button");

  renderTime();

  for (const input of inputs) {
    input.addEventListener("click", () => {
      playSound("select");
    });
  }

  unlock.addEventListener("click", () => {
    const feedback = document.getElementById("feedback");

    for (const { value } of inputs) {
      game.currentGuess.push(value);
    }

    game.checkGuess();
    updateProgressBar(game);
    // game.timeTaken = time;
    if (feedback.innerText === `YOU ESCAPED! Phew!`) {
      playSound("unlock");
    }
    playSound("lock");
  });

  viewHistory.addEventListener("click", () => {
    renderHistory(game);
  });
};

playGame();
