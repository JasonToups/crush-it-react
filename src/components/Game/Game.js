import React, { useState } from 'react';
import './Game.scss';
import $, { event } from 'jquery';

const Game = () => {
  const [boardWidth, setBoardWidth] = useState(7);
  // const [boardWidthStart, setBoardWidthStart] = useState(6);
  // const [boardWidthMin, setBoardWidthMin] = useState(4);
  const [boardHeight, setBoardHeight] = useState(8);
  // const [boardHeightStart, setBoardHeightStart] = useState(8);
  // const [boardHeightMin, setBoardHeightMin] = useState(5);
  const [numOfColors, setNumOfColors] = useState(3);
  // const [matchArray, setMatchArray] = useState([]);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const colors = [
    'rgb(100, 149, 237)',
    'rgb(143, 188, 143)',
    'rgb(238, 130, 238)',
    'rgb(66, 213, 198)',
    'rgb(255, 215, 0)',
    'rgb(255, 99, 71)',
  ];
  let matchArray = [];
  const animationTime = 1200;

  /* -- Chooses a random color from the color array -- */
  /* Colors are stored in game.colors */
  /* The number of colors are stored in numOfColors */
  const applyRandomColor = () => {
    const colorsSlice = colors.slice(0, numOfColors);
    const index = Math.floor(Math.random() * colorsSlice.length);
    return colorsSlice[index];
  };

  /* ------- Creating the Game Board ------- */
  const generateSquares = () => {
    let squares = [];
    for (let i = 0; i < boardWidth; i++) {
      let color = applyRandomColor();
      squares.push(
        <div
          className='square'
          style={{ backgroundColor: `${color}` }}
          onClick={handlePoke}
        />,
      );
    }
    return squares;
  };

  const generateGameBoard = () => {
    let board = [];
    for (let i = 0; i < boardHeight; i++) {
      board.push(
        <div className='rows' id={i}>
          {generateSquares()}
        </div>,
      );
    }
    return <>{board}</>;
  };

  /* Create the Randomize Button */
  const createRandomButton = () => {
    return (
      <div className='random'>
        <button
          className='randomize animated pulse infinite'
          onClick={updateSquareColors}>
          Randomize
        </button>
      </div>
    );
  };

  /* This randomizes all .square colors on the gameboard*/
  const updateSquareColors = () => {
    $('.square').each(function () {
      $(this).css('background-color', applyRandomColor());
    });
  };

  /* -------- Checking squares for Matches to fill the matchArray -------- */
  /* A Recursive function that validates the colors in all cardinal directions of the current square, and returns an array of matchable items to the game object*/

  const validateMatchArray = () => {
    // let matchArray = matchArray;
    console.log('validate match array start');
    console.log(matchArray);

    for (let i = 0; i <= matchArray.length; i++) {
      console.log('starting loop');
      /* Finding the parent row number of the current square and the index of the current square in the row */
      let parent = parseInt($(matchArray[i]).parent().attr('id'));
      let currentIndex = $(matchArray[i]).index();

      /* Getting the neighboring squares in 4 cardinal directions */
      let currentSquare = matchArray[i];
      let squareAbove = $(`#${parent > 0 ? parent - 1 : false}`)
        .children()
        .eq(currentIndex);
      let squareBelow = $(`#${parent < boardHeight ? parent + 1 : false}`)
        .children()
        .eq(currentIndex);
      let squareLeft =
        currentIndex > 0
          ? $(`#${parent}`).children().eq(currentIndex).prev()
          : false;
      let squareRight =
        currentIndex < boardWidth
          ? $(`#${parent}`).children().eq(currentIndex).next()
          : false;

      /* Getting the background colors from the squares in 4 cardinal directions from the current index  */
      let currentSquareColor = $(currentSquare).css('background-color');
      let squareAboveColor = $(squareAbove).css('background-color');
      let squareBelowColor = $(squareBelow).css('background-color');
      let squareLeftColor = $(squareLeft).css('background-color');
      let squareRightColor = $(squareRight).css('background-color');

      /* ----- Control Flow for Pushing Square Divs to Game Match Array ----- */
      /* This section checks the matchArray and if the square div is already included, then it will be skipped. 
    Only new divs should appear in array */

      /* -- When the variables used below were defined, if the square is on the boarder it should return False */
      $(currentSquare).addClass('match highlight animated heartBeat');
      setTimeout(() => {
        $(currentSquare).removeClass('highlight heartBeat');
      }, animationTime);

      if (squareAbove) {
        if (
          currentSquareColor === squareAboveColor &&
          !matchArray.includes(squareAbove) &&
          !$(squareAbove).hasClass('match')
        ) {
          $(squareAbove).addClass('match');
          matchArray.push(squareAbove);
          console.log('match above');
        }
      }
      if (squareBelow) {
        if (
          currentSquareColor === squareBelowColor &&
          !matchArray.includes(squareBelow) &&
          !$(squareBelow).hasClass('match')
        ) {
          $(squareBelow).addClass('match');
          matchArray.push(squareBelow);
          console.log('match below');
        }
      }
      if (squareLeft) {
        if (
          currentSquareColor === squareLeftColor &&
          !matchArray.includes(squareLeft) &&
          !$(squareLeft).hasClass('match')
        ) {
          $(squareLeft).addClass('match');
          matchArray.push(squareLeft);
          console.log('match left');
        }
      }
      if (squareRight) {
        if (
          currentSquareColor === squareRightColor &&
          !matchArray.includes(squareRight) &&
          !$(squareRight).hasClass('match')
        ) {
          $(squareRight).addClass('match');
          matchArray.push(squareRight);
          console.log('match right');
        }
      }
      if (i === matchArray.length - 1) {
        /* the end of validateMatchArray */
        // scoring();
        console.log(matchArray);
        return matchArray;
      }
    }
    /* I don't think this section ever runs */
    // scoring();
    console.log(matchArray);
    return matchArray;
  };

  // Getting the target sent to the match array.
  // The issue with setting the match array to state, is that the board re-renders, so it looks like it's randomizing the color, which it isn't doing.
  // TODO figure out which game variables should be set to state.
  // TODO add the validate match array function to this component.
  const handlePoke = event => {
    event.preventDefault();
    // console.log(event.target.style.backgroundColor);
    matchArray = event.target;
    // console.log(matchArray);
    validateMatchArray();
  };

  return (
    <div className='gameboard'>
      <div className='squares'>{generateGameBoard()}</div>
      {createRandomButton()}
    </div>
  );
};

export default Game;
