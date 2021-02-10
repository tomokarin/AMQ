// ==UserScript==
// @name         AMQ Player Answer Time Display
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Makes you able to see how quickly people answered (Modify Something which suitable myself)
// @author       Zolhungaj
// @modifier     tomokarin
// @match        https://animemusicquiz.com/*
// @grant        none
// @require      https://github.com/amq-script-project/AMQ-Scripts/raw/master/gameplay/amqAnswerTimesUtility.user.js
// @copyright    MIT license
// ==/UserScript==

let ignoredPlayerIds = []

new Listener("Game Starting", ({players}) => {
    ignoredPlayerIds = []
    const self = players.find(player => player.name === selfName)
    if(self){
        const teamNumber = self.teamNumber
        if(teamNumber){
            const teamMates = players.filter(player => player.teamNumber === teamNumber)
            if(teamMates.length > 1){
                ignoredPlayerIds = teamMates.map(player => player.gamePlayerId)
            }
        }
    }
}).bindListener()

new Listener("player answered", (data) => {
    data.filter(gamePlayerId => !ignoredPlayerIds.includes(gamePlayerId)).forEach(gamePlayerId => {
        quiz.players[gamePlayerId].answer = (Math.round(amqAnswerTimesUtility.playerTimes[gamePlayerId]/10)) / 100 + " s"
    })
}).bindListener()

quiz._playerAnswerListner = new Listener(
    "player answers",
    function (data) {
        const that = quiz
        data.answers.forEach((answer) => {
            const quizPlayer = that.players[answer.gamePlayerId]
            let answerText = answer.answer
            if(amqAnswerTimesUtility.playerTimes[answer.gamePlayerId] !== undefined){
                answerText += " (" + (Math.round(amqAnswerTimesUtility.playerTimes[answer.gamePlayerId]/10)) /100 + " s)"
            }
            quizPlayer.answer = answerText
            quizPlayer.unknownAnswerNumber = answer.answerNumber
            quizPlayer.toggleTeamAnswerSharing(false)
        })

        if (!that.isSpectator) {
            that.answerInput.showSubmitedAnswer()
            that.answerInput.resetAnswerState()
        }

        that.videoTimerBar.updateState(data.progressBarState)
    }
)
