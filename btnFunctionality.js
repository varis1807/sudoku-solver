


let clueList = [];
let HowManyTimesFindSolution = 0;
let level = localStorage.getItem("sudokuLvl");
if (level == null) level = "easy";
let selectBtn = document.querySelector("#level");
selectBtn.value = level;

selectBtn.addEventListener("change", (e) => {
  localStorage.setItem("sudokuLvl", e.currentTarget.value);
  window.location.reload();
});

let resetfun = function (lvl) {
  let randomClue = (Math.random() * 3) | 0;
  if (lvl == "easy") randomClue = randomClue + 18;
  else if (lvl == "medium") randomClue = randomClue + 14;
  else randomClue = randomClue + 10;

  let counter = 0;
  clueList = [];
  while (counter < randomClue) {
    let val = (Math.random() * 81) | 0;
    if (!clueList.includes(val)) {
      clueList.push(val);
      counter++;
    }
  }
  clueList.sort((a, b) => a - b);
  // console.log(clueList);
  let totralClueFilled = 0;
  while (totralClueFilled < randomClue) {
    let cellNo = clueList[totralClueFilled];
    let row = (cellNo / 9) | 0;
    let col = cellNo % 9;

    let clueCell = document.querySelector(`.cell .row${row + 1}.col${col + 1}`);

    // console.log(clueCell);

    clueCell.defaultValue = filledBoard[row][col];
    clueCell.classList.add("clue");
    clueCell.setAttribute("readonly", "readonly");
    totralClueFilled++;
  }
};
resetfun(level);

let setfun = function (clueList) {

    document.querySelector(".solutionBtn").classList.remove("select");
  let totalSet = 0;

  //   console.log(filledBoard);
  while (totalSet < 81) {
    let row = (totalSet / 9) | 0;
    let col = totalSet % 9;
    let clueCell = document.querySelector(`.cell .row${row + 1}.col${col + 1}`);
    clueCell.classList.remove("green");
    clueCell.classList.remove("wrongSelection");

    if (!clueList.includes(totalSet)) {
      clueCell.setAttribute("contenteditable", true);
      clueCell.classList.remove("clue");
      clueCell.value = "";
    } else {
      clueCell.removeAttribute("readonly");
      clueCell.value = filledBoard[row][col];
      clueCell.classList.add("clue");
      clueCell.setAttribute("readonly", "readonly");
    }

    totalSet++;
  }
};

let showsolution = function (solutionArray, clueList) {
  let totralClueFilled = 0;

  let sudokuSolverBtn = document.querySelector(".solutionBtn");
  if (sudokuSolverBtn.classList.contains("select")) {
    setfun(clueList);
  } else {
    sudokuSolverBtn.classList.add("select");
    HowManyTimesFindSolution = 0;
    while (totralClueFilled < 81) { 
      let row = (totralClueFilled / 9) | 0;
      let col = totralClueFilled % 9;
      let clueCell = document.querySelector(
        `.cell .row${row + 1}.col${col + 1}`
        );
        clueCell.classList.remove("green")

      if (!clueList.includes(totralClueFilled)) {
        clueCell.value = solutionArray[row][col];
        clueCell.classList.remove("wrongSelection");
      }

      totralClueFilled++;
    }
  }
};

let sudokuSolver01 = function () {
  let resetVal = 0;
  let sudokuSolverBtn = document.querySelector(".sudokuSolver");
  if (sudokuSolverBtn.classList.contains("select")) {
    sudokuSolverBtn.classList.remove("select");
    setfun(clueList);
  } else {
    sudokuSolverBtn.classList.add("select");
    HowManyTimesFindSolution = 0;
    while (resetVal < 81) {
      let cellNo = resetVal;
      let row = (cellNo / 9) | 0;
      let col = cellNo % 9;
      let cell01 = document.querySelector(`.cell .row${row + 1}.col${col + 1}`);
      //   console.log(cell01);
      cell01.value = "";
      cell01.classList.remove("clue");
      cell01.classList.remove("green");
      cell01.removeAttribute("readonly");

      cell01.addEventListener("keypress", (e) => {
        if (e.key == 0) {
          alert("Please Enter Valid Key from 1 to 9");
          e.preventDefault();
        }
      });
      resetVal++;
    }
  }
};


