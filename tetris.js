/*
  This file contains the implementation of the game
*/

var NUM_ROWS = 20;
var NUM_COLS = 10;
var TEMPO = 1000;
var piece = null;
var shapeTypes = ['I', 'O', 'Z', 'L', 'J', 'S', 'T'];


window.onload = function() {
  initializeGame();

  // update game every time interval
  setInterval(updateGame, TEMPO);
};

function initializeGame() {
  var grid = createGrid();
  drawGrid(grid);
}

function getClassForPiece(piece) {
  return piece.type +"-piece";
}

/*
  Main function to update the game at every time interval
*/
function updateGame () {
  if (piece == null) {
    // if we don't have a piece, create one
    piece = createPiece();
  } else {
    // move the piece one rowNum down
    if (canPushPieceDown(piece)) { // if canPushPieceDown is true
      erasePiece(piece);
      piece.rowNum = piece.rowNum + 1;
    } else { // if canPushPieceDown is false
      drawPiece(piece, "cube " + getClassForPiece(piece) + " bottom");
      piece = null;
    }
  }

  // draw the piece
  if (piece != null) {
    drawPiece(piece, "cube " + getClassForPiece(piece));
  }
}

function erasePiece(piece) {
  // erase the piece
  drawPiece(piece, "cube");
}

function canPushPieceDown(piece) {
   var squares = getSquaresForPiece(piece);

   for (i = 0; i < squares.length; i++) {
     var square = squares[i]; // [14,4]
     var rowNum = square[0] + 1;
     var colNum = square[1];
     if (rowNum == 20) {
       return false;
     }

     var element = document.getElementById (rowNum + "," + colNum);
     if (element.className.split(" ").length == 3) {
       return false;
     }
   }

   return true;
}

function getSquare(rowNum, colNum) {
  return [rowNum, colNum];
}

function getSquaresForI(piece) {
  var squares = [];

  for (i = 0; i < 4; i++) {
    var square = getSquare(piece.rowNum, piece.colNum + i);
    squares.push(square);
  }

  return squares;
}

function getSquaresForO(piece) {
  var squares = [];
  for (i = 0; i < 2; i++) {
    for (j = 0; j < 2; j++) {
      var square = getSquare(piece.rowNum +j, piece.colNum + i);
      squares.push(square);
    }
  }
  return squares;
}

function getSquaresForZ(piece) {
  var squares = [];
  for (i = 0; i < 2; i++) {
    for (j = 0; j < 2; j++) {
     var shift = j == 1 ? 1 : 0;
      var square = getSquare(piece.rowNum +j, piece.colNum + i + shift);
      squares.push(square);
    }
  }
  return squares;
}

function getSquaresForS(piece) {
  var squares = [];
  for (i = 0; i < 2; i++) {
    for (j = 0; j < 2; j++) {
     var shift = j == 1 ? 1 : 0;
      var square = getSquare(piece.rowNum +j, piece.colNum - i - shift);
      squares.push(square);
    }
  }
  return squares;
}

function getSquaresForL(piece) {
  var squares = [];
  for (i = 0; i < 3; i++) {
    var square = getSquare(piece.rowNum+i, piece.colNum);
    squares.push(square);
  }

  var square = getSquare(piece.rowNum +2, piece.colNum+1);
  squares.push(square);

  return squares;
}

function getSquaresForJ(piece) {
  var squares = [];
  for (i = 0; i < 3; i++) {
    var square = getSquare(piece.rowNum+i, piece.colNum);
    squares.push(square);
  }

  var square = getSquare(piece.rowNum +2, piece.colNum-1);
  squares.push(square);

  return squares;
}

function getSquaresForT(piece) {
  var squares = [];
  for (i = 0; i < 3; i++) {
    var square = getSquare(piece.rowNum, piece.colNum+i);
    squares.push(square);
  }

  var square = getSquare(piece.rowNum +1, piece.colNum+1);
  squares.push(square);

  return squares;
}

function getSquaresForPiece(piece) {
  var squares;

  if (piece.type == 'I') {
    squares = getSquaresForI(piece);
  }
  else if (piece.type == 'O') {
    squares = getSquaresForO(piece);
  }
  else if (piece.type == 'Z') {
    squares = getSquaresForZ(piece);
  }
  else if (piece.type == 'L') {
    squares = getSquaresForL(piece);
  }
  else if (piece.type == 'J') {
    squares = getSquaresForJ(piece);
  }
  else if (piece.type == 'S') {
    squares = getSquaresForS(piece);
  }
  else if (piece.type == 'T') {
    squares = getSquaresForT(piece);
  }
  return squares;
}

function drawPiece(piece, className) {
  var squares = getSquaresForPiece(piece);

  for (i = 0; i < squares.length; i++) {
    var squareId = getIdForSquare(squares[i]);
    var squareElement = document.getElementById(squareId);
    squareElement.className = className;
  }
}

function getIdForSquare(square) {
  return square[0] + "," + square[1];
}

function createPiece() {
  var piece = {
    rowNum: 0,
    colNum: 3,
    type: shapeTypes[Math.floor(Math.random()*shapeTypes.length)]
  };

  return piece;
}

function drawGrid (grid) {
  var gridElement = document.getElementById("grid");

  for (rowNum = 0; rowNum < grid.length; rowNum++) {
    var rowElement = document.createElement("div");
    rowElement.className = "row";
    var row = grid[rowNum];

    for (colNum = 0; colNum < row.length; colNum++) {
      var colls = document.createElement("span");
      colls.id = rowNum + "," + colNum;
      colls.innerHTML = rowNum + "," + colNum;

      if (row[colNum]!=null) {
        colls.className = "cube color-cube";
      }
      else {
        colls.className = "cube";
      }
      rowElement.appendChild(colls);
    }
    gridElement.appendChild(rowElement);
  }
}

function createGrid() {
  var grid = [];
  for (i = 0; i < NUM_ROWS; i++){
    var row = [];
    for (j = 0; j < NUM_COLS; j++){
      var col = null;
      row.push(col);
    }
    grid.push(row);
  }

  return grid;
}

function movePieceToLeft(piece) {
  var bb = getBoundingBoxForPiece(piece);
  if (bb[0] > 0) { // 0 is left
    erasePiece(piece);
    piece.colNum =  piece.colNum - 1;
    drawPiece(piece, "cube " + getClassForPiece(piece));
  }
}

function movePieceToRight(piece) {
  var bb = getBoundingBoxForPiece(piece);
  if (bb[1] < 9) { // 1 is right
    erasePiece(piece);
    piece.colNum =  piece.colNum + 1;
    drawPiece(piece, "cube " + getClassForPiece(piece));
  }
}

function movePieceDown(piece){
  if (canPushPieceDown(piece)) {
    erasePiece(piece);
    piece.rowNum = piece.rowNum + 1;
    drawPiece(piece, "cube " + getClassForPiece(piece));
  }
}

function getBoundingBoxForPiece(piece){
  var squares = getSquaresForPiece(piece);
  var left, right, down;

  for (i = 0; i < squares.length; i++){
    var square = squares[i]; // [0,3] 0-row, 3-col
    var col = square[1];
    var row = square[0];

    if (left == null) {
      left = col;
    } else {
      left = Math.min(left, col);
    }

    if (right == null) {
      right = col;
    } else {
      right = Math.max(right, col);
    }
    if (down == null) {
      down = row;
    } else {
      down = Math.max(down, row);
    }
  }

  return [left, right, down];
}

function handleKey(event) {
  if (event.key == "ArrowLeft") {
    movePieceToLeft(piece);
  }
  else if (event.key == "ArrowRight"){
    movePieceToRight(piece);
  }
  else if (event.key == "ArrowDown"){
    movePieceDown(piece);
  }
}