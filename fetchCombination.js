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

export default fetchCombination;
