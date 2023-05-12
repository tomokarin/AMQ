// ==UserScript==
// @name         AMQ key to skip quiz
// @version      0.2
// @description  use "`" key to active skip.
// @author       tomokarin
// @updateURL    https://github.com/tomokarin/AMQ/raw/main/amqKeytoSkip.user.js
// @downloadURL  https://github.com/tomokarin/AMQ/raw/main/amqKeytoSkip.user.js
// @match        https://animemusicquiz.com/*
// ==/UserScript==

// TheJoseph98 Script
if (document.getElementById("startPage")) return;
let loadInterval = setInterval(() => {
  if (document.getElementById("loadingScreen").classList.contains("hidden")) {
    clearInterval(loadInterval);
  }
}, 500);

// key to active skip, can change to any key you want.
document.addEventListener("keydown", function (event) {
  if (event.key === "`") {
    event.preventDefault();
    quiz.skipClicked();
  }
});
