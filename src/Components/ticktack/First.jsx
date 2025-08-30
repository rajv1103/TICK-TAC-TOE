import React, { useState } from "react";
import "./first.css";
import circle from "../Assets/circle.png";
import cross from "../Assets/cross.png";

const First = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState("");

  const checkWinner = () => {
    const combos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],           // diagonals
    ];

    for (let [a, b, c] of combos) {
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        setWinner(data[a]);
        setLock(true);
        return;
      }
    }

    if (count === 8 && !winner) {
      setWinner("Draw");
      setLock(true);
    }
  };

  const toggle = (e, index) => {
    if (lock || data[index]) return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? "o" : "x";
    e.target.innerHTML = `<img src='${count % 2 === 0 ? circle : cross}'/>`;

    setData(newData);
    setCount(count + 1);
    setTimeout(checkWinner, 100);
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner("");
    document.querySelectorAll(".box").forEach((box) => (box.innerHTML = ""));
  };

  return (
    <div className="container">
      <h1 className="crazy-header">⚔️ React Tic-Tac-Toe ⚔️</h1>
      <div className="marquee">
        <p>🔥 Play Smart. Play Fast. React Rules! 🔥</p>
      </div>
      {winner && (
        <h2 className="winner">
          {winner === "Draw" ? "It's a Draw!" : `${winner.toUpperCase()} Wins!`}
        </h2>
      )}
      <div className="board">
        {[0, 3, 6].map((rowStart) => (
          <div key={rowStart} className="row">
            {[0, 1, 2].map((i) => (
              <div
                key={rowStart + i}
                className="box"
                onClick={(e) => toggle(e, rowStart + i)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
      <footer className="footer">Made with ⚛️ by Raj Verma</footer>
    </div>
  );
};

export default First;