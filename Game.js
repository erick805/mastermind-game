import fetchCombination from "./fetchCombination.js";

export default class Game {
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
      feedbackInput.innerText = `YOU ESCAPED! Phew!`;
      return;
    } else if (this.attemptsTaken === this.TOTAL_ATTEMPTS) {
      feedbackInput.innerText = "Better luck next time buddy.";
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
    feedbackInput.innerText = feedback;
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
