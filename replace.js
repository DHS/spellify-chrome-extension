
/**
 * Load replacements from storage
 *
 */
chrome.storage.sync.get('replacements', function (obj) {
  runReplacements(obj);
});

/**
 * Run replacements
 *
 */
function runReplacements(data) {

  // Check for replacements for this page
  if (data.replacements && (pageReplacements = data.replacements[document.URL])) {

    for (var i = 0, len = pageReplacements.length; i < len; i++) {
      replaceText(pageReplacements[i]['old_text'], pageReplacements[i]['new_text']);
    }
  }
}

/**
 * Replacement function
 * http://stackoverflow.com/questions/10114212/chrome-extension-to-replace-text-dom-nodes-doesnt
 *
 */
function replaceText(old_text, new_text) {

  // Load all nodes
  var nodes = document.getElementsByTagName("*");

  // Loop through nodes
  for (var i = 0; i < nodes.length; i++) {

    // Find child nodes
    var subNodes = nodes[i].childNodes;

    // Loop through child nodes
    for (var j = 0; j < subNodes.length; j++) {

      var node = subNodes[j];

      // Check that child node is text node and has data
      if (node.nodeType === 3 && node.data) {

        // Set up a regex object for the text to look for
        var re = new RegExp(old_text, 'g');

        // Check that the node contains the text to replace
        if (node.data.match(re)) {

          // If there's a match then replace
          node.data = node.data.replace(re, new_text);

          // And log to the console
          //console.log('Match found for "' + old_text + '"');

        }
      }
    }
  }
}
