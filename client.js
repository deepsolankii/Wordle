const SEARCHAPI = "AIzaSyCfiFwdTf2oD7Ao5gIEh-DXdRdVRRyeDws";
const CX = "406c32f63bcf04813";
let lives;
let row = 0;
let column = 0;
let typedWord = "";
let allowTyping = true;
let wordDefinition;
const gameStats = JSON.parse(sessionStorage.getItem("gameData"));
let gamesPlayed = gameStats?.gamesPlayed || 0;
let gamesWon = gameStats?.gamesWon || 0;
const exampleBox = document.querySelector(".definition");
const modal = document.querySelector(".modal");
const body = document.querySelector("body");
const errorBox = document.querySelector(".error");
const header = document.querySelector("h1");
const refreshButton = document.querySelector(".refresh");
const letterBox = document.querySelector(".letters");
const childLetters = Array.from(letterBox.children);
const wordBox = document.querySelector(".box");
const modeBox = document.querySelector(".mode");
const keyboardContainer = document.querySelector(".board");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-modal");

let theme = sessionStorage.getItem("theme") || "light";
let correctWord, wordArray, words_all, letterNum;
header.focus();
letterNum = sessionStorage.getItem("letterNum") || "5";
lives = +letterNum + 1;
// console.log(document.querySelector('input[name="mode"]:checked').value);

modeBox.addEventListener("click", (e) => {
  // console.log("reached");
  theme = document.querySelector('input[name="mode"]:checked').value;
  if (theme === "light") {
    body.classList.remove("dark-mode");
    return sessionStorage.setItem("theme", "light");
  }
  body.classList.add("dark-mode");
  sessionStorage.setItem("theme", "dark");
});

if (theme === "light") {
  body.classList.remove("dark-mode");
  document.querySelector("#light").checked = true;
} else {
  body.classList.add("dark-mode");
  document.querySelector("#dark").checked = true;
}
// header.insertAdjacentHTML(
//   "afterend",
//   `<h2>Remaining Lives: <span class="lives">${lives}</span></h2>`
// );
// fetch("new_words.json")
//   .then((res) => res.json())
//   .then((data) => {
//     const wordsArr = []
//     wordsArr.push(data['4']);
//     wordsArr.push(data['5']);
//     wordsArr.push(data['6']);
//     wordsArr.push(data['7']);
//     wordsArr.forEach(item=>{
//       fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${item}`).then(res=>res.json())
//     })
//   });
const wait = (ms) => {
  const d = new Date();
  let d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
};

childLetters.forEach((ele) => {
  if (ele.innerText === letterNum) {
    ele.className = ele.className + " " + "active";
  }
});

const displayLetterBox = (num) => {
  for (let i = 0; i <= num; i++) {
    let html = '<div class="row">';
    for (let j = 0; j < num; j++) {
      html += '<div class="split"></div>';
    }
    html += "</div>";
    wordBox.insertAdjacentHTML("beforeend", html);
  }
};
displayLetterBox(letterNum);
const rowArray = document.querySelectorAll(".row");
// const input = document.querySelector("#word");
// const uL = document.querySelector(".entered__word");
const randomWord = (num) => {
  fetch("./dict_words.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      words_all = data[num];
      const totalWords = words_all.length;
      const randInt = Math.floor(Math.random() * totalWords);
      correctWord = words_all[randInt].toUpperCase();
      // correctWord = "SNAIL";
      wordArray = [...correctWord];
      console.log(correctWord);
    });
  // return fetch(
  //   `https://www.googleapis.com/customsearch/v1?key=${SEARCHAPI}&cx=${CX}&q=${correctWord} definition`
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //     const items = data.items;
  //     items.forEach((item) => {
  //       if (item.displayLink === "www.urbandictionary.com") {
  //         console.log(item.snippet);
  //       }
  //     });
  //   });
};
randomWord(letterNum);
// console.log(data.correctWord);
// data.correctWord = data.correctWord.toUpperCase();
// const wordArray = [...data.correctWord];
// const words_all = data.words_all;

const closeModal = () => {
  overlay.classList.add("hide");
  modal.classList.add("hide");
  header.style.opacity = 1;
  letterBox.style.opacity = 1;
  keyboardContainer.style.opacity = 1;
};

const showModal = () => {
  overlay.classList.toggle("hide");
  modal.classList.toggle("hide");
  window.removeEventListener("keydown", () => {});
  // header.style.opacity = 0.2;
  letterBox.style.opacity = 1;
  keyboardContainer.style.opacity = 0.2;
};

const updateGameStates = (won, played) => {
  document.querySelector(".game-played").innerText = played;
  document.querySelector(".game-won").innerText = won;
  let winPercent;
  if (played === 0) {
    winPercent = 0;
  } else {
    winPercent = (won / played) * 100;
  }
  document.querySelector(".win-percent").innerText = winPercent.toFixed(2);
};
updateGameStates(gamesWon, gamesPlayed);

const addDefiniton = (partOfSpeech, definition, example) => {
  let html = `<div class="example-row">`;
  if (example) {
    html += `<div class="part-of-speech">${correctWord}<p>(${partOfSpeech})</p></div><div class="example"><p><b>Definition:&ensp;</b>${definition}</p><p><b>Example:&ensp;</b>${example}</p></div>`;
  } else {
    html += `<div class="part-of-speech">${correctWord}<p>(${partOfSpeech})</p></div><div class="example"><p><b>Definition:&ensp;</b>${definition}</p></div>`;
  }
  html += `</div>`;
  exampleBox.insertAdjacentHTML("beforeend", html);
};

letterBox.addEventListener("click", (e) => {
  const numBox = e.target.closest(".num-split");
  // console.log(numBox.className.split(" ")[1]);
  if (numBox === null) return;
  letterNum = numBox.innerText;
  if (numBox.className.split(" ")[1]) {
    window.location.reload();
  }
  childLetters.forEach((ele) => {
    ele.className = ele.className.split(" ")[0];
  });
  // document.querySelector(".split").classList.remove("active");
  numBox.classList.add("active");
  sessionStorage.setItem("letterNum", letterNum);
  window.location.reload();
  // randomWord(letterNum);
});

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
  theme: "hg-theme-default myTheme1",
});

const displayWordDefination = () => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${correctWord}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.title === "No Definitions Found") {
        addDefiniton("Not a Word", "It was a prank. There is no such word");
      } else {
        const wordDefinition = data;
        wordDefinition.forEach((obj) => {
          // console.log(obj);
          obj["meanings"].forEach((meaning) => {
            meaning["definitions"].forEach((defi) => {
              if (defi.example) {
                addDefiniton(
                  meaning.partOfSpeech,
                  defi.definition,
                  defi.example
                );
              } else {
                addDefiniton(meaning.partOfSpeech, defi.definition);
              }
            });
          });
        });
      }
    });
};

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
    rowDiv[column].innerHTML = `<div>${letter}<div>`;
    rowDiv[column].style.border = "2px solid var(--border-color)";
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
  childs[column - 1].style.border = "1px solid var(--border-color)";
  typedWord = typedWord.slice(0, -1);
  column--;
};

const checkOnEnter = () => {
  const wordCopy = wordArray.slice();
  if (
    typedWord.length !== +letterNum ||
    !words_all.includes(typedWord.toLowerCase())
  ) {
    rowArray[row].classList.add("horizontal-shake");
    setTimeout(() => {
      rowArray[row].classList.remove("horizontal-shake");
    }, 500);
    // errorBox.classList.toggle("hide");
    // setTimeout(() => {
    //   errorBox.classList.toggle("hide");
    // }, 1000);
    return;
  }
  if (row === 0) {
    gamesPlayed++;
    sessionStorage.setItem(
      "gameData",
      JSON.stringify({ gamesWon, gamesPlayed })
    );
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
    // childs[i].className = childs[i].className + " " + "flip";
    // childs[i].children[0].className = "not-flip";
    // childs[i].style.backgroundColor = color;
    // childs[i].style.color = "white";
    // console.log(char.toLowerCase());
    const btn = myKeyboard.getButtonElement(char);
    // console.log(btn.style.backgroundColor);
    if (btn.style.backgroundColor !== green) {
      setTimeout(() => (btn.style.backgroundColor = color), 400 * letterNum);
    }
    setTimeout(() => {
      // console.log("hi", i);
      childs[i].className = childs[i].className + " " + "flip";
      childs[i].children[0].className = "not-flip";
      childs[i].style.color = "white";
      childs[i].style.backgroundColor = color;
      allowTyping = false;
    }, 400 * i);
  });
  setTimeout(() => {
    allowTyping = true;
  }, 400 * letterNum);
  if (allowTyping) {
    lives--;
    // console.log(lives);
    // document.querySelector(".lives").innerText = lives;
  }
  if (typedWord === correctWord) {
    if (!allowTyping) return;
    allowTyping = false;
    gamesWon++;
    updateGameStates(gamesWon, gamesPlayed);
    sessionStorage.setItem(
      "gameData",
      JSON.stringify({ gamesPlayed, gamesWon })
    );
    displayWordDefination();
    setTimeout(() => {
      showModal();
      overlay.addEventListener("click", () => {
        closeModal();
      });
    }, 400 * letterNum + 2000);
    return setTimeout(() => {
      partAnimation();
      header.innerText = "You won the Game";
      header.style.color = "green";
    }, 400 * letterNum);
  }

  if (lives === 0) {
    setTimeout(() => {
      allowTyping = false;
      updateGameStates(gamesWon, gamesPlayed);
      sessionStorage.setItem(
        "gameData",
        JSON.stringify({ gamesPlayed, gamesWon })
      );
      displayWordDefination();
      setTimeout(() => {
        showModal();
        overlay.addEventListener("click", () => {
          closeModal();
        });
      }, 400 * letterNum + 1000);
      setTimeout(() => {
        header.innerText = `Game Over, Correct Word - ${correctWord}`;
        header.style.color = "red";
      }, 250);

      setInterval(() => {
        header.innerText = `Game Over, Correct Word - ${correctWord}`;
        header.style.color = "red";
        setTimeout(() => {
          header.innerText = "";
        }, 250);
      }, 500);
    }, 400 * letterNum);
  }
  // keep below three lines at bottom
  row++;
  column = 0;
  typedWord = "";
};
window.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key === "Tab") {
    if (letterNum === "7") {
      sessionStorage.setItem("letterNum", "4");
    } else {
      sessionStorage.setItem("letterNum", +letterNum + 1);
    }
    window.location.reload();
  }
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
      if (column > letterNum - 1) {
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

closeButton.addEventListener("click", () => {
  showModal();
});

// refreshButton.addEventListener("click", () => {
//   window.location.reload();
// });

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
  if (allowTyping === false) return;
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
