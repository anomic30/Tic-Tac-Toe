import { useState, useEffect } from 'react';
import './App.css';
import Square from './Components/Square';
import { Patterns } from './Components/Patterns';
import Modal from './Components/Modal.jsx';
import Footer from './Components/Footer.jsx';


function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkDraw();
    checkWin();
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
    // eslint-disable-next-line
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      setTimeout(() => {
        // alert(`Game finished! Winning player: ${result.winner}`);
        setBoard(["", "", "", "", "", "", "", "", ""]);
      }, 200)
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(board.map((val, idx) => {
      if (idx === square && val === "") {
        return player;
      }
      return val;
    }));
  }

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let found = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          found = false;
        }
      })
      if (found) {
        setResult({ winner: player, state: "Won" })
      }
    })
  }

  const checkDraw = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    })
    if (filled) {
      setResult({ winner: "No one (Tied) ", state: "Tie" })
    }
  }

  const restart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  }

  const modalReset = () => {
    setResult({ winner: "none" });
    // restart();
  }

  return (
    <>
      <div className="App">
        <h1>Tic-Tac-Toe</h1>
        {result.winner !== "none" ? <Modal winner={result.winner} showModal={modalReset} /> :
          <div className="board">
          <div className="row">
            <Square val={board[0]} chooseSquare={() => { chooseSquare(0) }} />
            <Square val={board[1]} chooseSquare={() => { chooseSquare(1) }} />
            <Square val={board[2]} chooseSquare={() => { chooseSquare(2) }} />
          </div>
          <div className="row">
            <Square val={board[3]} chooseSquare={() => { chooseSquare(3) }} />
            <Square val={board[4]} chooseSquare={() => { chooseSquare(4) }} />
            <Square val={board[5]} chooseSquare={() => { chooseSquare(5) }} />
          </div>
          <div className="row">
            <Square val={board[6]} chooseSquare={() => { chooseSquare(6) }} />
            <Square val={board[7]} chooseSquare={() => { chooseSquare(7) }} />
            <Square val={board[8]} chooseSquare={() => { chooseSquare(8) }} />
          </div>
        </div>
        }
        <button onClick={restart}>Restart</button>
      </div>
      <Footer/>
    </>
  );
}

export default App;
