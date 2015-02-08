
/**
 * Send the html from the main window to the popup
 *
 */
chrome.extension.sendMessage({
    action: "getText",
    content: document.body.innerText
});
