import { counter, state } from "./globals";

function simonGame(e) {
  if (state.playerTurn) {
    state.userGuess.push(this);
    userLightUp(e);
    compareColors();
  }
}

function startSimonGame() {
  if (!state.isOn) {
    // THIS WILL PREVENT USER FROM BREAKING THE LOGIC IF HE/SHE CHOICES TO PICK A COLOR BEFORE IT STARTS
    state.userGuess.splice(0);
    addRandomColor();
    showColor(state.colorArr);
  }
  state.isOn = true;
}

function stopSimonGame() {
  if (state.isOn) {
    // Need to reset each color back to .4 otherwise game will show a color light up even if it is off
    state.colors.forEach(color => (color.style.opacity = ".4"));
    state.playerTurn = false;
    state.colorArr.splice(0);
    state.isOn = false;
    counter.textContent = 0;
  }
}

function addRandomColor() {
  state.colorArr.push(state.colors[Math.floor(Math.random() * 4)]);
  counter.textContent++;
}

// FUNCTION MUST CALL IT'S SELF RECURSIVELY SINCE USING A LOOP WILL LIGHT UP ALL THE COLORS SYNCHRONOUSLY

function showColor(arr) {
  let index = 0;
  state.playerTurn = false;
  function delayColors() {
    if (index === state.colorArr.length) {
      state.playerTurn = true;
      index = 0;
      return;
    }
    arr[index].style.opacity = 0.8;
    setTimeout(() => {
      arr[index].style.opacity = 0.4;
      index++;
      // RECUSIVE CALL AFTER 1 SECOND TO ITERATE THROUGH COLORS ARRAY
      setTimeout(delayColors, 250);
    }, 750);
  }
  delayColors();
}

function userLightUp(e) {
  let target = e.target;
  target.style.opacity = 0.8;
  setTimeout(() => (target.style.opacity = 0.4), 750);
}

function compareColors() {
  if (checkUserGuess() && state.colorArr.length === state.userGuess.length) {
    addRandomColor();
    // NEED IN ORDER TO DELAY CORRECT ANSWER
    setTimeout(() => {
      showColor(state.colorArr);
      state.userGuess.splice(0);
    }, 1000);
    // Want to also check if color array is showing otherwise game will light up before it starts
  } else if (!checkUserGuess() && state.colorArr.length > 0) {
    wrongGuess();
    setTimeout(() => {
      showColor(state.colorArr);
      state.userGuess.splice(0);
    }, 1000);
  }
}

// STARTSWITH ON STRING CONSTRUCTOR WILL CHECK IF EVERY USER CHOICE MATCHES WITH COLOR ARRAY
// NEED TO USE CALL TO INVOKE 'THIS' AS COLOR
// ALSO NEED TO EXTRACT CLASS NAME FROM HTMLDIV ELEMENT OTHERWISE IT WILL ALWAYS MATCH

function checkUserGuess() {
  return String.prototype.startsWith.call(
    state.colorArr.map(x => x.className),
    state.userGuess.map(x => x.className)
  );
}

// This will only trigger if user incorrectly guesses a color
function wrongGuess() {
  state.colors.forEach(color => {
    color.style.opacity = 0.8;
    setTimeout(() => {
      color.style.opacity = 0.4;
    }, 500);
  });
}

export { simonGame, startSimonGame, stopSimonGame };
