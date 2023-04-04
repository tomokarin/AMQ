// ==UserScript==
// @name         AMQ key to skip quiz
// @version      0.1
// @description  use "`" key to active skip.
// @author       tomokarin
// @updateURL    
// @downloadURL  
// @match        https://animemusicquiz.com/*
// ==/UserScript==

// TheJoseph98 Script
if (document.getElementById("startPage")) return;
let loadInterval = setInterval(() => {
  if (document.getElementById("loadingScreen").classList.contains("hidden")) {
    clearInterval(loadInterval);
  }
}, 500);

// key to active skip
document.addEventListener("keyup", function (event) {
  if (event.key === "`") {
    event.preventDefault();
    quiz.skipClicked();
  }
});
