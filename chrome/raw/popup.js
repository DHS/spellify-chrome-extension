
/**
 * Get the source from the main window
 */
chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    checkHtml(request.source);
  }
});

/**
 * Check the main page html for multiple instances of the selection text
 * If more than one then print a warning
 *
 */
function checkHtml(html) {

  var selection = document.getElementById('old_text').value;
  var re = new RegExp(selection, 'g');

  if (html.match(re).length > 1) {
    document.write('More than one occurence of "' + selection + '" found. Please highlight just a couple more characters to the left and right of the misspelling.');
  }
}

/**
 * Fetch the page html
 */
function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "gethtml.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });
}
window.onload = onWindowLoad;

/**
 * Get page url to pass to popup
 * http://stackoverflow.com/questions/19164474/chrome-extension-get-selected-text
 *
 * Url parsing from:
 * https://gist.github.com/jlong/2428561
 *
 */
chrome.tabs.getSelected(null, function(tab) {

  // Pass the page url to the form
  document.getElementById('input_url').value = tab.url;

  // Parse url to figure out host
  var url = document.createElement('a');
  url.href = tab.url;

  // Pass site name to form
  document.getElementById('url').innerHTML = url.hostname;

});

/**
 * Get selected text to pass to popup
 * http://stackoverflow.com/questions/2797853/get-url-and-save-it-chrome-extension
 *
 */
chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {

  // Grab the selection
  var old_text = selection[0];

  if (old_text == '') {
    // User forgot to highlight text

    document.getElementById('message').innerHTML = "Start by highlight the mistake you're fixing...";

  } else {
    // User did highlight text

    // Pass value to visible old text value
    document.getElementById('label_old_text').innerHTML = old_text;

    // Pass value to invisible old_text form element
    document.getElementById('old_text').value = old_text;

    // Pass value to visibile new_text form element
    document.getElementById('new_text').value = old_text;

  }

});
