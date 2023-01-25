let correctWord;
let words_all;
await fetch("./words.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    words_all = Object.values(data);
    const totalWords = Object.keys(data).length;
    const randInt = Math.floor(Math.random() * totalWords);
    correctWord = data[randInt];
  });

export default { correctWord, words_all };
