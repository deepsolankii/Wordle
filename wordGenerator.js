let correctWord;
let words_all;
let letterNum = 5;

const letterBox = document.querySelector(".letters");
const childLetters = Array.from(letterBox.children);
letterBox.addEventListener("click", (e) => {
  const numBox = e.target.closest(".split");
  // console.log(numBox.className.split(" ")[1]);
  letterNum = numBox.innerText;
  if (numBox.className.split(" ")[1]) {
    console.log(letterNum);
    window.location.reload();
  }
  childLetters.forEach((ele) => {
    ele.className = ele.className.split(" ")[0];
  });
  // document.querySelector(".split").classList.remove("active");
  numBox.classList.add("active");
});

await fetch("./new_words.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    words_all = data["5"];
    const totalWords = words_all.length;
    const randInt = Math.floor(Math.random() * totalWords);
    correctWord = words_all[randInt];
    console.log(correctWord);
  });

// await fetch("./words.json")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     words_all = Object.values(data);
//     const totalWords = Object.keys(data).length;
//     const randInt = Math.floor(Math.random() * totalWords);
//     correctWord = data[randInt];
//   });

export default { correctWord, words_all };
