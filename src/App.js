import './App.css';
import { Patterns } from './Patterns';
import Square from './Components/Square';
import React, {useState, useEffect} from 'react';

function App() {

  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "-", state: "-"})

  useEffect(() => {
    isDraw() 
    isWin()

     if (player == "X"){
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    if (result.state != "none") {
      alert(`Game Finished! Winning Player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const selectSquare = (square) => {
    setBoard(
      board.map((value, index) => {
        if (index == square && value == ""){
          return player;
        }

        return value;
      })
    );

    
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  };

  const isDraw = () => {
    let filled = true;

    board.forEach((square) => {
      if(square == ""){
        filled = false
      }
    })

    if(filled){
      setResult({winner: "No One", state : "Draw"})
    }
  }
  
  const isWin = () => {
    Patterns.forEach((pattern) => {
      const firstPlayer = board[pattern[0]];
      if(firstPlayer == "") return;
      
      let winningPattern = true;

      pattern.forEach((index) => {
        if(board[index] != firstPlayer){
          winningPattern = false;
        }
      });

      if (winningPattern) {
        setResult({winner: player ,state: "won"});
      }
    });
  };

  return (
    <div className="App">
      <div className="Board">
          <div className='row'>
            <Square value={board[0]} chooseSquare={() => {selectSquare(0)}}/>
            <Square value={board[1]} chooseSquare={() => {selectSquare(1)}}/>
            <Square value={board[2]} chooseSquare={() => {selectSquare(2)}}/>
          </div>
          <div className='row'>
            <Square value={board[3]} chooseSquare={() => {selectSquare(3)}}/>
            <Square value={board[4]} chooseSquare={() => {selectSquare(4)}}/>
            <Square value={board[5]} chooseSquare={() => {selectSquare(5)}}/>
          </div>
            <div className='row'>
            <Square value={board[6]} chooseSquare={() => {selectSquare(6)}}/>
            <Square value={board[7]} chooseSquare={() => {selectSquare(7)}}/>
            <Square value={board[8]} chooseSquare={() => {selectSquare(8)}}/>
          </div>
      </div> 
    </div>
  );
}

export default App;
