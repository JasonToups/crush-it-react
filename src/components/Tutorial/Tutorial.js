/* --------- CREATING TUTORIAL POPUP & STARTING GAME---------*/
const tutorial = () => {
  const $tutorialHeader = $('<h1>Are you ready to<br><span>CRUSH IT???</span></h1>');
  $(".tutorial").append($tutorialHeader);
  const $tutorialBody = $(`<p><span>Match at least 2</span> of the same colored blocks to <span>Crush</span> them!</p>
  <div class="squares">
  <div class="row">
  <div class="square" style="background-color: rgb(100, 149, 237);"></div><div class="square" style="background-color: rgb(100, 149, 237);"></div></div></div>
  <p>Crush <span>${game.goalNumber} Goal Blocks</span>,</p>
  <p>before the <span>${game.roundTime} second Timer</span> runs out!</p>`);
  $(".tutorial").append($tutorialBody);

  console.log('Tutorial screen created');
  const $start = $('<button class="start">Start!</button>');
  $(".tutorial").append($start);
  $('.start').on('click', () => {
    console.log('Game Start');
    gameStart();
  });
};