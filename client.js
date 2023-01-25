import data from "./wordGenerator.js";

let lives = 6;
const input = document.querySelector("#word");
const uL = document.querySelector(".entered__word");
const errorBox = document.querySelector(".error");
const header = document.querySelector("h1");

// console.log(data.correctWord);
data.correctWord = data.correctWord.toUpperCase();
// const wordObj = {};
// wordArray.forEach((val, i) => {
//   wordObj[i] = val;
// });
const wordArray = [...data.correctWord];
const words_all = data.words_all;

const form = document.querySelector(".wordle");

// window.addEventListener("beforeunload", () => {
//   console.log("hi");
//   return "Are YOU sure";
// });

// window.addEventListener("keydown", (e) => {
//   console.log(e);
//   if (e.code.match("Key")) {
//     console.log(e.key);
//   }
// });

document.querySelector(".submit").addEventListener("click", () => {
  window.location.reload();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const enteredWord = input.value.toUpperCase();
  const wordCopy = wordArray.slice();
  // console.log(wordCopy);
  if (lives === 1 || data.correctWord === enteredWord) {
    form.classList.toggle("hide");
    if (data.correctWord === enteredWord) {
      header.innerText = "You won the Game";
      party.confetti(document.querySelector("body"), {
        count: 100,
        size: 2,
        spread: 50,
        shapes: ["square", "circle"],
      });
    } else {
      setTimeout(() => {
        header.innerText = `Game Over, Correct Word - ${data.correctWord}`;
        header.style.color = "red";
      }, 500);

      setInterval(() => {
        header.innerText = `Game Over, Correct Word - ${data.correctWord}`;
        setTimeout(() => {
          header.innerText = "";
        }, 500);
      }, 1000);
    }
  }

  if (words_all.includes(enteredWord.toLowerCase())) {
    lives--;
    document.querySelector(".lives").innerText = lives;
    let html = `<div class= "solo__word">`;
    [...enteredWord].forEach((char, i) => {
      let color = "grey";
      // console.log(wordCopy);
      if (wordCopy.includes(char)) {
        color = "orange";
        if (wordArray[i] === char) {
          color = "green";
        }
        const index = wordCopy.indexOf(char);
        // console.log(index, char);
        wordCopy.splice(index, 1);
      }
      html += `<span class=${color}>${char}</span>`;
      // uL.insertAdjacentHTML("beforeend", `<span class=${color}>${char}</span>`);
    });
    // uL.insertAdjacentHTML("beforeend", `<p class="break"></p>`);
    html += `</div>`;
    uL.insertAdjacentHTML("beforeend", html);
  } else {
    errorBox.classList.toggle("hide");
    setTimeout(() => {
      errorBox.classList.toggle("hide");
    }, 1000);
  }
  input.value = "";
});
