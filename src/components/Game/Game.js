import React from 'react';
import './Game.scss';
import $ from 'jquery'



const Game = () => {
  
  const game = {
    /* DESKTOP GAMEBOARD DIMENSIONS */
    // 'boardWidth': 0,
    // 'boardWidthStart': 12,
    // 'boardWidthMin': 4,
    // 'boardHeight': 0,
    // 'boardHeightStart': 10,
    // 'boardHeightMin': 5,
    /* MOBILE GAMEBOARD DIMENSIONS */
    'boardWidth': 7,
    'boardWidthStart': 6,
    'boardWidthMin': 4,
    'boardHeight': 8,
    'boardHeightStart': 8,
    'boardHeightMin': 5,
    /* SCORING */
    'score': 0,
    'highScore': 0,
    'scoreMultiplier': 2,
    'goalColor': "",
    'goalNumber': 30,
    'goalCurrentNumber': 0,
    'goalTotalNumber': 0,
    'round': 1,
    'colors': ['rgb(100, 149, 237)', 'rgb(143, 188, 143)', 'rgb(238, 130, 238)', 'rgb(66, 213, 198)', 'rgb(255, 215, 0)', 'rgb(255, 99, 71)'],
    'numOfColors': 3,
    // 'roundTime': 30,
    'time': 0,
    'roundTime': 30,
    'roundTimeStart': 30,
    'matchArray': [],
    'animationTime': 1200,
    'gameOver': false,
    'allTimeHighScore': parseInt(localStorage.getItem('allTimeHighScore')) || 0
  }
  
  const createRandomButton = () => {
    console.log('Randomize Board');
    const $randomize = $('<button class="randomize animated pulse infinite">Randomize</button>');
    $(".random").append($randomize);
    $('.random').on('click', '.randomize', () => {
      console.log('Randomize');
      updateSquareColors();
    });
  };
  
  
  /* -- Chooses a random color from the color array -- */
  /* Colors are stored in game.colors */
  /* The number of colors are stored in game.numOfColors */
  const applyRandomColor = () => {
    const colorsSlice = game.colors.slice(0, game.numOfColors);
    const index = Math.floor(Math.random() * colorsSlice.length)
    return colorsSlice[index];
  }
  /* ------- Creating the Game Board ------- */
  /* It uses the dimensions from the game.boardWidth & game.boardHeight to determine board size */
  const generateGameBoard = () => {
    const $squares = $('.squares');
    for (let i = 0; i < game.boardHeight; i++) {
      const $rows = $(`<div class="rows" id=${i}/>`);
      // console.log('appending a rows');
      for (let j = 0; j < game.boardWidth; j++) {
        // console.log('appending a square');
        const $square = $('<div class="square"/>');
        $square.css('background-color', applyRandomColor());
        $rows.append($square);
      }
      $squares.append($rows);
    }
  }
  
  /* This randomizes all .square colors on the gameboard*/
  const updateSquareColors = () => {
    $('.square').each(function () {
      $(this).css('background-color', applyRandomColor());
    })
  }
  
  /* ------ Starts the game timer ------ */
  /* Value is stored in game.time */
  const setTimer = (newRound) => {
    const timer = setInterval(() => {
      if (newRound) {
        clearInterval(timer);
        // setTimer();
      }
      if (game.time === 0) {
        // used to stop setInterval
        console.log('Game Time === 0');
        clearInterval(timer);
        gameController();
        if (game.time > 0) setTimer();
      }
      updateTime();
      if (game.time > 0) game.time--;
      // console.log(game.time);
    }, 1000);
  }
  
  const updateTime = () => {
    $('#timerNumber').text(`${game.time}`);
  }
  
  
  
  /* --------- Game Controller --------- */
  // If Goal has been met, new round should begin with increasing difficulty
  // If Goal has not been met, game over screen with score.
  
  const gameController = () => {
    if (game.round > 1 && game.time === 0) {
      if (game.gameOver) {
        return;
      }
      // endcard();
      game.gameOver = true;
  
    } else if (game.round === 1 && game.time === 0) {
      if (game.gameOver) {
        return;
      }
      // endcard();
      game.gameOver = true;
  
    } else if (game.goalCurrentNumber <= 0 && game.time > 0) {
      setTimer(true);
      game.scoreMultiplier++;
  
      /* Limiting the amount that the gameboard shrinks  */
      if (game.round % 2 === 0) {
        if (game.boardWidth > game.boardWidthMin) {
          game.boardWidth--;
        }
      } else {
        if (game.boardHeight > game.boardHeightMin) {
          game.boardHeight--;
        }
      }
  
      /* this runs every time */
      game.round++;
      game.time = game.roundTime;
  
      /* this adds colors if there are anymore colors in the colors array */
      if (game.numOfColors < game.colors.length) {
        game.numOfColors++;
      };
      $(".square").remove();
      $(".rows").remove();
      generateGameBoard();
      updateGameGoalColor();
    };
  };
  
  const updateGameGoalColor = () => {
    let color = applyRandomColor();
    game.goalColor = color;
    game.goalCurrentNumber = game.goalNumber;
    $('#goalNumber').text(`${game.goalCurrentNumber}`);
    $('.goal-square').css('background-color', color);
  }
  
  const gameStart = () => {
    game.time = game.roundTime;
    game.boardWidth = game.boardWidthStart;
    game.boardHeight = game.boardHeightStart;
    $(".tutorial").remove();
    setTimer();
    // ui();
    generateGameBoard();
    createRandomButton();
    updateGameGoalColor();
    // $('.squares').on('click', '.square', handlePoke);
  }
  
  // tutorial();
  gameStart()
  
  return (
    <h1>Game</h1>
  )
}

export default Game;