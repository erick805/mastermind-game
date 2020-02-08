import { updateProgressBar, renderHistory, renderTime } from "../utilities.js";
import Game from "../Game.js";

const newGame = async () => {
  const game = await Game.init();
  return game;
};

const playGame = async () => {
  const game = await newGame();
  const unlock = document.getElementById("submit");
  const viewHistory = document.getElementById("history-button");

  renderTime();

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
