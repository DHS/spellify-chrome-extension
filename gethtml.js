
/**
 * Send the html from the main window to the popup
 *
 */
chrome.extension.sendMessage({
    action: "getSource",
    source: document.body.innerText
});
