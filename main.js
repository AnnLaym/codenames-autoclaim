// ==UserScript==
// @name         autoclaim
// @namespace    http://tampermonkey.net/
// @version      2025-02-24
// @description  try to take over the world!
// @author       You
// @match        https://meme-police.ru/bg/codenames
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meme-police.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let copiedText = '';

    document.addEventListener('click', function(event) {
        if (event.shiftKey) {
            let target = event.target.closest('div[data]');
            let span = target.querySelector('span');
            if (span) {
                copiedText = span.innerText;
            }
            let chatInput = document.getElementsByClassName('chat-send-input')[0];
            if (chatInput) {
                let words = chatInput.value.split(' ');
                let index = words.indexOf(copiedText);
                if (index !== -1) {
                    words.splice(index, 1);
                } else {
                    words.push(copiedText.toLowerCase());
                }
                chatInput.value = words.join(' ').trim();
                console.log('Text updated in chat input');
            }
        }
    });
    let style = document.createElement('style');
    style.innerHTML = `
        .chat .chat-messages {
            bottom: 30px;
            position: absolute;
        }
        .chat-send-box {
            display: flex;
            position: absolute;
            bottom: 0px;
            width: 756px;
        }
    `;
    document.head.appendChild(style);
})();
