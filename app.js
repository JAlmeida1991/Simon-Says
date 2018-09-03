// Event handlers
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const onButton = document.querySelector(".start");
const offButton = document.querySelector(".stop");
const counter = document.querySelector(".counter");

// Game state
const colors = [yellow, green, red, blue];
const colorArr = [];
const userGuess = [];

// Conditional logic needed in order to prevent user from added additional colors

let isOn = false;

// Need to use a regular function since ()=> has not lexical this
colors.forEach(color => {
  color.addEventListener("click", function(e) {
    userGuess.push(this);
    userLightUp(e);
    compareColors();
  });
});

onButton.addEventListener("click", () => {
  if (!isOn) {
    // THIS WILL PREVENT USER FROM BREAKING THE LOGIC IF HE/SHE CHOICES TO PICK A COLOR BEFORE IT STARTS
    userGuess.splice(0);
    addRandomColor();
    showColor(colorArr);
  }
  isOn = true;
});

offButton.addEventListener("click", () => {
  if (isOn) {
    colorArr.splice(0);
    isOn = false;
    counter.textContent = 0;
  }
});

function addRandomColor() {
  colorArr.push(colors[Math.floor(Math.random() * 4)]);
  counter.textContent++;
  console.log(colorArr);
}

// FUNCTION MUST CALL IT'S SELF RECURSIVELY SINCE USING A LOOP WILL LIGHT UP ALL THE COLORS SYNCHRONOUSLY

function showColor(arr) {
  let index = 0;

  function delayColors() {
    if (index === colorArr.length) {
      index = 0;
      return;
    }
    arr[index].style.opacity = 0.8;
    setTimeout(function() {
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
  setTimeout(function(e) {
    target.style.opacity = 0.4;
  }, 750);
}

function compareColors() {
  if (checkUserGuess() && colorArr.length === userGuess.length) {
    addRandomColor();
    // NEED IN ORDER TO DELAY CORRECT ANSWER
    setTimeout(function() {
      showColor(colorArr);
      userGuess.splice(0);
    }, 1000);
    // Want to also check if color array is showing otherwise game will light up before it starts
  } else if (!checkUserGuess() && colorArr.length > 0) {
    wrongGuess();
    setTimeout(() => {
      showColor(colorArr);
      userGuess.splice(0);
    }, 1000);
  }
}

// STARTSWITH ON STRING CONSTRUCTOR WILL CHECK IF EVERY USER CHOICE MATCHES WITH COLOR ARRAY
// NEED TO USE CALL TO INVOKE 'THIS' AS COLOR
// ALSO NEED TO EXTRACT CLASS NAME FROM HTMLDIV ELEMENT OTHERWISE IT WILL ALWAYS MATCH

function checkUserGuess() {
  return String.prototype.startsWith.call(
    colorArr.map(x => x.className),
    userGuess.map(x => x.className)
  );
}

// This will only trigger if user incorrectly guesses a color
function wrongGuess() {
  colors.forEach(color => {
    color.style.opacity = 0.8;
    setTimeout(() => {
      color.style.opacity = 0.4;
    }, 500);
  });
}
