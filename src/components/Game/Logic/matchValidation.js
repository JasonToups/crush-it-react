/* -------- Handles Touch Event -------- */
const handlePoke = (event) => {
  // console.log(event.target);
  $(event.target).addClass('selected');
  $(event.target).addClass('animated pulse infinite');

  /* Sending event target to game object */
  game.matchArray.push(event.target);
  // console.log(validateMatch(event.target, $('.goal-square')));
  validateMatchArray();
  return validateMatch(event.target, $('.goal-square'));
};

$('.squares').on('click', '.square', handlePoke);

/* -------- Checking squares for Matches to fill the game.matchArray -------- */
/* A Recursive function that validates the colors in all cardinal directions of the current square, and returns an array of matchable items to the game object*/

const validateMatchArray = () => {
  let matchArray = game.matchArray;

  for (let i = 0; i <= matchArray.length; i++) {
    /* Finding the parent row number of the current square and the index of the current square in the row */
    let parent = parseInt($(matchArray[i]).parent().attr('id'));
    let currentIndex = $(matchArray[i]).index();

    /* Getting the neighboring squares in 4 cardinal directions */
    let currentSquare = matchArray[i];
    let squareAbove = $(`#${parent > 0 ? parent - 1 : false}`).children().eq(currentIndex);
    let squareBelow = $(`#${parent < game.boardHeight ? parent + 1 : false}`).children().eq(currentIndex);
    let squareLeft = currentIndex > 0 ? $(`#${parent}`).children().eq(currentIndex).prev() : false;
    let squareRight = currentIndex < game.boardWidth ? $(`#${parent}`).children().eq(currentIndex).next() : false;

    /* Getting the background colors from the squares in 4 cardinal directions from the current index  */
    let currentSquareColor = ($(currentSquare).css('background-color'));
    let squareAboveColor = ($(squareAbove).css('background-color'));
    let squareBelowColor = ($(squareBelow).css('background-color'));
    let squareLeftColor = ($(squareLeft).css('background-color'));
    let squareRightColor = ($(squareRight).css('background-color'));

    /* ----- Control Flow for Pushing Square Divs to Game Match Array ----- */
    /* This section checks the game.matchArray and if the square div is already included, then it will be skipped. 
    Only new divs should appear in array */

    /* -- When the variables used below were defined, if the square is on the boarder it should return False */
    $(currentSquare).addClass('match highlight animated heartBeat');
    setTimeout(() => {
      $(currentSquare).removeClass('highlight heartBeat');
    }, game.animationTime)

    let currentArrayLength = game.matchArray.length;

    if (squareAbove) {
      if (currentSquareColor === squareAboveColor && !game.matchArray.includes(squareAbove) && !$(squareAbove).hasClass("match")) {
        $(squareAbove).addClass('match');
        game.matchArray.push(squareAbove);
      }
    }
    if (squareBelow) {
      if (currentSquareColor === squareBelowColor && !game.matchArray.includes(squareBelow) && !$(squareBelow).hasClass("match")) {
        $(squareBelow).addClass('match');
        game.matchArray.push(squareBelow);
      }
    }
    if (squareLeft) {
      if (currentSquareColor === squareLeftColor && !game.matchArray.includes(squareLeft) && !$(squareLeft).hasClass("match")) {
        $(squareLeft).addClass('match');
        game.matchArray.push(squareLeft);
      }
    }
    if (squareRight) {
      if (currentSquareColor === squareRightColor && !game.matchArray.includes(squareRight) && !$(squareRight).hasClass("match")) {
        $(squareRight).addClass('match');
        game.matchArray.push(squareRight);
      }
    }
    if (i === game.matchArray.length - 1) {
      /* the end of validateMatchArray */
      scoring();
      return game.matchArray;
    }

  }
  /* I don't think this section ever runs */
  scoring();
  return game.matchArray;
};

/* ----- Validates Match Between Two Squares ----- */
/* This can be used to verify that the game goal color matches a square color */
const validateMatch = (square1, square2) => {
  // console.log('validate match function');
  const current = $(square1).css('background-color');
  const validate = $(square2).css('background-color');
  // console.log(current);
  // console.log(validate);
  if (current === validate) {
    return true;
  } else {
    return false;
  }
};

/* -------- Scoring ---------- */
/* When matches are made and sent to the game.matchArray. 
After the function runs, it should invoke the scoring function.
The scoring() will take no parameters, but will use the game.matchArray.
It will loop through the array and check for the background color of each index in the array.
If the index color is the same as the goal color, then each block point will be multiplied by the game.pointMultiplier
Otherwise each block is worth 1 point.*/

const scoring = () => {
  if (game.matchArray.length >= 2) {
    for (let i = 0; i < game.matchArray.length; i++) {
      const current = game.matchArray[i];
      if (validateMatch(game.matchArray[i], $('.goal-square'))) {
        game.score += game.scoreMultiplier;
        $('#scoreNumber').text(`${game.score}`);
        game.goalCurrentNumber--;
        game.goalTotalNumber++;
        $('#goalNumber').text(`${game.goalCurrentNumber}`);
        // removing the dotted boarder class and delaying it by the game.animationTime
        $(".goal-square").addClass('highlight animated heartBeat');
        setTimeout(() => {
          $(".goal-square").removeClass('highlight animated heartBeat');
        }, game.animationTime)

        $(game.matchArray[i]).removeClass('match');
        setTimeout(() => { $(current).css('background-color', applyRandomColor()); }, game.animationTime);

      } else {
        game.score++;
        $('#scoreNumber').text(`${game.score}`);
        $(game.matchArray[i]).removeClass('match');
        setTimeout(() => { $(current).css('background-color', applyRandomColor()); }, game.animationTime);
      }
    }
  } else {
    for (let j = 0; j <= game.matchArray.length; j++) {
      $(game.matchArray[j]).removeClass('match');
    }
  }
  game.matchArray = [];
  gameController();
}

/* --------- Game Controller --------- */
// If Goal has been met, new round should begin with increasing difficulty
// If Goal has not been met, game over screen with score.

const gameController = () => {
  if (game.round > 1 && game.time === 0) {
    if (game.gameOver) {
      return;
    }
    endcard();
    game.gameOver = true;

  } else if (game.round === 1 && game.time === 0) {
    if (game.gameOver) {
      return;
    }
    endcard();
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
