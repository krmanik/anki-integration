chrome.runtime.sendMessage({ contentScriptQuery: "ankiConnect" }, responseText => {
    console.log(responseText);
});