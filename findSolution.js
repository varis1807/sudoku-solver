



//////Find Solution
let findSolution = function () {
  let sudokuSolverBtn = document.querySelector(".sudokuSolver");
  if (sudokuSolverBtn.classList.contains("select") && HowManyTimesFindSolution == 0) {
      HowManyTimesFindSolution++;
    let newBoard = [];
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    newBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    let allCell = document.querySelectorAll(".input");

    for (let i = 0; i < 81; i++) {
      let idxI = (allCell[i].classList[2].charAt(3) | 0) - 1;
      let idxJ = (allCell[i].classList[3].charAt(3) | 0) - 1;
      if(allCell[i].value != null)
      newBoard[idxI][idxJ] = allCell[i].value;
      else 
      newBoard[idxI][idxJ] = 0;
    }

    findSolution_01(newBoard);
  } else {
    return false;
  }
};

let findSolution_01 = function (newBoard) {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (newBoard[i][j] == 0) {
        arr.push([i, j]);
      } else {
        let filledCell = document.querySelector(`.row${i + 1}.col${j + 1}`);
        if(!isValidToPlaceNumber(newBoard,i,j,filledCell.value)){
            alert("Solution Not Possible");
            return; 
        }


        let cellToFill = document.querySelector(`.row${i + 1}.col${j + 1}`);
        cellToFill.classList.add("clue");
      }
    }
  }

  findSudokuSolution(newBoard, 0, arr);
};

let findSudokuSolution = function (board, idx, arr) {
  if (idx == arr.length) {
    return true;
  }
  let r = arr[idx][0];
  let c = arr[idx][1];
  for (let num = 1; num <= 9; num++) {
    let randomVal = (Math.random() * 9) | 0;
    randomVal = randomVal + 1;
    if (isValidToPlaceNumber(board, r, c, randomVal)) {
      board[r][c] = randomVal;
      let cellToFill = document.querySelector(`.row${r + 1}.col${c + 1}`);
      cellToFill.value = randomVal;
      if (findSudokuSolution(board, idx + 1, arr)) return true;
      cellToFill.value = "";
      board[r][c] = 0;
    }
  }
  return false;
};
