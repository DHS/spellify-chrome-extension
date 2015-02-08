
/**
 * Load replacements from storage
 *
 */
chrome.storage.sync.get('replacements', function (obj) {
  processNewReplacement(obj);
});

/**
 * Add in our new replacement
 *
 */
function processNewReplacement(data) {

  // Prepare new replacement
  prepareNewReplacement();

  // Get replacements for this page
  if (data.replacements && (pageReplacements = data.replacements[url])) {

    // Add new replacement to existing replacements
    pageReplacements.push({
        "old_text": old_text,
        "new_text": new_text
    });

  } else {

    // If no replacements at all then create empty object
    if (typeof data.replacements === 'undefined') {
      data.replacements = {};
    };

    // Create entry for this page
    data.replacements[url] = [{
        "old_text": old_text,
        "new_text": new_text
    }];

  }

  // Save replacements including new one
  chrome.storage.sync.set({'replacements': data.replacements}, function() {
    //console.log('Replacement saved:', data.replacements);
  });

  // Update UI with success message
  setTimeout(function(){
    document.getElementById('message').innerHTML = "Saved!";
  }, 1000);

  // Refresh the parent page
  setTimeout(function(){
    chrome.tabs.getSelected(null, function(tab) {
      var code = 'window.location.reload();';
      chrome.tabs.executeScript(tab.id, {code: code});
    });
  }, 1000);
}

/**
 * Clean up new replacement data
 *
 */
function prepareNewReplacement() {

  // Prep a little reg ex
  re = new RegExp('\\+', 'g');

  // Fetch new replacement data from page url
  new_replacement = urlToObj(document.location);

  // Clean up new replacement data
  url = decodeURIComponent(new_replacement.url);
  old_text = decodeURIComponent(new_replacement.old_text).replace(re, ' ');
  new_text = decodeURIComponent(new_replacement.new_text).replace(re, ' ');

}

/**
 * Convert the current url containing get vars into an object
 *
 *
 * For example, this url:
 *   http://google.com/?query=kittens&format=pictures
 * would convert into this object:
 *   {'query':'kittens','format':'pictures'}
 *
 */
function urlToObj(url) {

  // Parse the url
  var urlObj = document.createElement('a');
  urlObj.href = url;
  var urlVarsString = urlObj.search;

  // Snip off the leading '?'
  urlVarsString = urlVarsString.substring(1);

  // Create an array of 'key=value'
  var urlArgStrings = urlVarsString.split('&');

  // Create an object to populate with these key/value pairs
  var obj = {};

  // Loop through the key/value strings
  urlArgStrings.forEach( function(keyval) {

    // Split them
    var singleArgString = keyval.split('=');

    // Use them to create object properties
    obj[singleArgString[0]] = singleArgString[1];

  });

  // Result!
  return obj;

}