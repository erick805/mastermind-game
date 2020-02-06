const fetchCombination = async () => {
  try {
    const res = await fetch(
      `https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`
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
    // this.playersGuesses = [];
    this.playersGuesses = new Set();
    this.currentGuess = [];
    // this.cache = new Set();
    // this.currentGuess = {};
    this.TOTAL_ATTEMPTS = 10;
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
    const combination = await fetchCombination();
    this._winningCombination = combination;
  }

  checkGuess() {
    let feedback = "";
    const switches = { correct: false, correctInPlace: false };
    let { correct, correctInPlace } = switches;
    const feedbackInput = document.getElementById("feedback");

    for (let i = 0; i < this.currentGuess.length; i++) {
      const guess = this.currentGuess[i];
      if (this._winningCombination.find(num => num === guess)) {
        correct = true;
      }
      if (guess === this._winningCombination[i]) {
        correctInPlace = true;
      }
    }

    if ((correctInPlace || correct) && correctInPlace) {
      feedback = `You got a correct number and place!`;
    } else if ((correctInPlace || correct) && !correctInPlace) {
      feedback = `You got a correct number`;
    } else if (!(correct && correctInPlace)) {
      feedback = `Sorry your number is incorrect`;
    }
    this.attemptsTaken++;
    this.playersGuesses.add({ guess: this.currentGuess, feedback });
    this.currentGuess = [];
    this.updateProgressBar();
    feedbackInput.innerHTML = feedback;
    return feedback;
  }

  updateProgressBar() {
    const feedbackInput = document.getElementById("progress-bar-full");
    const attempts = this.attemptsTaken;

    const width = (attempts / this.TOTAL_ATTEMPTS) * 100;

    feedbackInput.style.width = `${width}%`;
  }
}

const newGame = async () => {
  const game = await Game.init();
  return game;
};

const playGame = async () => {
  const game = await newGame();
  const unlock = document.getElementById("submit");

  unlock.addEventListener("click", () => {
    const inputs = document.querySelectorAll("input");
    for (const { value } of inputs) {
      game.currentGuess.push(value);
    }
    game.checkGuess();
  });
};

playGame();
