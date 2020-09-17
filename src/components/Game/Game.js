import React, {useState} from 'react';
import './Game.scss';
import $ from 'jquery'

const Game = () => {
  const [boardWidth, setBoardWidth] = useState(7);
  // const [boardWidthStart, setBoardWidthStart] = useState(6);
  // const [boardWidthMin, setBoardWidthMin] = useState(4);
  const [boardHeight, setBoardHeight] = useState(8);
  // const [boardHeightStart, setBoardHeightStart] = useState(8);
  // const [boardHeightMin, setBoardHeightMin] = useState(5);
  const [numOfColors, setNumOfColors] = useState(3);
  // const [gameBoard, setGameBoard] = useState({});

  const colors = ['rgb(100, 149, 237)', 'rgb(143, 188, 143)', 'rgb(238, 130, 238)', 'rgb(66, 213, 198)', 'rgb(255, 215, 0)', 'rgb(255, 99, 71)'];
 
  /* -- Chooses a random color from the color array -- */
  /* Colors are stored in game.colors */
  /* The number of colors are stored in numOfColors */
  const applyRandomColor = () => {
    const colorsSlice = colors.slice(0, numOfColors);
    const index = Math.floor(Math.random() * colorsSlice.length)
    return colorsSlice[index];
  }

  /* ------- Creating the Game Board ------- */
  const generateSquares = () => {
    let squares = [];
    for (let i = 0; i < boardWidth; i++){
      let color = applyRandomColor();
      squares.push(
        <div className='square' style={{backgroundColor: `${color}`}} />
      )
    }
    return squares
  }

  const generateGameBoard = () => {
    let board = [];
    for (let i = 0; i < boardHeight; i++) {
    board.push(
      <div className="rows" id={i}>
      {generateSquares()}
      </div>
      );
    }
    return (
      <>
        {board}
      </>
    )
  }

  /* Create the Randomize Button */
  const createRandomButton = () => {
    return (
      <div className='random'>
        <button className="randomize animated pulse infinite" onClick={updateSquareColors}>Randomize</button>
      </div>
    )
  };
  
  /* This randomizes all .square colors on the gameboard*/
  const updateSquareColors = () => {
    $('.square').each(function () {
      $(this).css('background-color', applyRandomColor());
    })
  }

  return (
    <div className="gameboard">
      <div className="squares">
      {generateGameBoard()}
      </div>
      {createRandomButton()}
    </div>
  )
}

export default Game;