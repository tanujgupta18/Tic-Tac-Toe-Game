import React, { useState } from "react";
import cross from "../src/assets/cross.png";
import circle from "../src/assets/circle.png";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]);

  const checkWinner = (newBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return { winner: newBoard[a], combination };
      }
    }
    return null;
  };

  const toggle = (index) => {
    if (lock || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "x" : "o";
    setBoard(newBoard);
    setCount(count + 1);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningCombination(result.combination);
      setLock(true);
    } else if (count === 8) {
      setWinner("draw");
      setLock(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner(null);
    setWinningCombination([]);
  };

  return (
    <div className="container flex flex-col items-center p-4">
      <div className="title mt-5 text-white text-4xl sm:text-4xl md:text-4xl flex justify-center items-center font-bold text-center">
        Tic Tac Toe Game in
        <span className="ml-4 text-[#26ffcb]">React</span>
      </div>

      <div className="board mt-8 flex-col m-auto">
        {[0, 1, 2].map((row) => (
          <div key={row} className="row flex items-center justify-center">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const isWinningCell = winningCombination.includes(index);
              return (
                <div
                  key={index}
                  className={`box flex p-5 border-4 ${
                    isWinningCell ? "border-red-500" : "border-[#0f1b21]"
                  } bg-[#1f3540] rounded-xl w-20 h-20 sm:w-24 sm:h-24 md:w-[110px] md:h-[110px]`}
                  onClick={() => toggle(index)}
                >
                  {board[index] === "x" && <img src={cross} alt="Cross" />}
                  {board[index] === "o" && <img src={circle} alt="Circle" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button
        className="reset mt-8 w-40 h-12 sm:w-48 sm:h-20 border-none outline-none cursor-pointer rounded-full bg-[#1f3540] text-xl sm:text-2xl md:text-2xl text-[#26ffcb]"
        onClick={resetGame}
      >
        Reset
      </button>

      {winner && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="popup-content bg-white p-6 sm:p-8 md:p-10 rounded-lg text-center">
            {winner === "draw" ? (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                It's a Draw!
              </h2>
            ) : (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">{`Player ${winner.toUpperCase()} Wins!`}</h2>
            )}
            <button
              className="mt-4 sm:mt-5 md:mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-[#1f3540] text-white rounded-lg text-lg sm:text-xl md:text-2xl"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
