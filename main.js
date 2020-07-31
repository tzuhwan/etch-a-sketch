// Project Constants
const mainContainerWidth = 60; //50vh
const blankColor = '#f9faf5'
const startingBoardSize = 16;



 
//Global Variables
let squareWidth = 0;
let userBoardSize;
let mouseDown = false;
let isErase = false;
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

//Selective erase
function selectiveErase() {
    isErase = !isErase;
    isErase === true ? currentColor = blankColor : null;
}


//return the user's selected board size
function getUserBoardSize() {
    userBoardSize = document.getElementById('board-size').value;

    userBoardSize === "" ? createGrid(startingBoardSize): createGrid(userBoardSize);

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


//add EventListener to each square and change to currentColor when hover over it
function colorSquare() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mousedown', event => {
            mouseDown = true;
            event.target.style.backgroundColor = currentColor;
        })
        square.addEventListener('mouseover', event => {
            if (mouseDown) {
                event.target.style.backgroundColor = currentColor;
            }
        })
        square.addEventListener('mouseup', event => mouseDown = false);
    })
}


// toggles the color buttons 
function toggleColorBtn(colorBtns, colorBtn) {
    colorBtn.addEventListener('click', event => {
        colorBtns.forEach(color => {
            color.classList.remove('color-square-clicked');
        })
        colorBtn.classList.add('color-square-clicked');
    })
}

//Asign the div backgroundColor directly so that can be accessed later
function defineColorPalette() {
    let colorList = ['black', '#ecbcb4', 'blue', 'red', 'yellow', 'green', 'brown'];

    const colorBtns = document.querySelectorAll('.color-square');

    for (let i = 0; i < colorBtns.length; i++) {
        colorBtns[i].style.backgroundColor = colorList[i];
    }
}


function chooseColor() {
    const colorBtns = document.querySelectorAll('.color-square');
    colorBtns.forEach(colorBtn => {
        toggleColorBtn(colorBtns, colorBtn);
        
        colorBtn.addEventListener('click', event => {
            currentColor = event.target.style.backgroundColor;
        })
    })
}

createGrid(startingBoardSize);
chooseColor();
defineColorPalette();

const completeEraseBtn = document.querySelector('#complete-erase-btn');
completeEraseBtn.addEventListener('click', completeErase);

const selectiveEraseBtn = document.querySelector('#eraser-btn');
selectiveEraseBtn.addEventListener('click', event => {
    selectiveEraseBtn.classList.toggle('active');
    selectiveErase();
})





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