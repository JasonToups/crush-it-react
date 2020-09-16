/* --------- CREATING UI ---------*/
const ui = () => {
  const $header = $('<header></header>');
  const $uiHeader = $('<h1>Crush it!</h1>');
  const $uiBody = $(`
  <div class="container-fluid">
    <div class= "row">
    <div class="col-4" id="timer">
      Timer<br><span id="timerNumber"></span>
    </div>
    <div class="col-4" id="goal">
      Goal <span id="goalNumber"></span>
      <div class="goal-square"></div>
    </div>
      <div class="col-4" id="score">
        Score<br><span id="scoreNumber">0</span>
    </div>
      </div>
    </div>`);
  $("body").prepend($header);
  $("header").append($uiHeader);
  $("header").append($uiBody);
};