// 'Global' variables
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const onButton = document.querySelector(".start");
const offButton = document.querySelector(".stop");
const counter = document.querySelector(".counter");

const state = {
  colors: [yellow, green, red, blue],
  colorArr: [],
  userGuess: [],
  isOn: false,
  playerTurn: false
};

export { yellow, green, red, blue, onButton, offButton, counter, state };
