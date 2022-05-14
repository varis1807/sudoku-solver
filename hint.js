


let remainingHint = 5;
let remainingWromgEntry = 5;
let hintState = false;

let hintBtn = document.querySelector(".hint");
hintBtn.innerText = `Hint (${remainingHint})`;

let hintFun = (hints) => {
  
    let sudokuSolverBtn = document.querySelector(".hint");
    if (sudokuSolverBtn.classList.contains("select")) {
      sudokuSolverBtn.classList.remove("select");
      hintState = false;
    } else if(hints > 0){
      sudokuSolverBtn.classList.add("select");
      hintState = true;
    }
    // console.log(hintState);
  
};
