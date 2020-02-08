const updateProgressBar = game => {
  const feedbackBar = document.getElementById("progress-bar-full");
  const attemptsInput = document.getElementById("attempts-taken");
  const attempts = game.attemptsTaken;
  const width = (attempts / game.TOTAL_ATTEMPTS) * 100;
  feedbackBar.style.width = width <= 100 ? `${width}%` : "100%";
  attemptsInput.innerHTML =
    attempts <= 10
      ? `Attempts Taken: ${attempts}/${game.TOTAL_ATTEMPTS}`
      : `Attempts Taken: ${game.TOTAL_ATTEMPTS}/${game.TOTAL_ATTEMPTS}`;
};

const renderHistory = game => {
  const historyInput = document.getElementById("history");
  const cache = new Set();

  for (const val of game.playersGuesses) {
    const pastGuess = val[0];
    const { guess, feedback } = pastGuess;
    const strGuess = guess.join("");
    cache.add(`${strGuess} ${feedback}`);
  }
  for (const val of cache) {
    const li = document.createElement("li");
    li.innerText = val;
    historyInput.appendChild(li);
  }
};

export { updateProgressBar, renderHistory };
