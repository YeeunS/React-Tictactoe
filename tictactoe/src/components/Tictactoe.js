import React, { useState, useEffect } from "react";
import "../App.css";

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = ({ squares, onSquareClick }) => (
  <div>
    <div className="board-row">
      <Square value={squares[0]} onClick={() => onSquareClick(0)} />
      <Square value={squares[1]} onClick={() => onSquareClick(1)} />
      <Square value={squares[2]} onClick={() => onSquareClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onClick={() => onSquareClick(3)} />
      <Square value={squares[4]} onClick={() => onSquareClick(4)} />
      <Square value={squares[5]} onClick={() => onSquareClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onClick={() => onSquareClick(6)} />
      <Square value={squares[7]} onClick={() => onSquareClick(7)} />
      <Square value={squares[8]} onClick={() => onSquareClick(8)} />
    </div>
  </div>
);

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [turn, setTurn] = useState(true);
  const [status, setStatus] = useState("Current Player: X");

  useEffect(() => {
    const current = history[stepNumber];
    const winner = decideWinner(current.squares);

    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (stepNumber === 9) {
      setStatus("Draw");
    } else {
      setStatus(`Current Player: ${turn ? "X" : "O"}`);
    }
  }, [history, stepNumber, turn]);

  const handleClick = (i) => {
    const historyUpdate = history.slice(0, stepNumber + 1);
    const current = historyUpdate[historyUpdate.length - 1];
    const squares = current.squares.slice();

    if (decideWinner(squares) || squares[i]) return;

    squares[i] = turn ? "X" : "O";
    setHistory(historyUpdate.concat([{ squares }]));
    setStepNumber(historyUpdate.length);
    setTurn(!turn);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setTurn(true);
    setStatus("Current Player: X");
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-info">
        <div className="player-status">{status}</div>
        <button onClick={resetGame}>Reset</button>
      </div>
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onSquareClick={handleClick}
        />
      </div>
    </div>
  );
};

const decideWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows for square
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns for square
    [0, 4, 8],
    [2, 4, 6], // Diagonals for square
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default Game;
