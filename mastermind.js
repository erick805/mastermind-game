const fetchCombination = async (num = 4) => {
  try {
    const res = await fetch(
      `https://www.random.org/integers/?num=${num}&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    );

    if (res.status === 200) {
      const data = await res.text();
      const combinations = data.split("\n").filter(c => c.length);

      return combinations;
    } else if (res.status === 503) {
      console.error(await res.text());
    } else if (res.status === 301) {
      console.error("Url moved permanently");
    }
  } catch (err) {
    console.error(err);
  }
};

class Game {
  constructor() {
    this._winningCombination = [];
    this.playersGuesses = new Map();
    this.currentGuess = [];
    this.TOTAL_ATTEMPTS = 10;
    // this.timeTaken = null;
    this.attemptsTaken = 0;
  }

  static init() {
    return (async function() {
      const game = new Game();

      await game.build();
      return game;
    })();
  }

  async build() {
    // const locks = document.getElementById("amount-of-locks");
    // const num = locks.options[locks.selectedIndex].text;
    const combination = await fetchCombination();
    this._winningCombination = combination;
  }

  checkGuess() {
    let feedback = "";
    const switches = { correct: false, correctInPlace: false };
    let { correct, correctInPlace } = switches;
    let counter = 0;

    const feedbackInput = document.getElementById("feedback");
    for (let i = 0; i < this.currentGuess.length; i++) {
      const guess = this.currentGuess[i];
      if (this._winningCombination.find(num => num === guess)) {
        correct = true;
      }
      if (guess === this._winningCombination[i]) {
        correctInPlace = true;
        counter++;
      }
    }

    if (this.attemptsTaken < this.TOTAL_ATTEMPTS) {
      this.attemptsTaken++;
    }

    if (
      counter === this._winningCombination.length &&
      this.attemptsTaken <= this.TOTAL_ATTEMPTS
    ) {
      feedbackInput.innerHTML = `You escaped!`;
      return;
    } else if (this.attemptsTaken === this.TOTAL_ATTEMPTS) {
      feedbackInput.innerHTML = "Better luck next time buddy.";
      return;
    }

    if ((correctInPlace || correct) && correctInPlace) {
      feedback = `Got a correct number and place!`;
    } else if ((correctInPlace || correct) && !correctInPlace) {
      feedback = `You got a correct number`;
    } else if (!(correct && correctInPlace)) {
      feedback = `Sorry your number is incorrect`;
    }

    this.playersGuesses.set({ guess: this.currentGuess, feedback });
    this.provideHint(counter);
    this.currentGuess = [];
    feedbackInput.innerHTML = feedback;
    return feedback;
  }

  provideHint(counter) {
    const hintButton = document.getElementById("hint-button");
    const hint = document.getElementById("hint");

    hintButton.addEventListener("click", () => {
      hint.innerText = `You got ${counter} numbers and locations right!`;
    });
  }
}

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

playGame();
