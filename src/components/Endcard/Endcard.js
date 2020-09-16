/* ------ CREATING THE ENDCARD ------- */
const endcard = () => {
  let allTime = false;
  if (game.score > game.highScore) {
    game.highScore = game.score;
    if (game.score > game.allTimeHighScore) {
      localStorage.setItem("allTimeHighScore", game.score);
      allTime = true;
      game.allTimeHighScore = game.score;
    }
  }
  console.log('GAME OVER')
  /* creating background gradient */
  $('body').css('background-image', 'linear-gradient(to bottom, #99fcff, #7965fa)');

  /* removing game elements */
  $("header").remove();
  $(".gameboard").remove();
  $(".squares").remove();
  $(".randomize").remove();



  /* checking winning or losing conditions to display different endcards */
  // check if game.highScore > game.allTimeHighScore
  if (game.score === game.highScore) {
    if (game.score === game.allTimeHighScore) {
      const $endcardScore = $(`<h1><span>You CRUSHED the All-Time High Score!</span></h1><h2><span>Final Score:</span></h2>
      <h1><span> ${game.score}</span></h1>`);
      $(".endcard").append($endcardScore);

    } else {
      const $endcardScore = $(`<h1><span>You beat the High Score!</span></h1><h2><span>final score:</span></h2>
      <h1><span> ${game.score}</span></h1>`);
      $(".endcard").append($endcardScore);
    }

  } else {
    const $endcardScore = $(`<p>You were <span>${game.highScore - game.score}</span> points away from the High Score</p><h2><span>Final Score:</span></h2>
    <h1><span> ${game.score}</span></h1>`);
    $(".endcard").append($endcardScore);
  }

  if (game.round > 1 && game.time === 0) {
    // const $endcardHeader = $('<h1><span>You Win!</span></h1>');
    // $(".endcard").append($endcardHeader);
    const $endcardBody = $(`<p>You crushed<br><span>${game.goalTotalNumber}</span> Goal Blocks<br> in <span>${game.round} rounds!<span></p>`);
    $(".endcard").append($endcardBody);
  } else {
    const $endcardHeader = $('<h1><span>Try Again!</span></h1>');
    $(".endcard").append($endcardHeader);
    const $endcardBody = $(`<p>You were <span>${game.goalNumber - game.goalTotalNumber} Goal Blocks</span><br>away from winning.<br> 
    <span>Play again</span> to get to <span>Round 2</span>.</p>`);
    $(".endcard").append($endcardBody);
  }

  const $row = $('<div class = "row"></div>');
  const $replay = $('<button class="replay">replay</a>');
  const $contact = $('<a class="contact" href="https://www.linkedin.com/in/jasontoups/" target="_blank">contact</a>');
  $(".endcard").append($row);
  $(".row").append($replay);
  $(".row").append($contact);
  $('.row').on('click', '.replay', replay);
};

const replay = () => {
  game.boardWidth = game.boardWidthStart;
  game.boardHeight = game.boardHeightStart;
  game.score = 0;
  game.scoreMultiplier = 2;
  game.goalCurrentNumber = 0;
  game.goalTotalNumber = 0;
  game.round = 1;
  game.numOfColors = 3;
  game.time = 0;
  game.roundTime = game.roundTimeStart;
  game.gameOver = false;
  $(".endcard").remove();
  $('body').css('background-image', 'none');
  const $gameboard = (`
  <div class="gameboard">
    <div class="squares">
    </div>
    <div class="random">
    </div>
  </div>
  <div class="endcard">
  </div>`);
  $("body").prepend($gameboard);

  gameStart();
}