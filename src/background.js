chrome.runtime.onConnect.addListener(function () {
    console.log('background-js -- onConnect');
});

chrome.runtime.onInstalled.addListener(function () {
    console.log('background-js -- onInstalled');
});
