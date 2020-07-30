// Project Constants
const mainContainerWidth = 50; //50vh
const blankColor = '#f9faf5'
const startingBoardSize = 16;
 
//Global Variables
let squareWidth = 0;
let userBoardSize;
let mouseDown = false;
let currentColor = 'black';

//querySelector
const canvas = document.querySelector('.canvas');

//
function createSquare(numberOfSquares) {
    
    squareWidth = mainContainerWidth / numberOfSquares;
   
    const square = document.createElement('div');
    square.className = "square";
    square.style.width = `${squareWidth}vh`;
    square.style.height = `${squareWidth}vh`;
    square.style.backgroundColor = blankColor;

    return square;
}


//Complete Erase 
function completeErase() {

    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = blankColor;
    })
}


//return the user's selected board size
function getUserBoardSize() {
    userBoardSize = document.getElementById('board-size').value;

    createGrid(userBoardSize);

} 


// Instantiates the selected number of squares of grid (canvasLength*canvasLength)
function createGrid(numberOfSquares) {

    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.lastChild);
    }


    for (let i = 0; i < numberOfSquares*numberOfSquares; i++) {
        
        canvas.appendChild(createSquare(numberOfSquares));
    }

    const canvasLength = numberOfSquares * squareWidth;
    canvas.setAttribute('style', `width: ${canvasLength}vh; height: ${canvasLength}vh`)

    colorSquare();

}


//add EventListener to each square and change to black when hover over it
function colorSquare() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mousedown', event => {
            mouseDown = true;
            event.target.style.backgroundColor = "white";
        })
        square.addEventListener('mouseover', event => {
            if (mouseDown) {
                event.target.style.backgroundColor = "black";
            }
        })
        square.addEventListener('mouseup', event => mouseDown = false);
    })
}


createGrid(startingBoardSize);

const completeEraseBtn = document.querySelector('#complete-erase-btn');
completeEraseBtn.addEventListener('click', completeErase);




/**
 * How to arrange the squares evenly?
 * - The canvas is a big square of size length*length;
 * - size of main-container is (numberOfSquares*squareWidth)^2
 * 
 * How to dynamically adjust the square size?
 * - set mainContainerWidth constant and squareWidth = mainContainerWidth / numberOfSquares
 * - What if the side cannot be divided equally, eg. 50/3?
 * - adjust the maincontainer size (50 + 50%3) % 3 = 0
 * 
 * 
 * User function:
 * - Complete Erase 
 * - Selective Erase
 * - color Change? 
 * - toggle-able eraser tool
 *
 * 
 * 
 * 
 * 
 */