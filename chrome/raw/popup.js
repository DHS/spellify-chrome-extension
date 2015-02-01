
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

  //
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
