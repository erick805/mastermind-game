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

  for (const [guess, feedback] of game.playersGuesses.entries()) {
    const li = document.createElement("li");
    li.innerText = `${guess} ${feedback}`;
    historyInput.appendChild(li);
  }
};

const renderTime = () => {
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
};

const playSound = soundStr => {
  document.getElementById(soundStr).play();
};

export { updateProgressBar, renderHistory, renderTime, playSound };
