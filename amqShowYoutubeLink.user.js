// ==UserScript==
// @name         Show Youtube Link
// @namespace    https://tampermonkey.net/
// @version      1.2
// @description  Adds a YouTube search link below the song links in Song Info.
// @author       moka
// @match        https://animemusicquiz.com/*
// @grant        none
// @downloadURL  https://github.com/tomomkarin/AMQ/raw/main/ShowYoutubeLink.user.js
// @updateURL    https://github.com/tomokarin/AMQ/raw/main/ShowYoutubeLink.user.js
// ==/UserScript==

"use strict";

const loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        clearInterval(loadInterval);
        setup();
    }
}, 500);

function applyStyles() {
    const styleId = 'youtube-link-custom-styles';
    if (document.getElementById(styleId)) return;

    const css = `
        #youtube-search-link-container a {
            color: rgb(68, 151, 234);
            transition: color 0.2s ease-in-out;
        }
        #youtube-search-link-container a:hover {
            color: rgb(48, 121, 204);
        }
    `;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = css;
    document.head.appendChild(style);
}

function setup() {
    applyStyles();

    new Listener("answer results", (data) => {
        setTimeout(() => {
            const oldLinkContainer = document.getElementById('youtube-search-link-container');
            if (oldLinkContainer) {
                oldLinkContainer.remove();
            }
          
            const songInfo = data.songInfo;
            if (!songInfo || !songInfo.songName || !songInfo.artist) {
                return;
            }
            const songName = songInfo.songName;
            const artist = songInfo.artist;
          
            const youtubeQuery = encodeURIComponent(`${songName} ${artist}`);
            const youtubeUrl = `https://www.youtube.com/results?search_query=${youtubeQuery}`;

            const container = document.createElement('div');
            container.id = 'youtube-search-link-container';
            container.style.textAlign = 'center';

            const link = document.createElement('a');
            link.href = youtubeUrl;
            link.textContent = 'Youtube';
            link.target = '_blank';
            Object.assign(link.style, {
                fontWeight: 'bold',
                fontSize: '14px'
            });
            container.appendChild(link);

            const songInfoLinkRow = document.getElementById('qpSongInfoLinkRow');
            if (songInfoLinkRow && songInfoLinkRow.parentNode) {
                songInfoLinkRow.parentNode.insertBefore(container, songInfoLinkRow.nextSibling);
            } else {
                console.error("Show Youtube Link: Could not find the song info link row (#qpSongInfoLinkRow).");
            }

        }, 100);
    }).bindListener();
}
