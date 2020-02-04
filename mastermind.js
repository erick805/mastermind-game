const fetchCombinationAndRender = async () => {
  try {
    const res = await fetch(
      `https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    );

    if (res.status === 200) {
      const data = await res.text();
      const combinations = data.split("\n");

      renderCombinations(combinations);
      return data.split("\n");
    } else if (res.status === 503) {
      console.error(await res.text());
    } else if (res.status === 301) {
      console.error("Url moved permanently");
    }
  } catch (err) {
    console.error(err);
  }
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
