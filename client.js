import data from "./wordGenerator.js";

let lives = 6;
let row = 0;
let column = 0;
let typedWord = "";
let allowTyping = true;
const errorBox = document.querySelector(".error");
const header = document.querySelector("h1");
const refreshButton = document.querySelector(".refresh");
// const input = document.querySelector("#word");
// const uL = document.querySelector(".entered__word");

console.log(data.correctWord);
data.correctWord = data.correctWord.toUpperCase();
const wordArray = [...data.correctWord];
const words_all = data.words_all;

const rowArray = document.querySelectorAll(".row");
// const form = document.querySelector(".wordle");
const Keyboard = window.SimpleKeyboard.default;

const myKeyboard = new Keyboard({
  onKeyPress: (button) => onKeyPress(button),
  layout: {
    default: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "{enter} Z X C V B N M {bksp}",
    ],
  },
});

const partAnimation = () => {
  party.confetti(document.querySelector("body"), {
    count: 100,
    size: 2,
    spread: 50,
    shapes: ["square", "circle"],
  });
};

const insertLetter = (letter) => {
  const rowDiv = rowArray[row].children;
  if (rowDiv[column]) {
    rowDiv[column].innerText = letter;
    rowDiv[column].style.border = "2px solid black";
    typedWord += letter;
    column++;
  }
};

const removeLetter = () => {
  if (!allowTyping) return;
  if (column === 0) {
    return;
  }
  const childs = Array.from(rowArray[row].children);
  childs[column - 1].innerText = "";
  childs[column - 1].style.border = "1px solid black";
  typedWord = typedWord.slice(0, -1);
  // console.log(typedWord, column);
  column--;
};

const checkOnEnter = () => {
  const wordCopy = wordArray.slice();
  if (typedWord.length !== 5 || !words_all.includes(typedWord.toLowerCase())) {
    errorBox.classList.toggle("hide");
    setTimeout(() => {
      errorBox.classList.toggle("hide");
    }, 1000);
    return;
  }

  // console.log([...typedWord]);
  const green = "rgb(106, 170, 100)";
  const yellow = "rgb(201, 180, 88)";
  const grey = "rgb(120, 124, 126)";
  [...typedWord].forEach((char, i) => {
    let color = grey;
    // console.log(wordCopy);
    if (wordCopy.includes(char)) {
      color = yellow;
      if (wordArray[i] === char) {
        color = green;
      }
      const index = wordCopy.indexOf(char);
      wordCopy.splice(index, 1);
    }
    const childs = Array.from(rowArray[row].children);
    // childs[i].className = childs[i].className + " " + color;
    childs[i].style.backgroundColor = color;
    // console.log(char.toLowerCase());
    const btn = myKeyboard.getButtonElement(char);
    // console.log(btn.style.backgroundColor);
    if (btn.style.backgroundColor !== green) {
      btn.style.backgroundColor = color;
    }
  });
  if (allowTyping) {
    lives--;
    document.querySelector(".lives").innerText = lives;
  }
  if (typedWord === data.correctWord) {
    if (!allowTyping) return;
    allowTyping = false;
    header.innerText = "You won the Game";
    return setTimeout(() => {
      partAnimation();
    }, 100);
  }

  if (lives === 0) {
    allowTyping = false;

    setTimeout(() => {
      header.innerText = `Game Over, Correct Word - ${data.correctWord}`;
      header.style.color = "red";
    }, 250);

    setInterval(() => {
      header.innerText = `Game Over, Correct Word - ${data.correctWord}`;
      header.style.color = "red";
      setTimeout(() => {
        header.innerText = "";
      }, 250);
    }, 500);
  }
  // keep below three lines at bottom
  row++;
  column = 0;
  typedWord = "";
};
window.addEventListener("keydown", (e) => {
  // console.log(e);
  if (allowTyping === true) {
    if (e.key === "Backspace") {
      removeLetter();
    }

    if (e.key === "Enter") {
      // console.log(column, typedWord);
      checkOnEnter();
    }

    if (e.code?.match("Key")) {
      // console.log(column, typedWord);
      if (column > 4) {
        return;
      }
      const letter = e.key.toUpperCase();
      insertLetter(letter);
      // const rowDiv = rowArray[row].children;
      // // console.log(rowDiv);
      // rowDiv[column].innerText = letter;
      // typedWord += letter;
      // column++;
    }
  }
});

refreshButton.addEventListener("click", () => {
  window.location.reload();
});

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const enteredWord = input.value.toUpperCase();
//   const wordCopy = wordArray.slice();
//   // console.log(wordCopy);
//   if (lives === 1 || data.correctWord === enteredWord) {
//     form.classList.toggle("hide");
//     if (data.correctWord === enteredWord) {
//       header.innerText = "You won the Game";
//       party.confetti(document.querySelector("body"), {
//         count: 100,
//         size: 2,
//         spread: 50,
//         shapes: ["square", "circle"],
//       });
//     } else {
//       setTimeout(() => {
//         header.innerText = `Game Over, Correct Word - ${data.correctWord}`;
//         header.style.color = "red";
//       }, 500);

//       setInterval(() => {
//         header.innerText = `Game Over, Correct Word - ${data.correctWord}`;
//         setTimeout(() => {
//           header.innerText = "";
//         }, 500);
//       }, 1000);
//     }
//   }

//   if (words_all.includes(enteredWord.toLowerCase())) {
//     lives--;
//     document.querySelector(".lives").innerText = lives;
//     let html = `<div class= "solo__word">`;
//     [...enteredWord].forEach((char, i) => {
//       let color = "grey";
//       // console.log(wordCopy);
//       if (wordCopy.includes(char)) {
//         color = "orange";
//         if (wordArray[i] === char) {
//           color = "green";
//         }
//         const index = wordCopy.indexOf(char);
//         // console.log(index, char);
//         wordCopy.splice(index, 1);
//       }
//       html += `<span class=${color}>${char}</span>`;
//       // uL.insertAdjacentHTML("beforeend", `<span class=${color}>${char}</span>`);
//     });
//     // uL.insertAdjacentHTML("beforeend", `<p class="break"></p>`);
//     html += `</div>`;
//     uL.insertAdjacentHTML("beforeend", html);
//   } else {
//     errorBox.classList.toggle("hide");
//     setTimeout(() => {
//       errorBox.classList.toggle("hide");
//     }, 1000);
//   }
//   input.value = "";
// });

function onKeyPress(button) {
  // console.log("Button pressed", button);
  if (button === "{enter}") {
    checkOnEnter();
  } else if (
    !["{enter}", "{tab}", "{lock}", "{shift}", "{bksp}", "{space}"].includes(
      button
    )
  ) {
    insertLetter(button.toUpperCase());
  } else if (button === "{bksp}") {
    removeLetter();
  }
}
