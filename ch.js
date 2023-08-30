document.addEventListener("DOMContentLoaded", () => {
    const chessboard = document.getElementById("chessboard");
    let isWhiteTurn = true;
    let selectedPiece = null;
    const pieces = [
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
    ];
  
    function drawBoard() {
      let html = "";
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = pieces[row][col];
          const color = (row + col) % 2 === 0 ? "white" : "black";
          html += `<div class="square ${color}" data-row="${row}" data-col="${col}">${piece}</div>`;
        }
      }
      chessboard.innerHTML = html;
      addPieceListeners();
    }
  
    function addPieceListeners() {
      const squares = document.querySelectorAll(".square");
      squares.forEach((square) => {
        square.addEventListener("click", () => {
          const row = parseInt(square.dataset.row);
          const col = parseInt(square.dataset.col);
          if (selectedPiece === null) {
            if (pieces[row][col] && (isWhiteTurn === pieces[row][col].toUpperCase() === pieces[row][col])) {
              selectedPiece = { row, col };
              square.classList.add("selected");
            }
          } else{
            const { row: selectedRow, col: selectedCol } = selectedPiece;
            if (isValidMove(selectedRow, selectedCol, row, col)) {
              movePiece(selectedRow, selectedCol, row, col);
              isWhiteTurn = !isWhiteTurn;
            }
            square.classList.remove("selected");
            selectedPiece = null;
          }
        });
      });
    }
  
    function isValidMove(fromRow, fromCol, toRow, toCol) {
      const piece = pieces[fromRow][fromCol];
      if (!piece) return false;
      const isPieceWhite = piece.toUpperCase() === piece;
      const isMoveValid = (isWhiteTurn === isPieceWhite) && (fromRow !== toRow || fromCol !== toCol);
      // Add specific piece movement rules here if needed
      return isMoveValid;
    }
  
    function movePiece(fromRow, fromCol, toRow, toCol) {
      pieces[toRow][toCol] = pieces[fromRow][fromCol];
      pieces[fromRow][fromCol] = "";
      drawBoard();
    }
  
    drawBoard();
  });