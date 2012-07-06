
var isPlayerTurn = false
var playerColor = null
var opponentColor = null
var internalGrid = null

var playerWhite = null
var playerBlack = null
var gameplayEnabled = false

function buildGameboard() {
  for(rindex = 1; rindex <= 8; rindex++) {
      var rowName = 'r' + rindex;

      var parent = $('<div>', {
          id: 'row_' + rowName + '_c1',
          class: 'square ' + rowName + ' c1',
          style: 'top: ' + (rindex - 1) * 50 + 'px',
      })

      for(cindex = 1; cindex <= 8; cindex++) {
        var columnName = 'c' + cindex;

        var child = $('<div>', {
            id: 'square_' + rowName + '_' + columnName,
            class: 'square ' + rowName + ' ' + columnName,
            style: 'left: ' + (cindex - 1) * 50 + 'px'
        }).click(dropPiece);

        child.appendTo(parent);
      }

      parent.appendTo('#gameboard');
  }
}

function dropPiece() {
  if(!isPlayerTurn || !gameplayEnabled) return

  var square = '#' + $(this).attr('id')
  var rowNo = parseInt(square[9])
  var columnNo = parseInt(square[12])

  var sq = internalGrid[rowNo][columnNo]
  if(sq) return 

  var result = 
      flipRight(rowNo, columnNo) |
      flipLeft(rowNo, columnNo) |
      flipUp(rowNo, columnNo) |
      flipDown(rowNo, columnNo) |
      flipDownRight(rowNo, columnNo) |
      flipUpLeft(rowNo, columnNo) |
      flipDownLeft(rowNo, columnNo) |
      flipUpRight(rowNo, columnNo)

  if(result) {
    var current = playerColor
    playerColor = opponentColor
    opponentColor = current
  } 
}

function flipRight(rowNo, columnNo) {
  for(c = columnNo + 1; c <= 8; c++) {
      var sq = internalGrid[rowNo][c] 
      if(!sq) return false                                      //test empty square
      if(c == columnNo + 1 && sq == playerColor) return false   //test adjacent pieces of same color

      if(sq == playerColor) {
        fillRow(playerColor, rowNo, columnNo, c)
        return true
      }
  }
  return false
}

function flipLeft(rowNo, columnNo) {
  for(c = columnNo - 1; c >= 1; c--) {
      var sq = internalGrid[rowNo][c] 
      if(!sq) return false                                      //test empty square
      if(c == columnNo - 1 && sq == playerColor) return false   //test adjacent pieces of same color
      if(sq == playerColor) {
        fillRow(playerColor, rowNo, c, columnNo)
        return true
      }
  }
}

function flipUp(rowNo, columnNo) {
  for(r = rowNo - 1; r >= 1; r--) {
      var sq = internalGrid[r][columnNo] 
      if(!sq) return false                                      //test empty square
      if(r == rowNo - 1 && sq == playerColor) return false      //test adjacent pieces of same color
      if(sq == playerColor) {
        fillColumn(playerColor, r, rowNo, columnNo)
        return true
      }
  }
  return false
}

function flipDown(rowNo, columnNo) {
  for(r = rowNo + 1; r <= 8; r++) {
      var sq = internalGrid[r][columnNo] 
      if(!sq) return false                                      //test empty square
      if(r == rowNo + 1 && sq == playerColor) return false      //test adjacent pieces of same color
      if(sq == playerColor) {
        fillColumn(playerColor, rowNo, r, columnNo)
        return true
      }
  }
  return false
}

function flipUpRight(rowNo, columnNo) {
  cRow = rowNo - 1;
  cCol = columnNo + 1;
  
  var sq = internalGrid[cRow][cCol]
  if(!sq) return false
  if(sq == playerColor) return false
  while(--cRow >= 1 && ++cCol <= 8) {
      sq = internalGrid[cRow][cCol]
      if(!sq) return false
      if(sq == playerColor) {
          fillDiagonal2(playerColor, cRow, rowNo, columnNo, cCol)
          return true
      }
  }
  
  return false
}

function flipUpLeft(rowNo, columnNo) {
  cRow = rowNo - 1;
  cCol = columnNo - 1;
  
  var sq = internalGrid[cRow][cCol]
  if(!sq) return false
  if(sq == playerColor) return false
  while(--cRow >= 1 && --cCol >= 1) {
      sq = internalGrid[cRow][cCol]
      if(!sq) return false
      if(sq == playerColor) {
          fillDiagonal(playerColor, cRow, rowNo, cCol, columnNo)
          return true
      }
  }
  
  return false
}

function flipDownLeft(rowNo, columnNo) {
  cRow = rowNo + 1;
  cCol = columnNo - 1;
  
  var sq = internalGrid[cRow][cCol]
  if(!sq) return false
  if(sq == playerColor) return false
  while(++cRow <= 8 && --cCol >= 1) {
      sq = internalGrid[cRow][cCol]
      if(!sq) return false
      if(sq == playerColor) {
          fillDiagonal2(playerColor, rowNo, cRow, cCol, columnNo)
          return true
      }
  }
  
  return false
}

function flipDownRight(rowNo, columnNo) {
  cRow = rowNo + 1;
  cCol = columnNo + 1;
  
  var sq = internalGrid[cRow][cCol]
  if(!sq) return false
  if(sq == playerColor) return false

  while(++cRow <= 8 && ++cCol <= 8) {
      sq = internalGrid[cRow][cCol]
      if(!sq) return false
      if(sq == playerColor) {
          fillDiagonal(playerColor, rowNo, cRow, columnNo, cCol)
          return true
      }
  }
  
  return false
}

function fillDiagonal(color, rowStart, rowEnd, colStart, colEnd) {
  rIndex = rowStart - 1
  cIndex = colStart - 1
  while(++rIndex <= rowEnd && ++cIndex <= colEnd) {
      internalGrid[rIndex][cIndex] = playerColor
      var id = '#square_r' + rIndex + '_c' + cIndex
      $(id).children().remove()
      $(id).append(createPiece(playerColor))
  }
}

function fillDiagonal2(color, rowStart, rowEnd, colStart, colEnd) {
  rIndex = rowStart - 1
  cIndex = colEnd + 1
  while(++rIndex <= rowEnd && --cIndex >= colStart) {
      internalGrid[rIndex][cIndex] = playerColor
      var id = '#square_r' + rIndex + '_c' + cIndex
      $(id).children().remove()
      $(id).append(createPiece(playerColor))
  }
}

function fillColumn(color, rowStart, rowEnd, colNo) {
  for(index = rowStart; index <= rowEnd; index++) {
      internalGrid[index][colNo] = playerColor
      var id = '#square_r' + index + '_c' + colNo
      $(id).children().remove()
      $(id).append(createPiece(playerColor))
  }
}

function fillRow(color, rowNo, colStart, colEnd) {
  for(index = colStart; index <= colEnd; index++) {
      internalGrid[rowNo][index] = playerColor
      var id = '#square_r' + rowNo + '_c' + index
      $(id).children().remove()
      $(id).append(createPiece(playerColor))
  }
}

function createPiece(color) {
  return $('<div>', { class: color + ' circle' })
}

function setupGame() {
  $('#square_r4_c4').append(createPiece('white'))       
  $('#square_r5_c5').append(createPiece('white'))       
  $('#square_r4_c5').append(createPiece('black'))       
  $('#square_r5_c4').append(createPiece('black'))
}

function updateBoard(board) {
    internalGrid = board
    for(row = 1; row <= 8; row++) {
        for(col = 1; col <= 8; col++) {
            var id = '#square_r' + row + '_c' + col
            $(id).children().remove()
            $(id).append(createPiece(board[row][col]))
        }
    }
}
