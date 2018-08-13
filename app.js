const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const onButton = document.querySelector(".start");
const offButton = document.querySelector(".stop");
const counter = document.querySelector(".counter");

const colors = [yellow, green, red, blue];
const colorArr = [];
const userGuess = [];

let isOn = false;

colors.forEach(function(color) {
  color.addEventListener("click", function(e) {
    //console.log(e.target);
    userGuess.push(this);
    //console.log(userGuess);
    userLightUp(e);
    compareColors();
  });
});

onButton.addEventListener("click", function() {
  if (!isOn) {
    // THIS WILL PREVENT USER FROM BREAKING THE LOGIC IF HE/SHE CHOICES TO PICK A COLOR BEFORE IT STARTS
    userGuess.splice(0, userGuess.length);
    addRandomColor();
    showColor(colorArr);
  }
  isOn = true;
});

offButton.addEventListener("click", function() {
  if (isOn) {
    colorArr.splice(0, colorArr.length);
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

  function foo() {
    if (index === colorArr.length) {
      index = 0;
      return;
    }
    arr[index].style.opacity = 0.8;
    setTimeout(function() {
      arr[index].style.opacity = 0.4;
      index++;
      // RECUSIVE CALL AFTER 1 SECOND TO ITERATE THROUGH COLORS ARRAY
      setTimeout(foo, 250);
    }, 750);
  }
  foo();
}

// NEED TO BIND IF USING SET TIMEOUT FOR USER CLICK
// function userLightUp(e) {
//     e.target.style.opacity = .8;
//     setTimeout(function (e) {
//         this.style.opacity = .4;
//     }.bind(e.target), 1000);
// }

function userLightUp(e) {
  let target = e.target;
  target.style.opacity = 0.8;
  setTimeout(function(e) {
    target.style.opacity = 0.4;
  }, 750);
}

// function compareColors() {
//     for (let i = 0; i < colorArr.length; i++) {
//         if (colorArr[i] !== userGuess[i]) {
//             console.log('lol');
//         } else {
//             addRandomColor();
//             showColor(colorArr);
//         }
//     }
// }

// let userIndex = 0;
// let colorIndex = 0;

// function compareColors() {
//     if (userGuess[userIndex] === colorArr[userIndex] && userIndex + 1 === colorArr.length) {
//         userIndex++
//         addRandomColor();
//         // NEED IN ORDER TO DELAY CORRECT ANSWER
//         setTimeout(function () {
//             showColor(colorArr);
//         }, 1000)
//     }
// }

function compareColors() {
  // STARTSWITH ON STRING CONSTRUCTOR WILL CHECK IF EVERY USER CHOICE MATCHES WITH COLOR ARRAY
  // NEED TO USE CALL TO INVOKE 'THIS' AS COLOR
  // ALSO NEED TO EXTRACT CLASS NAME FROM HTMLDIV ELEMENT OTHERWISE IT WILL ALWAYS MATCH
  if (
    String.prototype.startsWith.call(
      colorArr.map(x => x.className),
      userGuess.map(x => x.className)
    ) &&
    colorArr.length === userGuess.length
  ) {
    addRandomColor();
    // NEED IN ORDER TO DELAY CORRECT ANSWER
    setTimeout(function() {
      showColor(colorArr);
      userGuess.splice(0, colorArr.length);
    }, 1000);
  } else if (
    !String.prototype.startsWith.call(
      colorArr.map(x => x.className),
      userGuess.map(x => x.className)
    )
  ) {
    setTimeout(function() {
      showColor(colorArr);
      userGuess.splice(0, colorArr.length);
    }, 1000);
  }
  // userGuess.splice(0, colorArr.length);
}
