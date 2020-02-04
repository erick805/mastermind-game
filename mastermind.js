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
}

async function newGame() {
  const game = await Game.init();
}

newGame();

const fetchCombinationAndRender = async () => {
  const combinations = await fetchCombination();
  renderCombinations(combinations);
};

const renderCombinations = combinations => {
  combinations.forEach((c, idx) => {
    if (c) {
      const li = document.createElement("li");
      li.innerText = c;
      li.id = idx;
      document.getElementById("combination").appendChild(li);
      return li;
    }
  });
};

fetchCombinationAndRender();
