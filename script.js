let filledBoard = solveSudoku_01(board);
let wrongEntryBtn = document.querySelector(".remainingWrongEntry");

let isValid = function (ele, e) {
  // console.log(ele[0].classList[4], e.key);

  let idxI = (ele[0].classList[2].charAt(3) | 0) - 1;
  let idxJ = (ele[0].classList[3].charAt(3) | 0) - 1;

  let newBoardForValidation = [];
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  newBoardForValidation.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  let allCell = document.querySelectorAll(".input");

  for (let i = 0; i < 81; i++) {
    let idxI = (allCell[i].classList[2].charAt(3) | 0) - 1;
    let idxJ = (allCell[i].classList[3].charAt(3) | 0) - 1;
    newBoardForValidation[idxI][idxJ] = allCell[i].value;
  }

  if (!isValidToPlaceNumber(newBoardForValidation, idxI, idxJ, e.key)) {
    ele[0].classList.add("wrongSelection");
    remainingWromgEntry = remainingWromgEntry - 1;
    wrongEntryBtn.innerText = `${remainingWromgEntry}`;

    if (remainingWromgEntry <= 0) {
      alert("You lose the Match");
      window.location.reload();
    }
  } else {
    ele[0].classList.remove("wrongSelection");
  }
};

function sudokuDesign() {
  let container = document.querySelector(".sudokuContainer");
  for (let i = 0; i < 9; i++) {
    let box = document.createElement("div");
    box.classList.add("box");

    let divide = ~~(i / 3);
    let row = divide == 0 ? 1 : divide == 1 ? 4 : 7;

    let mod = i % 3;
    let col = mod == 0 ? 1 : mod == 1 ? 4 : 7;

    for (let j = 0; j < 9; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      let input = document.createElement("input");
      input.type = "number";
      input.min = 1;
      input.max = 9;
      input.setAttribute("contenteditable", "true");
      input.classList.add("input");
      input.classList.add(`box${i + 1}`);
      input.classList.add(`row${row}`);
      input.classList.add(`col${col}`);
      input.classList.add(`cell${row}${col}`);

      input.addEventListener("keydown", (e) => {
        if (e.currentTarget.classList[5] !== "clue") input.value = "";
      });

      input.addEventListener("click", (e) => {
        let idxI = (e.path[0].classList[2].charAt(3) | 0) - 1;
        let idxJ = (e.path[0].classList[3].charAt(3) | 0) - 1;
        if (remainingHint <= 0) {
          document.querySelector(".hint").classList.remove("select");
          hintState = false;
        }
        if (
          hintState &&
          remainingHint > 0 &&
          !e.path[0].classList.contains("clue") &&
          !e.path[0].classList.contains("green")
        ) {
          console.log(idxI, idxJ);

          //////////////////////////board
          let newBoard_02 = [];
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
          newBoard_02.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);

          let allCell = document.querySelectorAll(".input");

          for (let i = 0; i < 81; i++) {
            let idxI = (allCell[i].classList[2].charAt(3) | 0) - 1;
            let idxJ = (allCell[i].classList[3].charAt(3) | 0) - 1;
            if (allCell[i].value != null)
              newBoard_02[idxI][idxJ] = allCell[i].value;
            else newBoard_02[idxI][idxJ] = 0;
          }
          //////////////board
          let validArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          while (true) {
            let randomIdx = (Math.random() * validArr.length) | 0;
            randomVal = validArr[randomIdx];
            validArr.splice(randomIdx,randomIdx);
            if (isValidToPlaceNumber(newBoard_02, idxI, idxJ, randomVal)) {
              e.path[0].value = randomVal;
              e.path[0].classList.add("green");
              break;
            }
          }
          let hintBtn = document.querySelector(".hint");
          hintBtn.innerText = `Hint (${--remainingHint})`;
        } else {
          input.addEventListener("keydown", (ele) => {
            isValid(e.path, ele);
          });
        }
      });

      input.addEventListener("keypress", (e) => {
        if (e.key == 0) {
          alert("Please Enter Valid Key from 1 to 9");
          e.preventDefault();
        }
      });

      if (j % 3 == 2) {
        row -= 2;
        col++;
      } else {
        row++;
      }

      cell.appendChild(input);
      box.appendChild(cell);
    }
    container.appendChild(box);
  }
}

sudokuDesign();
