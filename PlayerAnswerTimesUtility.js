// ==UserScript==
// @name         AMQ Player Answer Times Utility
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Stores time spent answering per player (Modify Something which suitable myself)
// @author       tomokarin
// @match        https://animemusicquiz.com/*
// @grant        none
// @copyright    MIT license
// ==/UserScript==

const amqAnswerTimesUtility = new function(){
    "use strict"
    this.songStartTime = 0
    this.playerTimes = []
    if (typeof(Listener) === "undefined") {
        return
    }
    new Listener("play next song", () => {
        this.songStartTime = Date.now()
        this.playerTimes = []
    }).bindListener()

    new Listener("player answered", (data) => {
        const time = Date.now() - this.songStartTime
        data.forEach(gamePlayerId => {
            this.playerTimes[gamePlayerId] = time
        })
    }).bindListener()

    new Listener("Join Game", (data) => {
        const quizState = data.quizState;
        if(quizState){
            this.songStartTime = Date.now() - quizState.songTimer * 1000
        }
    }).bindListener()
}()
