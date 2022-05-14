



let isValidToPlaceNumber = function (board, r, c, num) {

  //row
  for (let i = 0; i < 9; i++) 
    if (board[r][i] == num && i != c) return false;

  // col
  for (i = 0; i < 9; i++) if (board[i][c] == num && i != r) return false;

  // mat
  r1 = ((r / 3) | 0) * 3;
  c1 = ((c / 3) | 0) * 3;

  //   console.log(r +" "+ c);

  for (i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[r1 + i][c1 + j] == num && !(i + r1 == r && j + c1 == c)) return false;
    }
  }

  return true;
};

let solveSudoku = function (board, idx, arr) {

  if (idx == arr.length) {
    return true;
  }

  let r = arr[idx][0];
  let c = arr[idx][1];

  for (let num = 1; num <= 9; num++) {
    
    let randomVal = (Math.random() * 9) | 0;
    randomVal = randomVal + 1;

    if (isValidToPlaceNumber(board, r, c, randomVal)) {
      // console.log(">>")
      board[r][c] = randomVal;
      if (solveSudoku(board, idx + 1, arr)) return true;
      board[r][c] = 0;
    }

  }
  return false;
};

let solveSudoku_01 = function (board) {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        arr.push([i, j]);
      }
    }
  }

  solveSudoku(board, 0, arr);

  return board;
};

let display = function (board) {
  for (let i = 0; i < 9; i++) {
    let ans = "";
    for (let j = 0; j < 9; j++) {
      ans += board[i][j] + " ";
    }
    console.log(ans);
  }
};

let board = [];
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
board.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);


