const X_CLASS ='x';
const O_CLASS='o';
const winCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll(".cell");
const board = document.getElementById('board');
const winMsgElement = document.getElementById("winMsg");
const button = document.getElementById("restart")
const winMsgTextElement = document.querySelector("#display");
let oTurn;

startGame();

button.addEventListener("click",startGame);

function startGame(){
    oTurn=false;
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click",handleClick);
        cell.addEventListener('click',handleClick,{once:true})
    })
    setBoardHoverClass();
    winMsgElement.classList.remove("show");
}

function handleClick(e){
// console.log("clicked");
const cell=e.target;
const currentClass= oTurn ? O_CLASS : X_CLASS;
placeMark(cell,currentClass);
if(checkWin(currentClass)){
endGame(false);
}
else if(isDraw())
{
    endGame(true);
}
else
{
    swapTurns();
    setBoardHoverClass();
}
}


function endGame(draw){
   if(draw){
    winMsgTextElement.innerText = "Draw!";
   }
   else{
       winMsgTextElement.innerText = `${oTurn ? "O" : "X"} Wins!`
   }
   winMsgElement.classList.add("show");
}

function isDraw(){
    return [...cellElements].every(cell=> {
       return cell.classList.contains(X_CLASS) || 
              cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    oTurn=!oTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(oTurn){
        board.classList.add(O_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return winCombinations.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}










// cell.onclick=function create(){

// // const newx=document.createElement("p");
// // const newo=document.createElement("p");
// cell.classList.add(x);
// cell.classList.add(o);
// // newx.innerHTML=`<p>X</p>`;
// // newo.innerHTML=`<p>X</p>`;
// }
