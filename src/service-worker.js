async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(response)
    return response.json();
}


/* Simple one-time requests
 * https://developer.chrome.com/docs/extensions/mv3/messaging/#simple
 */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.contentScriptQuery == "ankiConnect") {

            var url = "http://localhost:8765";

            postData(url, { "action": "version", "version": 6 })
                .then(data => {
                    console.log(data);
                });

            return true;
        }
    });


/* Sending messages from web pages
 * https://developer.chrome.com/docs/extensions/mv3/messaging/#external-webpage
 */
chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        if (request.contentScriptQuery == "ankiConnect") {

            var url = "http://localhost:8765";

            postData(url, request.actionData)
                .then(data => {
                    sendResponse({ data: data });
                });

            return true;
        }
    });